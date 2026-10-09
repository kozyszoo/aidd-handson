import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { FONT_STACK, T } from "../theme";

// 章の切り替わり。絵文字＋章名＋一言。番号バッジは置かない（kicker に「第2章」を書けば足りる）。
export const SectionCard: React.FC<{
  title: string;
  subtitle?: string;
  emoji?: string;
  kicker?: string;
}> = ({ title, subtitle, emoji, kicker }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const q = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily: FONT_STACK,
          gap: 22,
        }}
      >
        {emoji ? (
          <div style={{ fontSize: 120, transform: `scale(${p})`, lineHeight: 1 }}>{emoji}</div>
        ) : null}
        {kicker ? (
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: T.accentDeep,
              letterSpacing: 3,
              opacity: q,
            }}
          >
            {kicker}
          </div>
        ) : null}
        <div
          style={{
            fontWeight: 900,
            fontSize: 78,
            color: T.ink,
            opacity: q,
            transform: `translateY(${(1 - q) * 16}px)`,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: 36,
              color: T.inkSoft,
              opacity: q,
              transform: `translateY(${(1 - q) * 16}px)`,
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </AbsoluteFill>
    </Backdrop>
  );
};
