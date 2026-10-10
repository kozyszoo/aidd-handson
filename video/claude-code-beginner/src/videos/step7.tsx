// Step 7「自分の作業から 1 つ選んで、道具の頼み方を書く」の解説動画（Step 8 の紹介を最後に 1 シーン）。語りは narration/step7.md。
import React from "react";
import { makeVideo } from "../lib/makeVideo";
import { ColumnsScene } from "../scenes/ColumnsScene";
import { PairScene } from "../scenes/PairScene";
import { StepsScene } from "../scenes/StepsScene";
import { SummaryScene } from "../scenes/SummaryScene";
import { TableScene } from "../scenes/TableScene";
import { TagListScene } from "../scenes/TagListScene";
import { TitleScene } from "../scenes/TitleScene";
import { T } from "../theme";

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontWeight: 800, color: T.accentDeep }}>{children}</span>
);

export const Video = makeVideo("step7", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 解説動画"
        title="Step 7 自分の道具を考える"
        subtitle="自分の作業から 1 つ選んで、"
        accentWord="頼み方を書く"
        audience="手を動かす前に、この Step の流れをつかみたいかたへ"
      />
    ),
  },
  {
    key: "goal",
    node: (
      <StepsScene
        title="この Step でやること"
        kicker="Step 7"
        stepDelay={140}
        steps={[
          { label: "道具にするかを分ける（2 分）", desc: "Cowork に頼むか、Claude Code で道具を作るか" },
          { label: "頼み方を 5 つの項目で書く（5 分）", desc: "Step 2 のお願いと同じ形" },
          { label: "フォルダとデータを決める（1 分）", desc: "道具 1 つにつきフォルダ 1 つ" },
        ]}
        note="本物のデータはまだ使わない。書くところまでがこの Step"
      />
    ),
  },
  {
    key: "split",
    node: (
      <TableScene
        title="Cowork に頼むか、道具を作るか"
        kicker="Step 7"
        columns={["作業の性質", "向いているもの", "例"]}
        widths={[1.5, 1.1, 1.7]}
        rowDelay={210}
        rows={[
          [<>1 回きり。または、<br />毎回ファイルの形や判断が違う</>, <Strong>Cowork に頼む</Strong>, <>散らかったフォルダの整理、<br />ばらばらの書類から期限を拾う</>],
          [<>毎週・毎月、同じ形のデータに<br />同じ処理をする</>, <Strong>Claude Code で道具を作る</Strong>, <>毎月の明細の集計、<br />毎週のアンケート結果の集計</>],
          [<>データは使わず、<br />決まった計算や表示をしたい</>, <Strong>Claude Code で道具を作る</Strong>, <>見積の計算、当番表の表示、<br />発表の時間を測るタイマー</>],
        ]}
      />
    ),
  },
  {
    key: "five",
    node: (
      <TagListScene
        title="頼み方は 5 つの項目で書く"
        kicker="Step 7"
        itemDelay={170}
        items={[
          { tag: "入れるもの", title: "どんなデータを入れるか", desc: "例：アンケートの回答 CSV。列は「回答日・満足度（1〜5）・自由記述」" },
          { tag: "出てくるもの", title: "画面に何が出るか", desc: "例：回答の件数、満足度ごとの人数、平均、自由記述の一覧" },
          { tag: "決まりごと", title: "守ってほしい条件", desc: <>index.html 1 つだけ／ネット上の部品は使わない／<br />送らない・保存しない／元データは書き換えない／インストールしない</> },
          { tag: "確かめ方", title: "正しい答えを何で確かめるか", desc: "例：件数 42・平均 3.9 になるはず" },
          { tag: "進め方", title: "まだファイルは作らない", desc: "計画と確認したいことを、先に見せてもらう" },
        ]}
        note="いちばん上に「［作りたいもの］を作りたいです。」と 1 行書く。［ ］の中を自分の作業に書き換える"
      />
    ),
  },
  {
    key: "check",
    node: (
      <PairScene
        title="【確かめ方】が書けるか"
        kicker="Step 7"
        lead="書けるかどうかが、道具にしてよいかの目安"
        leftHead="状況"
        rightHead="どうする"
        rowDelay={270}
        rows={[
          { emoji: "✅", left: <>例：先週の回答 CSV では<br /><Strong>件数 42・平均 3.9</Strong> になるはず</>, right: "道具にしてよい" },
          { emoji: "⚠️", left: "正しい答えを自分で出せない", right: "道具が間違っていても気づけない" },
          { emoji: "🧮", left: "出せない作業を道具にしたい", right: <>手で計算できる<Strong>小さなデータ（5〜10 行）</Strong>を<br />先に作り、それを答えにする</> },
        ]}
      />
    ),
  },
  {
    key: "folder",
    node: (
      <TableScene
        title="フォルダとデータを決める"
        kicker="Step 7"
        columns={["決めること", "書き方"]}
        widths={[1, 2.4]}
        rowDelay={190}
        rows={[
          ["フォルダ", <>新しく作るフォルダの名前。<Strong>道具 1 つにつきフォルダ 1 つ</Strong></>],
          ["最初に入れるデータ", <>本物ではなく、形だけ同じにした練習用。名前や金額を<Strong>架空に置き換えた 5〜10 行</Strong>で足りる</>],
          ["本物のデータを入れてよいか", "個人のデータなら自分で決める。会社や学校のデータなら、組織のルールを確認してから"],
        ]}
      />
    ),
  },
  {
    key: "trouble",
    node: (
      <PairScene
        title="うまくいかないとき"
        kicker="Step 7"
        leftHead="起きていること"
        rightHead="直し方"
        rowDelay={200}
        rows={[
          { emoji: "💭", left: "道具にする作業が思いつかない", right: <>先月も今月もやった、<Strong>Excel での同じ集計</Strong>を思い出す。<br />無ければ、データを使わない道具から選ぶ</> },
          { emoji: "🔤", left: "本物の CSV を入れたら、日本語が読めない記号になった", right: <>文字の保存形式が違う。練習用は UTF-8、<br />カード会社や銀行は Shift_JIS のことがある。<br />練習用の CSV を入れた状態で、<br /><Strong>「Shift_JIS の CSV も<br />読めるようにしてください」</Strong>と頼む</> },
          { emoji: "📑", left: "入れるデータの形が分からない", right: <>いつも使っているファイルの<br /><Strong>1 行目（列の名前）</Strong>をそのまま書き写す</> },
          { emoji: "✉️", left: "やりたいことが、メールを送るなど外に出る操作", right: <>最初の 1 つには向かない。<br /><Strong>下書きを画面に出す</Strong>までを道具に</> },
        ]}
      />
    ),
  },
  {
    key: "more",
    node: (
      <ColumnsScene
        title="Step 8：もっと便利にする機能（紹介のみ）"
        kicker="Step 8"
        lead="手は動かさない。使える条件は、プランや組織の設定で変わる"
        columns={[
          { heading: "ルールと確認", emoji: "📝", tone: "accent", items: ["CLAUDE.md", "差分の画面", "ファイルや画像の添付"] },
          { heading: "動かし方", emoji: "☁️", tone: "green", items: ["使用量の表示", <>Cloud で動かす<br />（アプリを閉じても続く）</>, "スケジュールタスク"] },
          { heading: "つなぐ・広げる", emoji: "🔌", tone: "blue", items: ["コネクタ・プラグイン", "ターミナル版"] },
        ]}
        note="2026-10-04 時点の公式ドキュメント。試す前に公式ドキュメントで確認する"
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 7 のまとめ"
        lead="この Step で決めること"
        rows={[
          { emoji: "🔀", label: "分ける", desc: "同じ形の作業は道具、1 回きりは Cowork" },
          { emoji: "✍️", label: "頼み方の 5 項目", desc: "入れるもの・出てくるもの・決\u2060ま\u2060り\u2060ご\u2060と・確\u2060か\u2060め\u2060方・進め方" },
          { emoji: "📁", label: "フォルダとデータ", desc: "道具ごとに 1 つ。最初のデータは練習用" },
        ]}
        outroLabel="確かめ方が書けるか"
        outroText="書けるなら、道具にしてよい"
      />
    ),
  },
]);
