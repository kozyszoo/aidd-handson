// Step 6「道具の中身を確かめ、使うときの約束を見る」の解説動画（各 Step のハンズオンの前に見る）。語りは narration/step6.md。
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

export const Video = makeVideo("step6", [
  {
    key: "title",
    node: (
      <TitleScene
        tag="Claude Code 入門ハンズオン ― 解説動画"
        title="Step 6 確かめる"
        subtitle="道具の中身を確かめ、"
        accentWord="使うときの約束を見る"
        audience="手を動かす前に、この Step の流れをつかみたいかたへ"
      />
    ),
  },
  {
    key: "goal",
    node: (
      <ColumnsScene
        title="この Step でやること"
        kicker="Step 6"
        lead="本物の明細を入れる前に、送られないかを確かめる"
        columns={[
          { heading: "お願い文で確かめる", emoji: "🤖", tone: "accent", items: ["Claude Code に 3 つ聞く", "ファイルは変更しない"] },
          { heading: "自分でも確かめる", emoji: "📶", tone: "green", items: ["Wi-Fi を切って開く", "家でやる"] },
          { heading: "使うときの約束", emoji: "📋", tone: "blue", items: ["本物の明細で使う手順", "5 つの約束"] },
        ]}
      />
    ),
  },
  {
    key: "prompt",
    node: (
      <TableScene
        title="index.html を読んで、3 つに答えてもらう"
        kicker="Step 6"
        columns={["聞くこと", "中身"]}
        widths={[1.4, 1]}
        rowDelay={[40, 190, 380]}
        note="ファイルは変更しない。「ある」なら、該当する行と何のための処理かも説明してもらう"
        rows={[
          ["1. 選んだ CSV を、外へ送る処理はあるか", "インターネット上のどこかへ送る処理"],
          ["2. 外から読み込む部品はあるか", "ライブラリ・フォント・画像"],
          ["3. パソコンの中に保存する処理はあるか", "このページが何かを保存する処理"],
        ]}
      />
    ),
  },
  {
    key: "answer",
    node: (
      <PairScene
        title="答えの見方"
        kicker="Step 6"
        leftHead="返ってきた答え"
        rightHead="次にすること"
        rowDelay={360}
        rows={[
          { emoji: "✅", left: "3 つとも「ない」", right: <>Step 2 の決まりごとに沿っている。<Strong>確かめる材料の 1 つで、保証ではない</Strong></> },
          { emoji: "⚠️", left: "どれかが「ある」", right: <>「その処理を外してください」と頼む。<br />Step 5 と同じ <Strong>2 つの CSV</Strong> で確かめ直す</> },
        ]}
        note="AI の説明は間違うことがある"
      />
    ),
  },
  {
    key: "wifi",
    node: (
      <PairScene
        title="自分でできる確かめ方（家でやる）"
        kicker="Step 6"
        leftHead="やること"
        rightHead="分かること・分からないこと"
        rowDelay={270}
        rows={[
          { emoji: "📶", left: "Wi-Fi を切って index.html を開き、CSV を選ぶ", right: <>合計とグラフが出れば、<Strong>外の部品が無くても動く</Strong></> },
          { emoji: "🚫", left: "これで分からないこと", right: <>つながっているときに<Strong>何も送らない</Strong>という証明にはならない</> },
          { emoji: "🧑‍💻", left: "会社のデータ・人に渡す道具", right: <>約束 5：<Strong>プログラムが分かる人</Strong>に見てもらう</> },
        ]}
      />
    ),
  },
  {
    key: "steps",
    node: (
      <StepsScene
        title="本物の明細で使うときの手順"
        kicker="Step 6"
        stepDelay={255}
        steps={[
          { label: "index.html を別の場所へコピーする", desc: "作業フォルダとは別（書類フォルダなど）" },
          { label: "コピーをダブルクリックして開く", desc: <>いつものブラウザで開く。<Strong>Claude のアプリの中では開かない</Strong>（Claude が画面を見られるため）</> },
          { label: "「ファイルを選ぶ」で読み込ませる", desc: <>本物の明細を<Strong>作業フォルダへ入れない</Strong></> },
        ]}
      />
    ),
  },
  {
    key: "promises1",
    node: (
      <TableScene
        title="使うときの 5 つの約束（1〜3）"
        kicker="Step 6"
        columns={["約束", "本物のデータで使うときにやること"]}
        widths={[1.1, 2]}
        rowDelay={[40, 300, 580]}
        fontSize={30}
        rows={[
          [<>1. フォルダは、<br />道具ごとに 1 つ</>, <>デスクトップ全体や書類フォルダ全体は選ばない。<br />入れるのは<Strong>練習用のデータだけ</Strong>。読んだ中身は AI へ送られる</>],
          [<>2. Manual で、<br />変更を 1 つずつ見る</>, <>分からない確認は <Strong>Reject</Strong> して理由を聞く。Bypass permissions は使わない</>],
          [<>3. 作る前に、<br />計画と決まりごとを見る</>, <>「インストールしない・外の部品を使わない・送らない」を<br />毎回お願いに書く。または Step 8 の <Strong>CLAUDE.md</Strong></>],
        ]}
      />
    ),
  },
  {
    key: "promises2",
    node: (
      <TableScene
        title="使うときの 5 つの約束（4・5）"
        kicker="Step 6"
        columns={["約束", "本物のデータで使うときにやること"]}
        widths={[1.1, 2]}
        rowDelay={[40, 370]}
        rows={[
          [<>4. 答えが分かっている<br />データで確かめる</>, <>9,440 円と 18,260 円で確かめた。形の違うデータを<Strong>2 種類以上</Strong>入れて試す。<br />直したあとは、前に合っていた数字も見直す</>],
          [<>5. 人に渡す前・仕事で<br />使う前に、確認を取る</>, <>会社や学校のデータは、先に<Strong>組織のルール</Strong>を確認。<br />道具を配る前に、プログラムが分かる人に見てもらう</>],
        ]}
      />
    ),
  },
  {
    key: "web",
    node: (
      <PairScene
        title="ネットで見つけた手順を、そのまま頼まない"
        kicker="Step 6"
        leftHead="起きること"
        rightHead="入れる前にやること"
        rowDelay={270}
        rows={[
          { emoji: "📋", left: "「このコマンドを貼り付けて実行して」「このプラグインを入れて」", right: <>Claude に聞く：<br /><Strong>「これは何をするものですか。入れると何ができるようになりますか」</Strong></> },
          { emoji: "📂", left: "中身の分からないものを入れると、パソコン内のファイルにふれられる", right: <><Strong>提供元が分かるものだけ</Strong>にする</> },
        ]}
      />
    ),
  },
  {
    key: "summary",
    node: (
      <SummaryScene
        title="Step 6 のまとめ"
        lead="使う前に確かめ、約束を守る"
        rows={[
          { emoji: "🤖", label: "お願い文で確かめる", desc: "送る処理・外の部品・保存。保証ではない" },
          { emoji: "📂", label: "本物の明細は別の場所で", desc: "コピーした道具に読み込ませる" },
          { emoji: "📋", label: "5 つの約束", desc: "使う前に、毎回見直す" },
        ]}
        outroLabel="このあと"
        outroText="Step 6 のハンズオン：道具の中身を確かめ、使うときの約束を見る"
      />
    ),
  },
]);
