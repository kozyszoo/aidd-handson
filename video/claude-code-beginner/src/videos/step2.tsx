// Step 2「作りたいものを伝えて、先に計画を出してもらう」の解説動画（各 Step のハンズオンの前に見る）。語りは narration/step2.md。
import React from "react";
import { makeVideo } from "../lib/makeVideo";
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

export const Video = makeVideo("step2", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 解説動画"
        title="Step 2 計画を出してもらう"
        subtitle="作りたいものを伝えて、"
        accentWord="先に計画を見る"
        audience="手を動かす前に、この Step の流れをつかみたいかたへ"
      />
    ),
  },
  {
    key: "goal",
    node: (
      <StepsScene
        title="いきなり作らせず、先に計画を見る"
        kicker="Step 2"
        stepDelay={200}
        steps={[
          { label: "権限モードを Plan に切り替える", desc: "進め方を出させてから、実行に移す" },
          { label: "お願いを貼り付けて送る", desc: "入れるもの・出てくるもの・決まりごと・進め方を書く" },
        ]}
        note="公式ドキュメントでも、込み入った作業は Plan で進め方を出させてから実行に移すことが勧められている"
      />
    ),
  },
  {
    key: "request",
    node: (
      <InfoScene
        title="お願い ①：作りたいものと、入れるもの・出てくるもの"
        kicker="Step 2"
        fontSize={38}
        items={[
          <>このフォルダの売上明細（CSV）を読み込んで、<br /><Strong>売れ行きを見られる Web ページ</Strong>を作りたい</>,
          <><Strong>【入れるもの】</Strong>「販売日・商品・金額」の 3 列がある CSV。<br />ページの「ファイルを選ぶ」ボタンで選ぶ</>,
          <><Strong>【出てくるもの】</Strong>合計金額と件数／商品ごとの合計（棒グラフ）／売上の表</>,
        ]}
      />
    ),
  },
  {
    key: "rules",
    node: (
      <InfoScene
        title="お願い ②：決まりごと"
        kicker="Step 2"
        fontSize={42}
        items={[
          <>作るファイルは <Strong>index.html の 1 つだけ</Strong></>,
          <>外のライブラリやフォントは<Strong>使わない</Strong></>,
          <>選んだ CSV の内容を、どこにも<Strong>送らない・保存しない</Strong></>,
          <>来月以降の、同じ形の別の CSV でも使える</>,
          <>フォルダにある CSV は<Strong>書き換えない</Strong></>,
          <>パソコンに何かを<Strong>インストールしない</Strong></>,
        ]}
      />
    ),
  },
  {
    key: "wait",
    node: (
      <InfoScene
        title="お願い ③：進め方"
        kicker="Step 2"
        fontSize={44}
        items={[
          <>まだ<Strong>ファイルは作らない</Strong></>,
          <>作り方の計画と、確認したいことを、<Strong>日本語で先に</Strong>見せてもらう</>,
          <>この一文があるので、計画が返ってくる</>,
        ]}
      />
    ),
  },
  {
    key: "check",
    node: (
      <TableScene
        title="計画を見たら確かめること（3 つ）"
        kicker="Step 2"
        columns={["見るところ", "こうなっていれば OK ／ こう返す"]}
        widths={[1.2, 2]}
        rowDelay={230}
        rows={[
          ["作るファイル", <><Strong>index.html の 1 つだけ</Strong>になっている</>],
          ["インストール・ダウンロード", <>書かれていたら<br /><Strong>「インストールなしで作れる方法にしてください」</Strong>と返す</>],
          ["CSV の読み込み方", <><Strong>ページのボタンでファイルを選ぶ</Strong>形になっている</>],
        ]}
        note="HTML・JavaScript などの言葉が出てくるが、全部を理解する必要はない"
      />
    ),
  },
  {
    key: "ask",
    node: (
      <PairScene
        title="4 つ目：分からないときの返し方"
        kicker="Step 2"
        leftHead="こんなとき"
        rightHead="こう返す"
        rowDelay={260}
        rows={[
          { emoji: "❓", left: "分からない言葉がある", right: <>そのまま聞く<br />「FileReader とは何ですか。高校生に分かる言葉で説明してください」</> },
          { emoji: "💬", left: "Claude から質問が返ってきた", right: <>答える。迷う質問には<br /><Strong>「おすすめの方でお願いします。<br />理由も教えてください」</Strong></> },
        ]}
      />
    ),
  },
  {
    key: "trouble",
    node: (
      <PairScene
        title="うまくいかないとき"
        kicker="Step 2"
        leftHead="起きていること"
        rightHead="直し方"
        rowDelay={330}
        rows={[
          { emoji: "🗺️", left: "Plan が選択肢にない", right: <>古い版では「Plan mode」。<br />無ければ Manual のまま送る</> },
          { emoji: "🛑", left: "計画を出さずにファイルを作ろうとした", right: <>確認画面で <Strong>Reject</Strong>。「先に計画を見せてください」</> },
          { emoji: "📜", left: "計画が長くて読めない", right: <>「計画を 5 行にまとめて。ファイル名とインストールの有無を必ず入れて」</> },
          { emoji: "🗂️", left: "ファイルが 3 つ（HTML・CSS・JS）の計画", right: <>「index.html の 1 つにまとめて」<br />人に渡す・場所を移すとき扱いやすい</> },
        ]}
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 2 のまとめ"
        lead="先に計画を出してもらう流れ"
        rows={[
          { emoji: "🗺️", label: "Plan で送る", desc: "お願いに、決まりごとと「まだ作らない」を書く" },
          { emoji: "🔍", label: "計画で確かめる 3 つ", desc: "ファイル 1 つ／インストール無し／ボタンで選ぶ" },
          { emoji: "❓", label: "分からなければ聞く", desc: "分からない言葉はそのまま聞く" },
        ]}
        outroLabel="このあと"
        outroText="Step 2 のハンズオン：作りたいものを伝えて、先に計画を出してもらう"
      />
    ),
  },
]);
