// Step 5「10 月の明細を入れて、合計が合うかを確かめる」の復習動画。語りは narration/step5.md。
import React from "react";
import { makeVideo } from "../lib/makeVideo";
import { ColumnsScene } from "../scenes/ColumnsScene";
import { InfoScene } from "../scenes/InfoScene";
import { PairScene } from "../scenes/PairScene";
import { StepsScene } from "../scenes/StepsScene";
import { SummaryScene } from "../scenes/SummaryScene";
import { TableScene } from "../scenes/TableScene";
import { TitleScene } from "../scenes/TitleScene";
import { T } from "../theme";

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontWeight: 800, color: T.accentDeep }}>{children}</span>
);

export const Video = makeVideo("step5", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 復習動画"
        title="Step 5 別の月で試す"
        subtitle="10 月の明細を入れて、"
        accentWord="合計が合うかを確かめる"
        audience="ハンズオンのあとで、手順を見直したいかたへ"
      />
    ),
  },
  {
    key: "why",
    node: (
      <ColumnsScene
        title="なぜ、別のデータで試すのか"
        kicker="Step 5"
        lead="作ったときのデータで動いても、別のデータで間違うことがある"
        columns={[
          { heading: "作ったとき", emoji: "🛠️", tone: "green", items: ["9 月の明細で作った", "9 月の合計は合っている"] },
          { heading: "これから", emoji: "📅", tone: "accent", highlight: true, items: ["来月も使うつもり", "10 月の明細を入れて試す"] },
        ]}
        note="来月も使うなら、来月のデータで試しておく"
      />
    ),
  },
  {
    key: "steps",
    node: (
      <StepsScene
        title="10 月の明細を入れる手順"
        kicker="Step 5"
        stepDelay={150}
        steps={[
          { label: "ページを読み込み直す" },
          { label: "「ファイルを選ぶ」ボタンで 10 月の CSV を選ぶ", desc: <Strong>カード利用明細_202610.csv</Strong> },
          { label: "合計を見て、Step 1 でメモした数字と比べる" },
        ]}
      />
    ),
  },
  {
    key: "answer",
    node: (
      <TableScene
        title="答え合わせ（10 月分）"
        kicker="Step 5"
        columns={["見るところ", "正しい値"]}
        widths={[1.4, 1.6]}
        rowDelay={150}
        rows={[
          ["合計", <><Strong>18,260 円</Strong>（5 件）</>],
          ["ネット通販", "12,800 円"],
          ["スーパー", "3,250 円"],
          ["カフェ", "1,220 円（640 + 580）"],
          ["動画配信サービス（月額）", "990 円"],
        ]}
        note="まず自分のページの数字を見てから、この表を見る"
      />
    ),
  },
  {
    key: "trap",
    node: (
      <PairScene
        title="10 月だけにある形の行"
        kicker="Step 5"
        lead="2026/10/05,ネット通販,&quot;12,800&quot;"
        leftHead="この行の特徴"
        rightHead="間違えやすい道具"
        rowDelay={170}
        rows={[
          { emoji: "🔢", left: <>金額に桁区切りの<br />カンマが入っている</>, right: <>1 万円を超えると、この形で<br /><Strong>出てくるカード会社がある</Strong></> },
          { emoji: "❝", left: <>金額が引用符で<br />囲まれている</>, right: <>カンマを<Strong>列の区切り</Strong>として<br />読んでしまう道具は、ここで間違える</> },
        ]}
      />
    ),
  },
  {
    key: "judge",
    node: (
      <PairScene
        title="自分のページの表示を見分ける"
        kicker="Step 5"
        leftHead="自分のページの表示"
        rightHead="起きていること"
        rowDelay={330}
        rows={[
          { emoji: "✅", left: "合計 18,260 円", right: <Strong>正しく読めている</Strong> },
          { emoji: "⚠️", left: <>合計 5,472 円<br />ネット通販 12 円</>, right: <>「12,800」を「12」と「800」に<br />分けて読み、<Strong>12 円として足している</Strong></> },
          { emoji: "❌", left: <>合計が「NaN」や空欄<br />エラーが出る</>, right: <>「&quot;12」を数字として読めず、<br /><Strong>計算できなくなっている</Strong></> },
        ]}
      />
    ),
  },
  {
    key: "prompt",
    node: (
      <InfoScene
        title="合わなかった人だけ、こう頼む"
        kicker="Step 5"
        fontSize={38}
        items={[
          <>カード利用明細_202610.csv を選ぶと、合計が［自分のページに出た数字］と表示されます。<br /><Strong>正しくは 18,260 円</Strong>です。</>,
          <>原因を調べて、何が原因だったかを<Strong>日本語で説明してから</Strong>直してください。</>,
          <>直したあと、<Strong>9 月の CSV で合計が 9,440 円のまま</Strong>であることも確かめてください。</>,
        ]}
      />
    ),
  },
  {
    key: "after",
    node: (
      <ColumnsScene
        title="直ったあとに確かめること"
        kicker="Step 5"
        columns={[
          { heading: "直ったら", emoji: "🔁", tone: "accent", items: ["10 月と 9 月の両方を自分で選び直す", "18,260 円と 9,440 円が出る"] },
          { heading: "最初から合っていた人", emoji: "👍", tone: "green", items: ["Claude が先回りして対応していた", "合っていると分かったのは、試したから"] },
        ]}
        note="本物のデータで使う前には、答えが分かっているデータを 2 種類以上入れて試す"
        noteStrong
      />
    ),
  },
  {
    key: "trouble",
    node: (
      <PairScene
        title="うまくいかないとき"
        kicker="Step 5"
        leftHead="起きていること"
        rightHead="直し方"
        rowDelay={470}
        rows={[
          { emoji: "📄", left: <>10 月の CSV を選んでも<br />9 月の表示のまま</>, right: <>ページを読み込み直してから選ぶ。変わらなければ<br />「別の CSV を選び直すと、表示が切り替わるようにしてください」と頼む</> },
          { emoji: "📉", left: <>直してもらったら<br />9 月の合計が変わった</>, right: <>「9 月の CSV で合計が◯◯円になりました。<br />9,440 円と 18,260 円の両方が<br />出るようにしてください」</> },
          { emoji: "🙅", left: "「CSV のほうを直しましょうか」と提案された", right: <><Strong>断る</Strong>。来月の明細も同じ形なので道具を直す。<br />「CSV は変えず、index.html を直してください」</> },
        ]}
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 5 のまとめ"
        lead="別のデータで試すと、道具の間違いが見つかる"
        rows={[
          { emoji: "🔢", label: "10 月分の正しい合計", desc: "18,260 円（5 件）" },
          { emoji: "❝", label: "読み間違いの原因になりやすい形", desc: "金額にカンマと引用符が入った行" },
          { emoji: "💬", label: "合わなかったとき", desc: "正しい数字を伝え、原因の説明と直しを頼む" },
          { emoji: "🔁", label: "直したあと", desc: "9 月も確かめ直す（9,440 円のまま）" },
        ]}
        outroLabel="次は"
        outroText="Step 6：中身を確かめる"
      />
    ),
  },
]);
