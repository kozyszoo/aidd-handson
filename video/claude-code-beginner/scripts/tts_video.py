#!/usr/bin/env python3
"""narration/stepN.md の各シーン（`## key` の見出し＋ <!-- 語り --> ）を VOICEVOX で音声にし、
src/data/stepN.json（尺）と public/audio/stepN/ を更新する。

  python3 scripts/tts_video.py step0                 # 全シーン再生成
  python3 scripts/tts_video.py step0 --only intro    # 指定シーンだけ（尺 JSON は既存分を保つ）
  python3 scripts/tts_video.py step0 --kana          # 読み（カナ）だけ出す。音声は作らない
"""
import argparse, json, os, re, shutil, sys, urllib.parse, urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from tts_narrate_voicevox import ENGINE, synthesize_one, wav_duration  # noqa: E402

ROOT = os.path.join(os.path.dirname(__file__), "..")


def parse(md_path):
    text = open(md_path, encoding="utf-8").read()
    scenes = []
    for part in re.split(r"(?m)^## ", text)[1:]:
        key = part.split("\n", 1)[0].strip()
        blocks = [b.strip() for b in re.findall(r"<!--(.*?)-->", part, re.S) if b.strip()]
        if blocks:
            scenes.append((key, "\n".join(blocks)))
    return scenes


def kana(text, speaker):
    q = urllib.parse.urlencode({"text": text, "speaker": speaker})
    req = urllib.request.Request(f"{ENGINE}/audio_query?{q}", method="POST")
    query = json.loads(urllib.request.urlopen(req, timeout=30).read())
    return "/".join("".join(m["text"] for m in a["moras"]) for a in query["accent_phrases"])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--speaker", type=int, default=8)
    ap.add_argument("--speed", type=float, default=1.05)
    ap.add_argument("--only", nargs="*")
    ap.add_argument("--kana", action="store_true")
    a = ap.parse_args()
    try:
        urllib.request.urlopen(f"{ENGINE}/version", timeout=3).read()
    except Exception as e:
        sys.exit(f"VOICEVOX に接続できません。VOICEVOX.app を起動してください: {e}")
    scenes = parse(os.path.join(ROOT, "narration", f"{a.video}.md"))
    if a.kana:
        for k, t in scenes:
            print(f"## {k}\n{kana(t.replace(chr(10), '、'), a.speaker)}\n")
        return
    adir = os.path.join(ROOT, "audio", a.video)
    pdir = os.path.join(ROOT, "public", "audio", a.video)
    os.makedirs(adir, exist_ok=True)
    os.makedirs(pdir, exist_ok=True)
    jpath = os.path.join(ROOT, "src", "data", f"{a.video}.json")
    data = json.load(open(jpath)) if a.only else {}
    for k, t in scenes:
        if a.only and k not in a.only and k in data:
            continue
        wav = os.path.join(adir, f"{k}.wav")
        with open(wav, "wb") as f:
            f.write(synthesize_one(t.replace("\n", "、"), a.speaker, a.speed))
        shutil.copyfile(wav, os.path.join(pdir, f"{k}.wav"))
        sec = round(wav_duration(wav), 3)
        data[k] = {"file": f"audio/{a.video}/{k}.wav", "sec": sec}
        print(f"  ✓ {k}  {sec}s  ({len(t)}字)")
    # 台本から消えたシーンは JSON からも外す
    data = {k: data[k] for k, _ in scenes if k in data}
    json.dump(data, open(jpath, "w"), ensure_ascii=False, indent=2)
    print(f"{a.video}: {len(data)} シーン / 音声 合計 {sum(v['sec'] for v in data.values()):.0f} 秒")


main()
