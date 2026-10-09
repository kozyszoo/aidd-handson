import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { SectionHeader } from "../components/ui";
import { FONT_STACK, theme } from "../theme";

type Props = {
  title: string;
  kicker?: string;
  src: string;
  note?: string;
};

// 縦横比を保った画像を、見出しと補足を除く領域いっぱいに落ち着いて見せる。
export const ImageScene: React.FC<Props> = ({ title, kicker, src, note }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200 },
  });
  const scale = interpolate(entrance, [0, 1], [0.975, 1]);

  return (
    <Backdrop>
      <AbsoluteFill style={{ padding: "56px 96px 48px 96px" }}>
        <SectionHeader title={title} kicker={kicker} delay={2} />

        <div
          style={{
            flex: 1,
            minHeight: 0,
            marginTop: 28,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              flex: 1,
              minHeight: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: entrance,
              transform: `scale(${scale})`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: 8,
                boxSizing: "border-box",
                overflow: "hidden",
                background: theme.paper,
                border: `1px solid ${theme.line}`,
                borderRadius: 20,
                boxShadow: "0 16px 34px rgba(0,60,0,0.09)",
              }}
            >
              <Img
                src={staticFile(src)}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: 14,
                }}
              />
            </div>
          </div>

          {note && (
            <div
              style={{
                flexShrink: 0,
                fontFamily: FONT_STACK,
                fontSize: 28,
                fontWeight: 600,
                lineHeight: 1.35,
                color: theme.inkSoft,
                textAlign: "center",
              }}
            >
              {note}
            </div>
          )}
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
