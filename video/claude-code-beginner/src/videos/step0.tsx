// Step 0「アプリと練習用フォルダを用意する」の解説動画（各 Step のハンズオンの前に見る）。語りは narration/step0.md。
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

export const Video = makeVideo("step0", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 解説動画"
        title="Step 0 準備する"
        subtitle="アプリと練習用フォルダを、"
        accentWord="用意する"
        audience="手を動かす前に、この Step の流れをつかみたいかたへ"
      />
    ),
  },
  {
    key: "goal",
    node: (
      <ColumnsScene
        title="この Step で用意するもの"
        kicker="Step 0"
        lead="3つそろえば、Step 1 に進める"
        columns={[
          { heading: "有料プラン", emoji: "💳", tone: "accent", items: ["Claude の Pro・Max など", "無料プランは Code タブ不可"] },
          { heading: "デスクトップアプリ", emoji: "🖥️", tone: "green", items: ["Claude Desktop", "ログイン済み・最新版"] },
          { heading: "練習用フォルダ", emoji: "📁", tone: "blue", items: ["売上ビューア", "売上明細の CSV が 2 つ"] },
        ]}
        note="Node.js もターミナルも要らない。ほかのソフトを入れる手順はない"
      />
    ),
  },
  {
    key: "needs",
    node: (
      <TableScene
        title="必要なものと、確認のしかた"
        kicker="Step 0"
        columns={["必要なもの", "確認のしかた"]}
        widths={[1, 2.2]}
        rowDelay={140}
        rows={[
          ["Claude の有料プラン", <>Pro・Max・Team・Enterprise のどれか。<Strong>無料プランでは Code タブは使えない</Strong></>],
          ["Claude Desktop アプリ", <>macOS か Windows。公式サイトから入れてログイン。<Strong>入っている人は最新版に更新</Strong></>],
          ["インターネット接続", "作業中はずっとつながっている"],
          ["練習用フォルダ", "配布された zip をダウンロードする"],
        ]}
      />
    ),
  },
  {
    key: "folder",
    node: (
      <StepsScene
        title="練習用フォルダを用意する"
        kicker="Step 0"
        stepDelay={140}
        steps={[
          { label: "zip を展開する", desc: <>「売上ビューア」フォルダを取り出す</> },
          { label: "分かる場所に置く", desc: "デスクトップなど、すぐ見つかる場所" },
          { label: "中の 2 ファイルを確かめる", desc: <>売上明細_202609.csv ＝ 9 月分・6 件（<Strong>Step 3</Strong>）<br />売上明細_202610.csv ＝ 10 月分・5 件（<Strong>Step 5</Strong>）</> },
        ]}
        note="CSV ＝ 表の中身をカンマ区切りの文字で保存したファイル。中身はすべて架空"
      />
    ),
  },
  {
    key: "why",
    node: (
      <PairScene
        title="作業フォルダは、道具ごとに 1 つ"
        kicker="Step 0"
        lead="選んだフォルダが、Claude の作業場所になる"
        leftHead="選ばないフォルダ"
        rightHead="選ぶフォルダ"
        rowDelay={120}
        rows={[
          { emoji: "🖥️", left: "デスクトップ全体", right: <>作る道具ごとに<Strong>専用フォルダ 1 つ</Strong></> },
          { emoji: "📚", left: "書類フォルダ全体", right: <>要る<Strong>データだけコピー</Strong>して入れる</> },
        ]}
        note="Claude はフォルダの中のファイルを読み、新しいファイルを作り、書き換える"
      />
    ),
  },
  {
    key: "trouble",
    node: (
      <PairScene
        title="うまくいかないとき"
        kicker="Step 0"
        leftHead="起きていること"
        rightHead="直し方"
        rowDelay={300}
        rows={[
          { emoji: "🗜️", left: <>zip を開いたのに<br />フォルダを選べない（Windows）</>, right: <>右クリックして<Strong>「すべて展開」</Strong></> },
          { emoji: "❓", left: "アプリの版が分からない", right: <>macOS：Claude → About Claude<br />Windows：Help → About</> },
          { emoji: "📊", left: "CSV が Excel で開いた", right: <>問題なし。<Strong>保存せずに</Strong>閉じる</> },
        ]}
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 0 のまとめ"
        lead="準備するのは、この3つ"
        rows={[
          { emoji: "💳", label: "有料プラン", desc: "Pro・Max・Team・Enterprise" },
          { emoji: "🖥️", label: "デスクトップアプリ", desc: "ログイン済み・最新版" },
          { emoji: "📁", label: "売上ビューア", desc: "作業フォルダは道具ごとに 1 つ。要るデータだけ入れる" },
        ]}
        outroLabel="このあと"
        outroText="Step 0 のハンズオン：アプリと練習用フォルダを用意する"
      />
    ),
  },
]);
