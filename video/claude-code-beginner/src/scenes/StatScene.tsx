import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Chip } from "../components/ui";
import { FONT_STACK, T } from "../theme";

export type Stat = { label: string; value: string; sub?: string; color?: string };
export type StatRow = { label: string; text: React.ReactNode; tone?: "accent" | "red" | "green" };

// 数字を大きく見せる。数字だけで終わらせず、chips（内訳）や rows（数字の意味・課題→対策）を
// 同じ画面に置いて、語りが触れる内容をすべて載せる。
export const StatScene: React.FC<{
  title: string;
  kicker?: string;
  lead?: string; // 数字の上に置く一文（語りの前置きをそのまま載せる）
  stats: Stat[];
  chips?: string[]; // 数字の下に並べる内訳（テーマ別支部など）
  chipsLabel?: string;
  rows?: StatRow[]; // 数字の下の説明行（課題／だから）
  note?: string;
  noteStrong?: boolean;
}> = ({ title, kicker, lead, stats, chips, chipsLabel, rows, note, noteStrong }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const leadP = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const chipsP = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const tones = {
    accent: { text: T.accentDeep, bg: T.accentSoft },
    red: { text: T.red, bg: T.redSoft },
    green: { text: T.green, bg: T.greenSoft },
  };
  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: 30, fontFamily: FONT_STACK }}>
        {lead ? (
          <div
            style={{
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
        <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
          {stats.map((s, i) => {
            const p = spring({
              frame: frame - 10 - i * 10,
              fps,
              config: { damping: 14, stiffness: 130 },
            });
            const color = s.color ?? T.accent;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: T.paper,
                  borderRadius: 24,
                  borderTop: `12px solid ${color}`,
                  padding: "36px 40px",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.07)",
                  opacity: p,
                  transform: `scale(${0.85 + 0.15 * p})`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ fontSize: 31, fontWeight: 700, color: T.inkSoft }}>{s.label}</div>
                <div style={{ fontSize: 84, fontWeight: 900, color: T.ink, lineHeight: 1.1 }}>
                  {s.value}
                </div>
                {s.sub ? (
                  <div style={{ fontSize: 30, color: T.ink, lineHeight: 1.35 }}>{s.sub}</div>
                ) : null}
              </div>
            );
          })}
        </div>
        {chips ? (
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", opacity: chipsP }}>
            {chipsLabel ? (
              <div style={{ fontSize: 33, fontWeight: 800, color: T.ink }}>{chipsLabel}</div>
            ) : null}
            {chips.map((c, i) => (
              <Chip key={i} size={31}>
                {c}
              </Chip>
            ))}
          </div>
        ) : null}
        {rows ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rows.map((r, i) => {
              const p = spring({ frame: frame - 44 - i * 12, fps, config: { damping: 200 } });
              const tone = tones[r.tone ?? "accent"];
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "170px 1fr",
                    gap: 18,
                    alignItems: "center",
                    opacity: p,
                    transform: `translateX(${(1 - p) * 20}px)`,
                  }}
                >
                  <div
                    style={{
                      background: tone.bg,
                      color: tone.text,
                      borderRadius: 12,
                      padding: "10px 14px",
                      fontSize: 29,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    {r.label}
                  </div>
                  <div style={{ fontSize: 33, color: T.ink, lineHeight: 1.4 }}>{r.text}</div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </SceneFrame>
  );
};
