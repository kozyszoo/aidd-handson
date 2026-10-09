import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// 全シーン共通の背景（やわらかい光のグラデ + ふわっと動く光）
// グラデの色はプレースホルダ。案件のアクセントカラーを薄めた色に差し替える
export const Backdrop: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 26;
  const drift2 = Math.cos(frame / 110) * 22;

  return (
    <AbsoluteFill
      style={{
        background: theme.bg,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${18 + drift}% -8%, #dbe8ff 0, transparent 42%),
            radial-gradient(circle at ${88 + drift2}% 10%, #e4f0fb 0, transparent 40%),
            radial-gradient(circle at 50% 120%, #eaf1ff 0, transparent 55%)`,
        }}
      />
      {/* ほんのり点描の方眼 */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(120,90,50,0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "44px 44px",
          opacity: 0.6,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
