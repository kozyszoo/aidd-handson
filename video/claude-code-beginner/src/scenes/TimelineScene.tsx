import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { FONT_STACK, T } from "../theme";

export type TimelinePoint = {
  when: string; // 「1.5か月前」「当日」
  items: React.ReactNode[]; // その時点でやること
  tone?: "accent" | "green" | "red";
};

// 時間の軸。左が早く、右が開催日。「いつ何をするか」を一望する図。
export const TimelineScene: React.FC<{
  title: string;
  kicker?: string;
  points: TimelinePoint[];
  endLabel?: string; // 軸の右端（「開催日」など）
  note?: string;
  noteStrong?: boolean;
  fontSize?: number;
}> = ({ title, kicker, points, endLabel, note, noteStrong, fontSize = 28 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineP = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const tones = {
    accent: { dot: T.accent, text: T.accentDeep, soft: T.accentSoft },
    green: { dot: T.green, text: T.green, soft: T.greenSoft },
    red: { dot: T.red, text: T.red, soft: T.redSoft },
  };
  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, fontFamily: FONT_STACK }}>
        {/* 軸 */}
        <div style={{ position: "relative", height: 90 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 40,
              height: 10,
              borderRadius: 5,
              background: `linear-gradient(90deg, ${T.line}, ${T.accent})`,
              transform: `scaleX(${lineP})`,
              transformOrigin: "left center",
            }}
          />
          {endLabel ? (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                fontSize: 26,
                fontWeight: 900,
                color: T.accentDeep,
                opacity: lineP,
              }}
            >
              {endLabel} ▼
            </div>
          ) : null}
          <div style={{ display: "flex", gap: 22, position: "absolute", left: 0, right: 0, top: 26 }}>
            {points.map((pt, i) => {
              const p = spring({ frame: frame - 14 - i * 10, fps, config: { damping: 200 } });
              const tone = tones[pt.tone ?? "accent"];
              return (
                <div key={i} style={{ flex: 1, position: "relative", opacity: p }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 19,
                      background: tone.dot,
                      border: "6px solid #fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* 各時点のカード */}
        <div style={{ display: "flex", gap: 22, paddingRight: 0 }}>
          {points.map((pt, i) => {
            const p = spring({ frame: frame - 18 - i * 10, fps, config: { damping: 200 } });
            const tone = tones[pt.tone ?? "accent"];
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: T.paper,
                  borderRadius: 18,
                  borderTop: `10px solid ${tone.dot}`,
                  padding: "18px 24px 22px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 18}px)`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 900, color: tone.text }}>{pt.when}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {pt.items.map((it, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize,
                        color: T.ink,
                        lineHeight: 1.4,
                      }}
                    >
                      <div
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 5,
                          background: tone.dot,
                          marginTop: (fontSize * 1.4 - 9) / 2,
                          flexShrink: 0,
                        }}
                      />
                      <div>{it}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
};
