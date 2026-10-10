// Step 4「見た目や並び順を、言葉で頼んで直す」の解説動画（各 Step のハンズオンの前に見る）。語りは narration/step4.md。
import React from "react";
import { makeVideo } from "../lib/makeVideo";
import { ColumnsScene } from "../scenes/ColumnsScene";
import { PairScene } from "../scenes/PairScene";
import { StepsScene } from "../scenes/StepsScene";
import { SummaryScene } from "../scenes/SummaryScene";
import { TableScene } from "../scenes/TableScene";
import { TitleScene } from "../scenes/TitleScene";
import { T } from "../theme";

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontWeight: 800, color: T.accentDeep }}>{children}</span>
);

export const Video = makeVideo("step4", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 解説動画"
        title="Step 4 直す"
        subtitle="見た目や並び順を、言葉で"
        accentWord="頼んで直す"
        audience="手を動かす前に、この Step の流れをつかみたいかたへ"
      />
    ),
  },
  {
    key: "goal",
    node: (
      <ColumnsScene
        title="用意されたお願い文は 3 つ"
        kicker="Step 4"
        lead="1 つか 2 つ選んで送る。自分で考えたお願いでもよい"
        columns={[
          { heading: "並び順を変える", emoji: "📊", tone: "accent", items: ["利用先ごとの合計を", "金額の大きい順に並べる"] },
          { heading: "絞り込みを足す", emoji: "🔍", tone: "green", items: ["利用先を選ぶ欄を足す", "選んだ利用先だけ表示"] },
          { heading: "見出しを足す", emoji: "🏷️", tone: "blue", items: ["ページの一番上に", "何年何月の明細かを出す"] },
        ]}
        note="できたページを見て、変えたいところを言葉で伝える"
      />
    ),
  },
  {
    key: "prompts",
    node: (
      <TableScene
        title="3 つのお願い文"
        kicker="Step 4"
        columns={["種類", "送るお願い文"]}
        widths={[1, 3.4]}
        rowDelay={[90, 420, 840]}
        fontSize={33}
        rows={[
          ["並び順を変える", <>利用先ごとの合計を、金額の大きい順に並べてください。<br />棒グラフの右に、全体に占める割合（％）も出してください。</>],
          ["絞り込みを足す", <>明細の表の上に、利用先を選ぶ欄を足してください。<br />選んだ利用先の明細だけが表に出るようにしてください。<br />合計とグラフは全体のままにしてください。</>],
          ["見出しを足す", <>ページの一番上に、読み込んだ明細が何年何月のものかを<br />「2026年9月の出費」のように出してください。<br />月は、明細の利用日から決めてください。</>],
        ]}
      />
    ),
  },
  {
    key: "check",
    node: (
      <StepsScene
        title="直したあとに確かめること"
        kicker="Step 4"
        stepDelay={150}
        steps={[
          { label: "変えるファイルを見て Accept", desc: <>確認の画面で <Strong>index.html</Strong> であることを見る</> },
          { label: "読み込み直して CSV を選ぶ", desc: "もう一度 9 月の CSV を選ぶ" },
          { label: "頼んだところが変わったか見る", desc: "並び順・絞り込み・見出し" },
          { label: "合計が 9,440 円のままか見る", desc: <>前は合っていた数字が<Strong>変わっていないか</Strong></> },
        ]}
      />
    ),
  },
  {
    key: "why",
    node: (
      <PairScene
        title="4 つ目の確認が大事な理由"
        kicker="Step 4"
        lead="直すたびに、答えが分かっている数字を 1 つ見直す"
        leftHead="起こりうること"
        rightHead="見直す数字"
        rowDelay={140}
        rows={[
          { emoji: "⚠️", left: <>見た目を直したら<br />前は合っていた数字が変わる</>, right: <>9 月の合計は<Strong>9,440 円</Strong></> },
        ]}
      />
    ),
  },
  {
    key: "tips",
    node: (
      <PairScene
        title="頼み方のコツ"
        kicker="Step 4"
        lead="「いい感じにして」では、何を変えるかを Claude が決めてしまう"
        leftHead="伝わりにくい"
        rightHead="伝わりやすい（どこを・どう変えるか）"
        rowDelay={330}
        fontSize={29}
        rows={[
          { emoji: "👀", left: "見やすくして", right: <>合計の数字を、今の 2 倍の大きさにして、<br />ページの一番上に置いて</> },
          { emoji: "📉", left: "グラフを直して", right: <>棒グラフの棒が短くて差が分かりません。<br />一番大きい金額の棒が、横幅いっぱいになるようにして</> },
          { emoji: "📦", left: "全部まとめて直して", right: <><Strong>1 回に 1 つだけ</Strong>頼み、確かめてから次を頼む</> },
        ]}
      />
    ),
  },
  {
    key: "trouble",
    node: (
      <PairScene
        title="うまくいかないとき"
        kicker="Step 4"
        leftHead="起きていること"
        rightHead="送るお願い・直し方"
        rowDelay={380}
        fontSize={28}
        rows={[
          { emoji: "🔄", left: "直したのに、画面が変わらない", right: <>ページを読み込み直していない可能性。<br /><Strong>読み込み直して、CSV を選び直す</Strong></> },
          { emoji: "↩️", left: "直したら、前より悪くなった", right: <>「今の変更を取り消して、変更の前の状態に戻してください」。<br />そのあと、頼み方を変えて送り直す</> },
          { emoji: "🔢", left: "直したら、合計が変わった", right: <>「9 月の CSV を選ぶと合計が◯◯円と出ます。<br /><Strong>正しくは 9,440 円です。直してください</Strong>」</> },
          { emoji: "🧩", left: "頼んでいないところまで変わった", right: <>「頼んだところ以外は、前のままに戻してください」。<br />次から最後に<Strong>「ほかの部分は変えないでください」</Strong></> },
        ]}
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 4 のまとめ"
        lead="言葉で直すときの 3 つ"
        rows={[
          { emoji: "✏️", label: "どこを・どう変えるか書く", desc: "頼むのは 1 回に 1 つ" },
          { emoji: "📄", label: "Accept の前にファイル名を見る", desc: "index.html であることを確かめる" },
          { emoji: "🔢", label: "直すたびに数字を確かめる", desc: "読み込み直して、合計が 9,440 円のままか" },
        ]}
        outroLabel="このあと"
        outroText="Step 4 のハンズオン：見た目や並び順を、言葉で頼んで直す"
      />
    ),
  },
]);
