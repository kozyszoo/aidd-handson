import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_STACK, T } from "../theme";

// 見出し。章番号バッジ（頭文字の四角）は置かない — 意味が伝わらず視線を奪うだけだった。
// 補助情報は kicker（小さな上書き。「第2章」「段階3 / 7」など）で示す。
export const SectionHeader: React.FC<{
  title: string;
  kicker?: string;
  delay?: number;
  size?: number;
}> = ({ title, kicker, delay = 0, size = 54 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        opacity: p,
        transform: `translateY(${(1 - p) * -14}px)`,
        fontFamily: FONT_STACK,
      }}
    >
      {kicker ? (
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: T.accentDeep,
            letterSpacing: 2,
          }}
        >
          {kicker}
        </div>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 10,
            height: size * 0.9,
            borderRadius: 5,
            background: T.accent,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontWeight: 800,
            fontSize: size,
            color: T.ink,
            lineHeight: 1.2,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

// 箇条書き。並べる項目の数は内容で決める（3つに揃えない）。
export const Bullets: React.FC<{
  items: React.ReactNode[];
  startFrame?: number;
  perItem?: number;
  fontSize?: number;
  gap?: number;
}> = ({ items, startFrame = 0, perItem = 12, fontSize = 34, gap = 18 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {items.map((it, i) => {
        const f = frame - startFrame - i * perItem;
        const o = interpolate(f, [0, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const x = interpolate(f, [0, 12], [24, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              opacity: o,
              transform: `translateX(${x}px)`,
              fontFamily: FONT_STACK,
              fontSize,
              color: T.ink,
              lineHeight: 1.45,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                marginTop: (fontSize * 1.45 - 12) / 2,
                borderRadius: 6,
                background: T.accent,
                flexShrink: 0,
              }}
            />
            <div>{it}</div>
          </div>
        );
      })}
    </div>
  );
};

// 画面下部の補足帯（出典・注記）。
export const Caption: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame - delay, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "16px 70px",
        background: "rgba(26,26,26,0.85)",
        color: "#fff",
        fontFamily: FONT_STACK,
        fontSize: 26,
        opacity: o,
      }}
    >
      {text}
    </div>
  );
};

export const Chip: React.FC<{
  children: React.ReactNode;
  color?: string;
  bg?: string;
  size?: number;
}> = ({ children, color = T.accentDeep, bg = T.accentSoft, size = 22 }) => (
  <span
    style={{
      display: "inline-block",
      padding: `${Math.round(size * 0.22)}px ${Math.round(size * 0.65)}px`,
      borderRadius: 999,
      background: bg,
      color,
      fontFamily: FONT_STACK,
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

// 画面下の注記（薄い文字・1行）。
export const FootNote: React.FC<{ text: string; delay?: number; strong?: boolean }> = ({
  text,
  delay = 0,
  strong = false,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        fontFamily: FONT_STACK,
        fontSize: strong ? 30 : 28,
        fontWeight: strong ? 800 : 500,
        color: strong ? T.ink : T.inkSoft,
        opacity: o,
        lineHeight: 1.4,
        padding: strong ? "16px 26px" : 0,
        background: strong ? T.yellowSoft : "transparent",
        borderLeft: strong ? `8px solid ${T.yellowLine}` : "none",
        borderRadius: strong ? 12 : 0,
      }}
    >
      {text}
    </div>
  );
};

// 出現アニメの共通ヘルパー。frame から見て delay 後に 0→1。
export const useReveal = (delay: number, length = 12) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delay, [0, length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
