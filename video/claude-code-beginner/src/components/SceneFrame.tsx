import React from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop } from "./Backdrop";
import { FootNote, SectionHeader } from "./ui";

// 全シーン共通の枠。見出し（上）＋本文（中央）＋注記（下）。
// 本文は 1920×1080 のうち上下の余白を除いた領域いっぱいを使う。
export const SceneFrame: React.FC<{
  title: string;
  kicker?: string;
  note?: string;
  noteStrong?: boolean;
  noteDelay?: number;
  titleSize?: number;
  children: React.ReactNode;
}> = ({ title, kicker, note, noteStrong, noteDelay = 40, titleSize, children }) => {
  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          padding: "56px 96px 48px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <SectionHeader title={title} kicker={kicker} size={titleSize} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          {children}
        </div>
        {note ? <FootNote text={note} strong={noteStrong} delay={noteDelay} /> : null}
      </AbsoluteFill>
    </Backdrop>
  );
};
