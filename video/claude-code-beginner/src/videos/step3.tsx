// Step 3「変更を承認してページを作り、開いて合計を確かめる」の解説動画（各 Step のハンズオンの前に見る）。語りは narration/step3.md。
import React from "react";
import { makeVideo } from "../lib/makeVideo";
import { PairScene } from "../scenes/PairScene";
import { StepsScene } from "../scenes/StepsScene";
import { SummaryScene } from "../scenes/SummaryScene";
import { TableScene } from "../scenes/TableScene";
import { TitleScene } from "../scenes/TitleScene";
import { T } from "../theme";

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontWeight: 800, color: T.accentDeep }}>{children}</span>
);

export const Video = makeVideo("step3", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 解説動画"
        title="Step 3 作る"
        subtitle="変更を承認してページを作り、"
        accentWord="合計を確かめる"
        audience="手を動かす前に、この Step の流れをつかみたいかたへ"
      />
    ),
  },
  {
    key: "make",
    node: (
      <StepsScene
        title="作ってもらう"
        kicker="Step 3"
        stepDelay={110}
        steps={[
          { label: "権限モードを Manual に戻す" },
          { label: "「この計画で作ってください」と送る" },
          { label: "確認の画面が出たら、2 か所を読んでから Accept を押す", desc: "読む 2 か所は、次の表のとおり" },
        ]}
      />
    ),
  },
  {
    key: "review",
    node: (
      <TableScene
        title="確認の画面で読むところ"
        kicker="Step 3"
        columns={["読むところ", "こうなっていれば Accept", "こうなっていたら Reject"]}
        widths={[1, 1.6, 1.6]}
        rowDelay={420}
        rows={[
          [
            "どのファイルを変えるか",
            <>「売上ビューア」フォルダの中の<br /><Strong>index.html</Strong> を作る</>,
            <>CSV を書き換えようとしている。<br />フォルダの外の場所が出ている</>,
          ],
          [
            "コマンドを実行しようとしているか",
            <>実行がない。<br />または、何のためかを聞いて<Strong>納得できた</Strong></>,
            <>何かをインストールしようとしている。<br />何のためか分からない</>,
          ],
        ]}
      />
    ),
  },
  {
    key: "reject",
    node: (
      <PairScene
        title="画面の見かたと、Reject したあと"
        kicker="Step 3"
        leftHead="ようす"
        rightHead="やること"
        rowDelay={230}
        rows={[
          { emoji: "🟩", left: <>作るプログラムは<Strong>緑の行</Strong><br />（追加が緑、消されるのが赤）</>, right: "中身は読めなくて構わない" },
          { emoji: "👀", left: "見るのは 2 つだけ", right: <Strong>どのファイルに／何をしようとしているか</Strong> },
          { emoji: "🙅", left: <>Reject を押すと<br />「ではどう進めますか」と聞かれる</>, right: <>「なぜそれが必要ですか。<br />使わない方法はありますか」と聞く</> },
        ]}
      />
    ),
  },
  {
    key: "open",
    node: (
      <StepsScene
        title="できたページを開く"
        kicker="Step 3"
        stepDelay={240}
        steps={[
          { label: "返事の中の index.html の文字を押す", desc: "アプリの中のブラウザ（Browser pane）で開く" },
          { label: "「ファイルを選ぶ」で売上明細_202609.csv を選ぶ" },
          { label: "合計・グラフ・表が出ることを確かめる" },
        ]}
        note="開けないとき：index.html を右クリック → Show in Finder（Mac）／Show in Explorer（Windows）→ ダブルクリック"
      />
    ),
  },
  {
    key: "answer",
    node: (
      <TableScene
        title="答え合わせ（9 月分）"
        kicker="Step 3"
        columns={["見るところ", "正しい値"]}
        widths={[1.3, 1.7]}
        rowDelay={[0, 180, 360, 450, 600]}
        rows={[
          ["合計", <><Strong>9,440 円</Strong>（6 件）</>],
          ["ギフトセット", <>5,600 円（2,480 + 3,120）</>],
          ["焼き菓子セット", "1,650 円"],
          ["ブレンドコーヒー", <>1,200 円（580 + 620）</>],
          ["豆の定期便（月額）", "990 円"],
        ]}
      />
    ),
  },
  {
    key: "check",
    node: (
      <StepsScene
        title="数字を自分で確かめる"
        kicker="Step 3"
        stepDelay={250}
        steps={[
          { label: "合計が Step 1 でメモした 9,440 円と同じか" },
          { label: "「ギフトセット」と「ブレンドコーヒー」が 2 件ずつ 1 つにまとまっているか", desc: "4 行ではなく 6 行のグラフなら、まとめる処理が入っていない" },
          { label: "「商品」が日本語のまま読めるか", desc: "文字化けしていないか" },
        ]}
      />
    ),
  },
  {
    key: "retry",
    node: (
      <PairScene
        title="うまく動かないときの伝え方"
        kicker="Step 3"
        lead="起きたことをそのまま伝える。原因は自分で考えない"
        leftHead="書く 3 つ"
        rightHead="お願い文の例"
        rowDelay={200}
        rows={[
          { emoji: "📝", left: "何をしたか", right: <>index.html を開いて、<br />売上明細_202609.csv を選びました。</> },
          { emoji: "⚠️", left: "何が起きたか", right: "［起きたこと］（例：何も表示されない）" },
          { emoji: "🎯", left: "どうなってほしいか", right: <>合計 9,440 円と、商品ごとの合計が出るようにしてください。<br />原因を調べて直してください。</> },
        ]}
        note="画面の写真（スクリーンショット）を入力欄に貼り付けて、一緒に送ることもできる"
      />
    ),
  },
  {
    key: "trouble",
    node: (
      <PairScene
        title="うまくいかないとき"
        kicker="Step 3"
        leftHead="起きていること"
        rightHead="直し方"
        rowDelay={200}
        fontSize={28}
        rows={[
          { emoji: "🔁", left: "確認の画面が何度も出る", right: <>Manual の正しい動き。<br />1 回ごとに<Strong>どのファイルに何をするか</Strong>読んで押す</> },
          { emoji: "⏸️", left: "止まったまま動かない", right: <>確認待ちのことがある。<br /><Strong>Accept・Reject のボタン</Strong>が出ていないか見る</> },
          { emoji: "🛑", left: "頼んでいないことを始めた", right: <>先に<Strong>停止ボタン</Strong>で止め、理由を聞く。<br />「index.html を作るだけにしてください」と返す</> },
          { emoji: "🖥️", left: "「サーバーを起動する」とコマンド実行を求められた", right: <>Reject して<br />「サーバーは使わず、index.html を<br />そのまま開いて動く形にしてください」</> },
          { emoji: "🌐", left: "アプリ内のブラウザでファイルを選んでも反応がない", right: "いつものブラウザで開いて試す" },
        ]}
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 3 のまとめ"
        lead="承認して作り、開いて数字で確かめる"
        rows={[
          { emoji: "✅", label: "確認の画面", desc: "どのファイルに・何をするか" },
          { emoji: "🌐", label: "ページを開く", desc: "index.html の文字を押して開く" },
          { emoji: "🔢", label: "9 月分の確認", desc: "合計 9,440 円・まとまり方・文字" },
        ]}
        outroLabel="このあと"
        outroText="Step 3 のハンズオン：変更を承認してページを作り、開いて合計を確かめる"
        note="使用量の上限に達したときは、講師に声をかける"
      />
    ),
  },
]);
