import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { FONT_STACK, T } from "../theme";

export type Step = {
  label: string;
  desc?: React.ReactNode; // 詳細（相手・場所・つまずいたとき）
  aside?: string; // 右端の補足（「開けなければ→」など）
};

// 手順を上から順に。番号は「順番」を表すときだけ使う（飾りの番号は付けない）。
// 最後に done を渡すと「ここまでで完了」の帯を出す。
export const StepsScene: React.FC<{
  title: string;
  kicker?: string;
  steps: Step[];
  done?: string;
  note?: string;
  noteStrong?: boolean;
  stepDelay?: number;
}> = ({ title, kicker, steps, done, note, noteStrong, stepDelay = 16 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const doneP = spring({
    frame: frame - 24 - steps.length * stepDelay,
    fps,
    config: { damping: 200 },
  });
  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, fontFamily: FONT_STACK }}>
        {steps.map((s, i) => {
          const p = spring({ frame: frame - 14 - i * stepDelay, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "96px 1fr auto",
                alignItems: "center",
                gap: 22,
                background: T.paper,
                borderRadius: 18,
                padding: "22px 32px 22px 22px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                opacity: p,
                transform: `translateX(${(1 - p) * 24}px)`,
              }}
            >
              <div
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 37,
                  background: T.accent,
                  color: "#fff",
                  fontSize: 42,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: T.ink, lineHeight: 1.25 }}>
                  {s.label}
                </div>
                {s.desc ? (
                  <div style={{ fontSize: 31, color: T.inkSoft, lineHeight: 1.4 }}>{s.desc}</div>
                ) : null}
              </div>
              {s.aside ? (
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: T.accentDeep,
                    background: T.accentSoft,
                    borderRadius: 12,
                    padding: "12px 20px",
                    maxWidth: 560,
                    lineHeight: 1.35,
                  }}
                >
                  {s.aside}
                </div>
              ) : null}
            </div>
          );
        })}
        {done ? (
          <div
            style={{
              opacity: doneP,
              transform: `translateY(${(1 - doneP) * 10}px)`,
              alignSelf: "flex-start",
              marginTop: 6,
              background: T.greenSoft,
              color: T.green,
              borderRadius: 999,
              padding: "14px 32px",
              fontSize: 33,
              fontWeight: 800,
            }}
          >
            {done}
          </div>
        ) : null}
      </div>
    </SceneFrame>
  );
};
