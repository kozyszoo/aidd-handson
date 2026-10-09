import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { FONT_STACK, T } from "../theme";

export type SummaryRow = {
  label: string;
  desc: string;
  example?: string;
  emoji?: string;
};

// まとめ。持ち帰る項目を並べ、最後に「次に見る資料」を出す。
export const SummaryScene: React.FC<{
  title?: string;
  kicker?: string;
  lead?: string;
  rows: SummaryRow[];
  outroEmoji?: string;
  outroLabel?: string;
  outroText?: string;
  note?: string;
}> = ({
  title = "まとめ",
  kicker,
  lead,
  rows,
  outroEmoji = "📄",
  outroLabel = "次に見る資料",
  outroText,
  note,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const leadP = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const outroP = spring({
    frame: frame - 24 - rows.length * 12,
    fps,
    config: { damping: 200 },
  });
  const cols = rows.length <= 2 ? 1 : 2;
  return (
    <SceneFrame title={title} kicker={kicker} note={note}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          fontFamily: FONT_STACK,
        }}
      >
        {lead ? (
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: T.accentDeep,
              opacity: leadP,
            }}
          >
            {lead}
          </div>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 24,
          }}
        >
          {rows.map((r, i) => {
            const p = spring({
              frame: frame - 14 - i * 12,
              fps,
              config: { damping: 200 },
            });
            return (
              <div
                key={i}
                style={{
                  background: T.paper,
                  borderRadius: 18,
                  borderLeft: `10px solid ${T.accent}`,
                  padding: "26px 32px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 16}px)`,
                  display: "flex",
                  gap: 22,
                  alignItems: "flex-start",
                }}
              >
                {r.emoji ? (
                  <div
                    style={{
                      fontSize: 56,
                      lineHeight: 1,
                      marginTop: 4,
                      flexShrink: 0,
                    }}
                  >
                    {r.emoji}
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: T.ink,
                      lineHeight: 1.2,
                    }}
                  >
                    {r.label}
                  </div>
                  <div style={{ fontSize: 31, color: T.ink, lineHeight: 1.4 }}>
                    {r.desc}
                  </div>
                  {r.example ? (
                    <div
                      style={{
                        fontSize: 30,
                        color: T.accentDeep,
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      例: {r.example}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        {outroText ? (
          <div
            style={{
              opacity: outroP,
              transform: `translateY(${(1 - outroP) * 12}px)`,
              display: "flex",
              alignItems: "center",
              gap: 22,
              background: `linear-gradient(135deg, ${T.accent}, ${T.accentDeep})`,
              color: "#fff",
              borderRadius: 18,
              padding: "20px 30px",
            }}
          >
            <div style={{ fontSize: 46, lineHeight: 1 }}>{outroEmoji}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.9 }}>
                {outroLabel}
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.3 }}>
                {outroText}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SceneFrame>
  );
};
