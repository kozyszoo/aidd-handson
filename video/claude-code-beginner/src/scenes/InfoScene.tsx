import React from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Bullets, SectionHeader } from "../components/ui";
import { theme } from "../theme";

// 見出し＋箇条書き（本文解説の基本シーン）
// 語りに対して画面が薄くなりやすい。使うのは「一文ずつ噛みしめる」場面だけにし、
// 比較・順番・時期がある内容は ColumnsScene / FlowScene / TableScene / TimelineScene を使う。
export const InfoScene: React.FC<{
  title: string;
  kicker?: string;
  items: React.ReactNode[];
  fontSize?: number;
}> = ({ title, kicker, items, fontSize = 40 }) => {
  return (
    <Backdrop>
      <AbsoluteFill style={{ padding: "56px 96px 48px 96px" }}>
        <SectionHeader title={title} kicker={kicker} delay={2} />
        <AbsoluteFill
          style={{
            // 下端まで含めて中央を取ると重心が下へ寄るので、下にも余白を置く
            top: 150,
            bottom: 110,
            // AbsoluteFill は height:100% を既定で当てるため、bottom だけでは効かない
            height: "auto",
            justifyContent: "center",
            paddingLeft: 96,
            paddingRight: 140,
          }}
        >
          <Bullets items={items} startFrame={16} perItem={14} fontSize={fontSize} gap={26} />
        </AbsoluteFill>
      </AbsoluteFill>
    </Backdrop>
  );
};

// 出典・脚注バー（画面右下に小さく出す）
export const SourceNote: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      bottom: 30,
      right: 50,
      fontSize: 20,
      color: theme.inkSoft,
      fontFamily: "inherit",
      opacity: 0.7,
    }}
  >
    {text}
  </div>
);
