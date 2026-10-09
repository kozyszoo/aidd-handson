import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { FONT_STACK, T } from "../theme";

export type TagItem = {
  tag: string;
  title: string;
  desc: React.ReactNode;
};

// 「タグ + 見出し + 説明」のカードを縦に並べて順に出す。件数は内容で決める。
export const TagListScene: React.FC<{
  title: string;
  kicker?: string;
  items: TagItem[];
  note?: string;
  noteStrong?: boolean;
  itemDelay?: number;
}> = ({ title, kicker, items, note, noteStrong, itemDelay = 11 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dense = items.length >= 5;

  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: dense ? 14 : 20 }}>
        {items.map((it, i) => {
          const s = spring({ frame: frame - 18 - i * itemDelay, fps, config: { damping: 200 } });
          const x = interpolate(s, [0, 1], [-40, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: s,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: T.paper,
                borderRadius: 16,
                borderLeft: `10px solid ${T.accent}`,
                padding: dense ? "16px 30px" : "22px 34px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                fontFamily: FONT_STACK,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  minWidth: 120,
                  textAlign: "center",
                  background: T.accent,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 25,
                  padding: "9px 20px",
                  borderRadius: 999,
                }}
              >
                {it.tag}
              </span>
              <div>
                <div style={{ fontWeight: 800, fontSize: dense ? 32 : 37, color: T.ink }}>
                  {it.title}
                </div>
                <div
                  style={{
                    fontSize: dense ? 26 : 29,
                    color: T.inkSoft,
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {it.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
