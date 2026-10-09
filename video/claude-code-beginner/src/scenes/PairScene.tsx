import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { FONT_STACK, T } from "../theme";

export type PairRow = {
  left: React.ReactNode;
  right: React.ReactNode;
  tag?: string;
  emoji?: string; // 左の箱の先頭に置く絵文字。行を一目で見分ける
};

// 「やりたいこと → 先にすること」のように、左右の対応を矢印で結ぶ図。
// 注意事項・禁止と代替・原因と対処に使う。
// 文字の大きさは行数から決める（3行以下なら大きく）。行を本文いっぱいに伸ばさない。
export const PairScene: React.FC<{
  title: string;
  kicker?: string;
  lead?: string; // 表の上に置く一文
  leftHead: string;
  rightHead: string;
  rows: PairRow[];
  rowDelay?: number;
  note?: string;
  noteStrong?: boolean;
  fontSize?: number;
}> = ({ title, kicker, lead, leftHead, rightHead, rows, rowDelay = 12, note, noteStrong, fontSize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headP = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const fs = fontSize ?? (rows.length <= 3 ? 36 : rows.length <= 4 ? 33 : 30);
  const cols = "1fr 80px 1.25fr";
  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, fontFamily: FONT_STACK }}>
        {lead ? (
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: T.ink,
              lineHeight: 1.35,
              marginBottom: 10,
              opacity: headP,
              transform: `translateY(${(1 - headP) * 10}px)`,
            }}
          >
            {lead}
          </div>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            opacity: headP,
            fontSize: 30,
            fontWeight: 800,
            color: T.inkSoft,
            padding: "0 26px",
          }}
        >
          <div>{leftHead}</div>
          <div />
          <div>{rightHead}</div>
        </div>
        {rows.map((r, i) => {
          const p = spring({ frame: frame - 18 - i * rowDelay, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: cols,
                alignItems: "center",
                opacity: p,
                transform: `translateX(${(1 - p) * 24}px)`,
              }}
            >
              <div
                style={{
                  background: T.paper,
                  borderRadius: 16,
                  padding: "24px 30px",
                  fontSize: fs,
                  fontWeight: 700,
                  color: T.ink,
                  lineHeight: 1.4,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  borderLeft: `8px solid ${T.line}`,
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                {r.emoji ? (
                  <span style={{ fontSize: Math.round(fs * 1.4), lineHeight: 1, flexShrink: 0 }}>
                    {r.emoji}
                  </span>
                ) : null}
                {r.tag ? (
                  <span
                    style={{
                      fontSize: fs * 0.8,
                      fontWeight: 800,
                      color: T.inkSoft,
                      background: "#f0f0f0",
                      borderRadius: 999,
                      padding: "4px 12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.tag}
                  </span>
                ) : null}
                <div>{r.left}</div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 38,
                  fontWeight: 900,
                  color: T.accentDeep,
                }}
              >
                ▶
              </div>
              <div
                style={{
                  background: T.accentSoft,
                  borderRadius: 16,
                  padding: "24px 30px",
                  fontSize: fs,
                  fontWeight: 800,
                  color: T.accentDeep,
                  lineHeight: 1.4,
                  borderLeft: `8px solid ${T.accent}`,
                }}
              >
                {r.right}
              </div>
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
