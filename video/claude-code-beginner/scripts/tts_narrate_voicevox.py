#!/usr/bin/env python3
"""
Remotion 解説動画の narration/script.md（<!-- --> ブロック）を抽出し、
ローカル VOICEVOX エンジン（http://localhost:50021）でシーンごとの WAV を生成する。

前提: VOICEVOX.app を起動し、エンジンが localhost:50021 で待ち受けていること。
      curl http://localhost:50021/version で確認できる。

使い方:
  python3 scripts/tts_narrate_voicevox.py --md narration/script.md --out audio \
      --speaker 3 --speed 1.05
"""
from __future__ import annotations

import argparse
import csv
import os
import subprocess
import sys
import urllib.request
import urllib.parse
import json

LAYOUT_PREFIX = ("_", "scoped")
ENGINE = "http://localhost:50021"


def extract_notes(md_path: str) -> list[str]:
    text = open(md_path, encoding="utf-8").read()
    notes: list[str] = []
    import re
    slides = re.split(r"(?m)^---\s*$", text)
    for slide in slides:
        blocks = re.findall(r"<!--(.*?)-->", slide, re.S)
        spoken = []
        for b in blocks:
            b = b.strip()
            if not b or b.startswith(LAYOUT_PREFIX):
                continue
            spoken.append(b)
        if spoken:
            notes.append("\n".join(spoken))
    return notes


def _post_json(url: str, data: bytes | None = None) -> dict:
    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def synthesize_one(text: str, speaker: int, speed: float) -> bytes:
    q = urllib.parse.urlencode({"text": text, "speaker": speaker})
    query = _post_json(f"{ENGINE}/audio_query?{q}")
    query["speedScale"] = speed
    body = json.dumps(query).encode("utf-8")
    q2 = urllib.parse.urlencode({"speaker": speaker})
    req = urllib.request.Request(
        f"{ENGINE}/synthesis?{q2}", data=body,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def wav_duration(path: str) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", path],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def _tc(sec: float) -> str:
    ms = int(round((sec - int(sec)) * 1000))
    s = int(sec)
    return f"{s//3600:02d}:{(s%3600)//60:02d}:{s%60:02d}.{ms:03d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md", required=True)
    ap.add_argument("--out", default="audio")
    ap.add_argument("--speaker", type=int, default=3, help="VOICEVOX 話者ID（既定3=ずんだもんノーマル）")
    ap.add_argument("--speed", type=float, default=1.05)
    ap.add_argument("--gap-ms", type=int, default=350)
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--no-join", action="store_true")
    ap.add_argument("--no-manifest", action="store_true")
    args = ap.parse_args()

    try:
        urllib.request.urlopen(f"{ENGINE}/version", timeout=3).read()
    except Exception as e:
        print(f"VOICEVOX エンジンに接続できません（{ENGINE}）。VOICEVOX.app を起動してください: {e}")
        sys.exit(1)

    notes = extract_notes(args.md)
    total = sum(len(n) for n in notes)
    print(f"台本: {len(notes)} シーン / 合計 {total} 字")
    os.makedirs(args.out, exist_ok=True)

    paths = []
    for i, note in enumerate(notes, start=1):
        path = os.path.join(args.out, f"scene{i:02d}.wav")
        if not args.force and os.path.exists(path) and os.path.getsize(path) > 0:
            print(f"  - {path}  (既存・スキップ)")
            paths.append(path)
            continue
        audio = synthesize_one(note.replace("\n", "、"), args.speaker, args.speed)
        with open(path, "wb") as f:
            f.write(audio)
        print(f"  ✓ {path}  ({len(note)}字)")
        paths.append(path)

    if not args.no_manifest:
        csv_path = os.path.join(args.out, "narration_manifest.csv")
        gap = args.gap_ms / 1000.0
        rows = []
        cursor = 0.0
        for i, p in enumerate(paths, start=1):
            dur = wav_duration(p)
            slide_total = dur + (gap if i != len(paths) else 0)
            rows.append({
                "slide": i, "file": os.path.basename(p),
                "duration_sec": round(slide_total, 3), "speech_sec": round(dur, 3),
                "start": _tc(cursor), "end": _tc(cursor + slide_total),
            })
            cursor += slide_total
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=["slide", "file", "duration_sec", "speech_sec", "start", "end"])
            w.writeheader()
            w.writerows(rows)
        print(f"  ✓ 尺マニフェスト: {csv_path}（総尺 {_tc(cursor)}）")

    if not args.no_join:
        out_path = os.path.join(args.out, "full_narration.mp3")
        silence = os.path.join(args.out, f"_silence_{args.gap_ms}.mp3")
        if not os.path.exists(silence):
            subprocess.run(
                ["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
                 "-t", f"{args.gap_ms/1000:.3f}", "-q:a", "9", silence],
                check=True, capture_output=True,
            )
        import tempfile
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
            for i, p in enumerate(paths):
                f.write(f"file '{os.path.abspath(p)}'\n")
                if i != len(paths) - 1:
                    f.write(f"file '{os.path.abspath(silence)}'\n")
            list_file = f.name
        subprocess.run(
            ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", list_file,
             "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
             "-c:a", "libmp3lame", "-b:a", "192k", out_path],
            check=True,
        )
        os.unlink(list_file)
        print(f"  ✓ 連結+正規化: {out_path}")

    print("完了。")


if __name__ == "__main__":
    sys.exit(main())
