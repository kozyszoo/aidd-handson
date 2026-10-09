import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Chip } from "../components/ui";
import { FONT_STACK, T } from "../theme";

export type TableCell = React.ReactNode | { chip: string; tone?: "green" | "blue" | "red" | "accent" | "yellow" };

const isChip = (c: TableCell): c is { chip: string; tone?: "green" | "blue" | "red" | "accent" | "yellow" } =>
  typeof c === "object" && c !== null && "chip" in (c as object);

const CHIP_TONES = {
  green: { color: T.green, bg: T.greenSoft },
  blue: { color: T.blue, bg: T.blueSoft },
  red: { color: T.red, bg: T.redSoft },
  accent: { color: T.accentDeep, bg: T.accentSoft },
  yellow: { color: "#8a6a00", bg: T.yellowSoft },
};

// 表。行を1つずつ出す。「5つの仕事 × 重さ・時期・最初の一歩」のように、
// 語りが順に触れる内容を1画面に並べる。行の出るタイミングは rowDelay で語りに合わせる。
export const TableScene: React.FC<{
  title: string;
  kicker?: string;
  columns: string[];
  widths?: number[]; // 列幅の比（省略時は等分。1列目だけ広くしたいなら [1.3,1,1,...]）
  rows: TableCell[][];
  rowDelay?: number | number[]; // 行ごとの出現フレーム（数値なら等間隔）
  note?: string;
  noteStrong?: boolean;
  fontSize?: number;
  firstColStrong?: boolean;
}> = ({
  title,
  kicker,
  columns,
  widths,
  rows,
  rowDelay = 14,
  note,
  noteStrong,
  fontSize = 28,
  firstColStrong = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = widths ?? columns.map(() => 1);
  const template = w.map((x) => `${x}fr`).join(" ");
  const headP = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const delays = Array.isArray(rowDelay)
    ? rowDelay
    : rows.map((_, i) => 20 + i * rowDelay);

  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div
        style={{
          background: T.paper,
          borderRadius: 20,
          boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          overflow: "hidden",
          fontFamily: FONT_STACK,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: template,
            background: T.accentDeep,
            color: "#fff",
            fontSize: fontSize * 0.92,
            fontWeight: 800,
            opacity: headP,
          }}
        >
          {columns.map((c, i) => (
            <div key={i} style={{ padding: "18px 26px" }}>
              {c}
            </div>
          ))}
        </div>
        {rows.map((r, i) => {
          const p = spring({ frame: frame - delays[i], fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: template,
                borderTop: i === 0 ? "none" : `2px solid ${T.line}`,
                background: i % 2 === 1 ? "#f7f9fd" : T.paper,
                opacity: p,
                transform: `translateX(${(1 - p) * 24}px)`,
              }}
            >
              {r.map((cell, j) => (
                <div
                  key={j}
                  style={{
                    padding: "22px 26px",
                    fontSize: j === 0 && firstColStrong ? fontSize * 1.12 : fontSize,
                    fontWeight: j === 0 && firstColStrong ? 800 : 500,
                    color: T.ink,
                    lineHeight: 1.4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isChip(cell) ? (
                    <Chip
                      color={CHIP_TONES[cell.tone ?? "accent"].color}
                      bg={CHIP_TONES[cell.tone ?? "accent"].bg}
                      size={fontSize * 0.9}
                    >
                      {cell.chip}
                    </Chip>
                  ) : (
                    <div>{cell as React.ReactNode}</div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
