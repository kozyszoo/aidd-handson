// Step 1「Code タブでフォルダを開き、中身を説明してもらう」の解説動画（各 Step のハンズオンの前に見る）。語りは narration/step1.md。
import React from "react";
import { makeVideo } from "../lib/makeVideo";
import { InfoScene } from "../scenes/InfoScene";
import { PairScene } from "../scenes/PairScene";
import { StatScene } from "../scenes/StatScene";
import { StepsScene } from "../scenes/StepsScene";
import { SummaryScene } from "../scenes/SummaryScene";
import { TableScene } from "../scenes/TableScene";
import { TitleScene } from "../scenes/TitleScene";
import { T } from "../theme";

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontWeight: 800, color: T.accentDeep }}>{children}</span>
);

export const Video = makeVideo("step1", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 解説動画"
        title="Step 1 フォルダを開く"
        subtitle="Code タブでフォルダを開き、"
        accentWord="中身を説明してもらう"
        audience="手を動かす前に、この Step の流れをつかみたいかたへ"
      />
    ),
  },
  {
    key: "steps",
    node: (
      <StepsScene
        title="手順は 3 つ"
        kicker="Step 1"
        stepDelay={80}
        steps={[
          { label: "Code タブを押す", desc: "Claude Desktop アプリを開き、画面の上にある Code タブを押す" },
          { label: "3 つの設定をする", desc: "入力欄のまわりで設定する（次の画面）" },
          { label: "お願い文を送る", desc: "貼り付けて送る" },
        ]}
        note="最初は読むだけのお願い。ファイルを書き換えないので、元に戻す必要がない"
      />
    ),
  },
  {
    key: "settings",
    node: (
      <TableScene
        title="設定する 3 つ"
        kicker="Step 1"
        columns={["設定するもの", "選ぶもの", "意味"]}
        widths={[1.5, 1.5, 2.3]}
        rowDelay={[20, 200, 420]}
        rows={[
          [<>実行する場所<br />（Environment）</>, <Strong key="a">Local</Strong>, <>自分のパソコンの上で、<br />自分のファイルを直接使って動かす</>],
          ["フォルダ", <><Strong>Select folder</Strong><br />→「売上ビューア」</>, "Claude の作業場所になる"],
          [<>権限モード<br />（送信ボタンの近く）</>, <Strong key="c">Manual</Strong>, <>書き換える前・コマンドを実行する前に、<br />止まって聞く</>],
        ]}
      />
    ),
  },
  {
    key: "prompt",
    node: (
      <InfoScene
        title="Claude に送るお願い文"
        kicker="Step 1"
        fontSize={36}
        items={[
          <>このフォルダにあるファイルを一覧にして、<br />それぞれに何が入っているかを日本語で説明してください。</>,
          <>2 つの CSV は、列の名前・件数・金額の合計も教えてください。</>,
          <>ファイルの変更や新しいファイルの作成は<Strong>しないでください</Strong>。</>,
        ]}
      />
    ),
  },
  {
    key: "check",
    node: (
      <StatScene
        title="返ってきた答えで見るところ"
        kicker="Step 1"
        lead="この 2 つの合計は、あとの答え合わせに使う。メモしておく"
        stats={[
          { label: "9 月分", value: "6 件", sub: "合計 9,440 円" },
          { label: "10 月分", value: "5 件", sub: "合計 18,260 円" },
        ]}
        rows={[{ label: "列の名前", text: <>「<Strong>販売日・商品・金額</Strong>」になっているか</>, tone: "accent" }]}
      />
    ),
  },
  {
    key: "modes",
    node: (
      <TableScene
        title="権限モードは 5 つ"
        kicker="Step 1"
        columns={["名前", "動き方", "ハンズオンでは"]}
        widths={[1.2, 3.2, 1.1]}
        rowDelay={[20, 280, 420, 520, 640]}
        rows={[
          ["Manual", "書き換える前・実行する前に聞く。受け入れる（Accept）か断る（Reject）かを選ぶ。受け入れるまでファイルは変わらない", { chip: "これを使う", tone: "green" }],
          ["Plan", "読んで調べ、進め方の計画を出す。書き換えない", { chip: "Step 2 で使う", tone: "blue" }],
          ["Accept edits", "書き換えと基本のファイル操作は聞かずに進める。ほかのコマンドは聞く", { chip: "慣れてから", tone: "yellow" }],
          ["Auto", "聞かずに進める。依頼に合っているかは別の仕組みが確かめる", { chip: "慣れてから", tone: "yellow" }],
          ["Bypass permissions", "確認なしで進める。隔離された環境の中だけで使うもの", { chip: "使わない", tone: "red" }],
        ]}
        note="古い版：Manual は「Ask permissions」、Plan は「Plan mode」、Accept edits は「Auto accept edits」"
      />
    ),
  },
  {
    key: "local",
    node: (
      <PairScene
        title="Local で使うときの注意 2 つ"
        kicker="Step 1"
        leftHead="気をつけること"
        rightHead="だから"
        rowDelay={420}
        rows={[
          {
            emoji: "💻",
            left: <>自分のパソコンの上で<br />ファイルを直接使って動く。<br />プログラムも動かせる</>,
            right: <>Cowork 編の「切り離された環境で実行する」守りはない。<br /><Strong>フォルダを絞る・Manual で 1 つずつ見る</Strong></>,
          },
          {
            emoji: "📤",
            left: <>Local ＝ 操作が自分のパソコン。<br />内容が外に出ない、ではない</>,
            right: <>読んだ中身は、答えを作るために<br />Anthropic の AI へ送られる。<br /><Strong>作業フォルダには練習用データだけ</Strong>。本物の売上データは Step 6</>,
          },
        ]}
        fontSize={31}
      />
    ),
  },
  {
    key: "trouble1",
    node: (
      <PairScene
        title="うまくいかないとき ①"
        kicker="Step 1"
        leftHead="起きていること"
        rightHead="直し方"
        rowDelay={130}
        fontSize={29}
        rows={[
          { emoji: "💳", left: "Code を押すと、アップグレードを求められる", right: <><Strong>有料プランが必要</Strong>。隣の人と組んで画面を見る</> },
          { emoji: "🔑", left: "Code を押すと、サインインを求められる", right: "案内どおりサインインし、アプリを起動し直す" },
          { emoji: "🚫", left: "「Error 403」などの認証エラー", right: <>メニューからサインアウト→サインイン。直らなければアプリを<Strong>完全に終了</Strong>して開き直す</> },
          { emoji: "🪟", left: "Windows で「Git is required」", right: <>古い版の表示。<Strong>最新版に更新</Strong>。Git は使わない</> },
          { emoji: "⬜", left: "画面が真っ白のまま動かない", right: <>アプリを起動し直す。<br />直らなければ、更新が残っていないか確かめる</> },
        ]}
      />
    ),
  },
  {
    key: "trouble2",
    node: (
      <PairScene
        title="うまくいかないとき ②"
        kicker="Step 1"
        leftHead="起きていること"
        rightHead="直し方"
        rowDelay={140}
        fontSize={29}
        rows={[
          { emoji: "📂", left: "「Failed to load session」", right: <>選んだフォルダを動かした／消した可能性。<Strong>フォルダを選び直す</Strong></> },
          { emoji: "🔒", left: "Local が選べない（灰色）", right: <>会社や学校のパソコンでは、管理者が止めていることがある。<br />使いたいときは管理者に確認する</> },
          { emoji: "🌐", left: "英語で答えが返ってくる", right: <>「これからは日本語で答えてください」と送る</> },
          { emoji: "🔍", left: "Manual が選択肢にない", right: <>古い版。<Strong>「Ask permissions」</Strong>を選ぶ</> },
        ]}
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 1 のまとめ"
        kicker="Step 1"
        lead="設定は 3 つ。最初のお願いは読むだけ"
        rows={[
          { emoji: "⚙️", label: "Local・売上ビューア・Manual", desc: "Code タブで 3 つを設定する" },
          { emoji: "📖", label: "読むだけのお願い", desc: "ファイルの変更・作成はしない" },
          { emoji: "🛡️", label: "Local でも中身は AI へ送られる", desc: "作業フォルダは練習用データだけ" },
          { emoji: "📝", label: "メモする答え", desc: "9 月分 6 件 9,440 円／10 月分 5 件 18,260 円" },
        ]}
        outroLabel="このあと"
        outroText="Step 1 のハンズオン：Code タブでフォルダを開き、中身を説明してもらう"
      />
    ),
  },
]);
