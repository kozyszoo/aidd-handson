import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Chip } from "../components/ui";
import { FONT_STACK, T } from "../theme";

export type Column = {
  heading: string;
  tag?: string; // 見出し上の小さなラベル（「日常の連絡」「重さ: 小」など）
  emoji?: string; // 見出しの左に置く絵文字。カードを一目で見分けるための図の代わり
  items: React.ReactNode[]; // 箇条書き。数は内容で決める（3つに揃えない）
  tone?: "accent" | "green" | "blue" | "yellow" | "red" | "gray";
  highlight?: boolean; // その列を強調（この案内が扱う範囲、など）
};

const TONES: Record<NonNullable<Column["tone"]>, { line: string; soft: string; text: string }> = {
  accent: { line: T.accent, soft: T.accentSoft, text: T.accentDeep },
  green: { line: T.green, soft: T.greenSoft, text: T.green },
  blue: { line: T.blue, soft: T.blueSoft, text: T.blue },
  yellow: { line: T.yellowLine, soft: T.yellowSoft, text: "#8a6a00" },
  red: { line: T.red, soft: T.redSoft, text: T.red },
  gray: { line: T.line, soft: "#f0f0f0", text: T.inkSoft },
};

// 2〜4列のカード。各列に見出し＋箇条書き。「決める／決めない」「3つの入口」など、
// 並べて比べる内容に使う。
// カードは本文いっぱいに伸ばさない（中身が少ないのに枠だけ大きいと、空白が目立つ）。
// 代わりに文字を大きくする。文字の大きさは、いちばん項目の多い列に合わせて自動で決める。
export const ColumnsScene: React.FC<{
  title: string;
  kicker?: string;
  lead?: string; // 列の上に置く一文（大きめ）
  columns: Column[];
  note?: string;
  noteStrong?: boolean;
  fontSize?: number; // 指定しなければ項目数から決める
}> = ({ title, kicker, lead, columns, note, noteStrong, fontSize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const leadP = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const maxItems = Math.max(...columns.map((c) => c.items.length));
  const fs = fontSize ?? (maxItems <= 2 ? 38 : maxItems <= 4 ? 36 : 31);
  const headingSize = Math.round(fs * 1.2);
  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {lead ? (
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: 42,
              fontWeight: 800,
              color: T.ink,
              lineHeight: 1.35,
              opacity: leadP,
              transform: `translateY(${(1 - leadP) * 10}px)`,
            }}
          >
            {lead}
          </div>
        ) : null}
        <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
          {columns.map((c, i) => {
            const tone = TONES[c.tone ?? "accent"];
            const p = spring({ frame: frame - 14 - i * 9, fps, config: { damping: 200 } });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: T.paper,
                  borderRadius: 20,
                  borderTop: `10px solid ${tone.line}`,
                  boxShadow: c.highlight
                    ? `0 0 0 4px ${tone.line}, 0 14px 30px rgba(0,0,0,0.08)`
                    : "0 10px 24px rgba(0,0,0,0.06)",
                  padding: "34px 38px 40px",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 22}px)`,
                  fontFamily: FONT_STACK,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  minWidth: 0,
                }}
              >
                {c.emoji ? <div style={{ fontSize: 72, lineHeight: 1 }}>{c.emoji}</div> : null}
                {c.tag ? (
                  <div>
                    <Chip color={tone.text} bg={tone.soft} size={Math.round(fs * 0.78)}>
                      {c.tag}
                    </Chip>
                  </div>
                ) : null}
                <div style={{ fontSize: headingSize, fontWeight: 800, color: T.ink, lineHeight: 1.25 }}>
                  {c.heading}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: Math.round(fs * 0.55) }}>
                  {c.items.map((it, j) => {
                    const q = spring({
                      frame: frame - 24 - i * 9 - j * 7,
                      fps,
                      config: { damping: 200 },
                    });
                    return (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          gap: 14,
                          alignItems: "flex-start",
                          fontSize: fs,
                          lineHeight: 1.45,
                          color: T.ink,
                          opacity: q,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            background: tone.line,
                            marginTop: (fs * 1.45 - 12) / 2,
                            flexShrink: 0,
                          }}
                        />
                        <div>{it}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
};
