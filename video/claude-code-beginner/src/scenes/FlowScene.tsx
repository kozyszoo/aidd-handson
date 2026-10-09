import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Chip } from "../components/ui";
import { FONT_STACK, T } from "../theme";

export type FlowStep = {
  label: React.ReactNode; // 長い語は <br /> で意図した位置で折る（自動折返しは語の途中で切れる）
  desc?: React.ReactNode; // 箱の中、label の下に置く補足（例・時期・相手）
  tag?: string; // 箱の中の小ラベル（「例」「1.5か月前」など）
  emoji?: string; // 箱の上部に置く絵文字（段階を一目で見分けるための図の代わり）
  active?: boolean; // いまの段階を強調
  tone?: "accent" | "green" | "gray";
};

// 横に流れる図。「A → B → C」の順番・段階を見せる。
// 箱の数は 3〜7 を想定。7 のときは label を短く（8字以内）する。
// 箱と矢印を CSS grid の列に置き、groups（括弧）も同じ列に揃える。
// 箱同士の高さは揃える（desc が長い箱に他も揃う）が、本文いっぱいには伸ばさない。
// 中身が少ないのに枠だけ大きいと空白が目立つので、代わりに文字を大きくする。
export const FlowScene: React.FC<{
  title: string;
  kicker?: string;
  lead?: string;
  steps: FlowStep[];
  groups?: { from: number; to: number; label: string }[]; // 0始まり・両端含む
  note?: string;
  noteStrong?: boolean;
}> = ({ title, kicker, lead, steps, groups, note, noteStrong }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const leadP = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const many = steps.length >= 6;
  const labelSize = many ? 32 : 44;
  const descSize = many ? 30 : 31; // 本文は30px未満にしない（箱が細くても2行に折って読ませる）
  const arrowW = many ? 30 : 48;
  const cols = steps
    .map((_, i) => (i < steps.length - 1 ? `1fr ${arrowW}px` : "1fr"))
    .join(" ");
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: cols,
    columnGap: many ? 8 : 12,
    alignItems: "stretch",
  };

  return (
    <SceneFrame title={title} kicker={kicker} note={note} noteStrong={noteStrong}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {lead ? (
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: 42,
              fontWeight: 800,
              color: T.ink,
              lineHeight: 1.35,
              opacity: leadP,
              transform: `translateY(${(1 - leadP) * 10}px)`,
            }}
          >
            {lead}
          </div>
        ) : null}
        {groups ? (
          <div style={gridStyle}>
            {groups.map((g, k) => {
              const gp = spring({ frame: frame - 36, fps, config: { damping: 200 } });
              return (
                <div
                  key={k}
                  style={{
                    gridColumn: `${2 * g.from + 1} / ${2 * g.to + 2}`,
                    opacity: gp,
                    fontFamily: FONT_STACK,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div style={{ fontSize: 26, fontWeight: 800, color: T.accentDeep }}>
                    {g.label}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 12,
                      borderLeft: `4px solid ${T.accentDeep}`,
                      borderRight: `4px solid ${T.accentDeep}`,
                      borderTop: `4px solid ${T.accentDeep}`,
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
        <div style={gridStyle}>
          {steps.map((s, i) => {
            const p = spring({ frame: frame - 14 - i * 8, fps, config: { damping: 200 } });
            const tone =
              s.tone === "green"
                ? { bg: T.greenSoft, line: T.green, text: T.green }
                : s.tone === "gray"
                  ? { bg: "#f0f0f0", line: T.line, text: T.inkSoft }
                  : { bg: T.accentSoft, line: T.accent, text: T.accentDeep };
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    // 強調は「薄い塗り＋太い枠」。濃い塗りにすると desc 内の <Strong> が読めなくなる
                    background: s.active ? tone.bg : T.paper,
                    color: s.active ? tone.text : T.ink,
                    border: `${s.active ? 6 : 4}px solid ${tone.line}`,
                    borderRadius: 22,
                    padding: many ? "22px 10px" : "36px 30px", // 7箱のとき左右10px → 30pxの本文が6文字まで折れずに入る
                    boxShadow: s.active
                      ? "0 14px 30px rgba(37,99,235,0.25)"
                      : "0 8px 20px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // 上揃え。中央揃えだと中身の少ない箱だけ絵文字が下がり、横一列に見えない
                    justifyContent: "flex-start",
                    gap: many ? 10 : 18,
                    minHeight: many ? 200 : 300,
                    minWidth: 0,
                    opacity: p,
                    transform: `translateY(${(1 - p) * 18}px)`,
                    fontFamily: FONT_STACK,
                  }}
                >
                  {s.emoji ? (
                    <div style={{ fontSize: many ? 44 : 64, lineHeight: 1 }}>{s.emoji}</div>
                  ) : null}
                  {s.tag ? (
                    <Chip
                      color={s.active ? "#fff" : tone.text}
                      bg={s.active ? tone.line : tone.bg}
                      size={many ? 19 : 22}
                    >
                      {s.tag}
                    </Chip>
                  ) : null}
                  <div
                    style={{
                      fontSize: labelSize,
                      fontWeight: 800,
                      textAlign: "center",
                      lineHeight: 1.25,
                      wordBreak: "keep-all",
                    }}
                  >
                    {s.label}
                  </div>
                  {s.desc ? (
                    <div
                      style={{
                        fontSize: descSize,
                        lineHeight: 1.45,
                        textAlign: "center",
                        color: T.ink,
                        maxWidth: "100%",
                      }}
                    >
                      {s.desc}
                    </div>
                  ) : null}
                </div>
                {i < steps.length - 1 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: many ? 26 : 36,
                      color: T.accentDeep,
                      fontWeight: 900,
                      opacity: p,
                    }}
                  >
                    ▶
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
};
