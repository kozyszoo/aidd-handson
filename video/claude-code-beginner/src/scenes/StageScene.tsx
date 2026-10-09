import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Chip } from "../components/ui";
import { FONT_STACK, T } from "../theme";

export type StageInfo = {
  label: string; // 「いつ」「誰に頼むか」「過去の例」など
  emoji?: string;
  text: React.ReactNode;
  tone?: "accent" | "green" | "yellow" | "red";
};

const TONES = {
  accent: { line: T.accent, soft: T.accentSoft, text: T.accentDeep },
  green: { line: T.green, soft: T.greenSoft, text: T.green },
  yellow: { line: T.yellowLine, soft: T.yellowSoft, text: "#8a6a00" },
  red: { line: T.red, soft: T.redSoft, text: T.red },
};

// 「7段階のうち、いまここ」を上の帯で示し、その段階で決めること（左）と、
// いつ・誰に・過去の例（右）を同じ画面に置く。段階ごとに1枚、この型で揃える。
// 帯の番号は順番そのものなので付ける（飾りの番号ではない）。
export const StageScene: React.FC<{
  title: string;
  kicker?: string;
  stages: string[]; // 7段階の短い名前
  current: number; // 0始まり
  lead?: string;
  // columns: 項目が6つ以上あるとき 2 にすると左右2列に並ぶ（文字を小さくせずに全部載せる）
  decide: { heading: string; emoji?: string; items: React.ReactNode[]; columns?: 1 | 2 };
  infos: StageInfo[];
  note?: string;
  noteStrong?: boolean;
  fontSize?: number; // 決めることの文字。省略時は項目数から決める。本文は30px未満にしない
}> = ({ title, kicker, stages, current, lead, decide, infos, note, noteStrong, fontSize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const leadP = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const n = decide.items.length;
  const columns = decide.columns ?? 1;
  const fs = fontSize ?? (n <= 3 ? 38 : n <= 5 || columns === 2 ? 32 : 30);
  const infoFs = Math.max(30, fs - 4);

  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, fontFamily: FONT_STACK }}>
        {/* 段階の帯 */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {stages.map((s, i) => {
            const p = spring({ frame: frame - 4 - i * 3, fps, config: { damping: 200 } });
            const active = i === current;
            const done = i < current;
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    flex: active ? 1.6 : 1,
                    minWidth: 0,
                    background: active ? T.accent : done ? T.accentSoft : T.paper,
                    color: active ? "#fff" : done ? T.accentDeep : T.inkSoft,
                    border: `3px solid ${active ? T.accent : done ? T.accentSoft : T.line}`,
                    borderRadius: 14,
                    padding: active ? "12px 16px" : "10px 12px",
                    fontSize: active ? 28 : 22,
                    fontWeight: 800,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    opacity: p,
                    transform: `translateY(${(1 - p) * 8}px)`,
                    boxShadow: active ? "0 10px 24px rgba(37,99,235,0.3)" : "none",
                  }}
                >
                  {i + 1} {s}
                </div>
                {i < stages.length - 1 ? (
                  <div style={{ fontSize: 18, color: T.inkSoft, fontWeight: 900 }}>▶</div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>

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

        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
          {/* 左: 決めること */}
          {(() => {
            const p = spring({ frame: frame - 18, fps, config: { damping: 200 } });
            return (
              <div
                style={{
                  flex: columns === 2 ? 1.7 : 1.15,
                  background: T.paper,
                  borderRadius: 20,
                  borderTop: `10px solid ${T.accent}`,
                  padding: "26px 34px 32px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  opacity: p,
                  transform: `translateY(${(1 - p) * 20}px)`,
                  minWidth: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {decide.emoji ? (
                    <div style={{ fontSize: 52, lineHeight: 1 }}>{decide.emoji}</div>
                  ) : null}
                  <div style={{ fontSize: Math.round(fs * 1.15), fontWeight: 800, color: T.ink }}>
                    {decide.heading}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: columns === 2 ? "1fr 1fr" : "1fr",
                    columnGap: 28,
                    rowGap: Math.round(fs * 0.45),
                  }}
                >
                  {decide.items.map((it, j) => {
                    const q = spring({ frame: frame - 28 - j * 7, fps, config: { damping: 200 } });
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
                            background: T.accent,
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
          })()}

          {/* 右: いつ・誰に・過去の例 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
            {infos.map((info, i) => {
              const p = spring({ frame: frame - 30 - i * 10, fps, config: { damping: 200 } });
              const tone = TONES[info.tone ?? "accent"];
              return (
                <div
                  key={i}
                  style={{
                    background: T.paper,
                    borderRadius: 18,
                    borderLeft: `10px solid ${tone.line}`,
                    padding: "18px 26px 20px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                    display: "flex",
                    gap: 18,
                    alignItems: "flex-start",
                    opacity: p,
                    transform: `translateX(${(1 - p) * 20}px)`,
                  }}
                >
                  {info.emoji ? (
                    <div style={{ fontSize: 46, lineHeight: 1.1, flexShrink: 0 }}>{info.emoji}</div>
                  ) : null}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                    <div>
                      <Chip color={tone.text} bg={tone.soft} size={24}>
                        {info.label}
                      </Chip>
                    </div>
                    <div style={{ fontSize: infoFs, lineHeight: 1.45, color: T.ink }}>{info.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
