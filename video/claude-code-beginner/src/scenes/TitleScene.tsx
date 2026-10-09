import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { FONT_STACK, theme } from "../theme";

// タイトルシーンのプレースホルダ。tag/title/subtitle/accentWord/dateText を案件に差し替えて使う
export const TitleScene: React.FC<{
  tag?: string;
  title: string;
  subtitle?: string;
  accentWord?: string;
  audience?: string; // 誰に向けた動画か。音声で言っているなら画面にも出す
  dateText?: string;
}> = ({ tag = "解説動画", title, subtitle, accentWord, audience, dateText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const subS = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const dateS = spring({ frame: frame - 44, fps, config: { damping: 200 } });
  const titleY = interpolate(titleS, [0, 1], [50, 0]);

  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            opacity: subS,
            background: theme.paper,
            border: `2px solid ${theme.accentSoft}`,
            color: theme.accentDeep,
            fontFamily: FONT_STACK,
            fontWeight: 800,
            fontSize: 26,
            padding: "10px 26px",
            borderRadius: 999,
            boxShadow: "0 8px 20px rgba(30,64,175,0.1)",
            marginBottom: 26,
          }}
        >
          {tag}
        </div>

        <div
          style={{
            opacity: titleS,
            transform: `translateY(${titleY}px)`,
            fontFamily: FONT_STACK,
            fontWeight: 900,
            fontSize: 88,
            color: theme.ink,
            textShadow: "0 4px 0 rgba(37,99,235,0.18)",
            letterSpacing: 1,
            textAlign: "center",
            maxWidth: 1600,
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              opacity: subS,
              fontFamily: FONT_STACK,
              fontWeight: 700,
              fontSize: 32,
              color: theme.inkSoft,
              marginTop: 20,
            }}
          >
            {subtitle}
            {accentWord && (
              <span style={{ color: theme.accentDeep }}> {accentWord}</span>
            )}
          </div>
        )}

        {audience && (
          <div
            style={{
              opacity: dateS,
              marginTop: 34,
              fontFamily: FONT_STACK,
              fontWeight: 700,
              fontSize: 30,
              color: theme.ink,
              background: theme.paper,
              border: `2px solid ${theme.line}`,
              borderRadius: 16,
              padding: "14px 32px",
            }}
          >
            {audience}
          </div>
        )}

        {dateText && (
          <div
            style={{
              opacity: dateS,
              marginTop: audience ? 24 : 40,
              fontFamily: FONT_STACK,
              fontSize: 24,
              color: theme.inkSoft,
            }}
          >
            {dateText}
          </div>
        )}
      </AbsoluteFill>
    </Backdrop>
  );
};
