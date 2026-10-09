# 復習動画の作り方（Step ごと 1 本）

`docs/claude-code-beginner.html` の各 Step を、あとから見返せる 2〜4 分の解説動画にする。
Remotion（映像）＋ VOICEVOX（ナレーション・話者 8 春日部つむぎ）。

## 担当の範囲（他の Step のファイルは触らない）

| Step N の担当が書くもの | 場所 |
|---|---|
| 台本 | `narration/stepN.md` |
| 映像 | `src/videos/stepN.tsx`（`export const Video = makeVideo("stepN", [...])`） |
| 音声・尺（自動生成） | `audio/stepN/`・`public/audio/stepN/`・`src/data/stepN.json` |

触らない: `src/scenes/*`・`src/components/*`・`src/lib/*`・`src/Root.tsx`・`src/theme.ts`・他 Step のファイル。
部品（シーン）に足りないものがあっても、部品は直さず、既存の部品の組み合わせで作る。

## 基準になる実物

- `src/videos/step0.tsx` と `narration/step0.md`（完成済み。構成・書き方の手本）
- 画面と語りのルールの正本: `~/.agents/skills/remotion-report-video/SKILL.md` の「画面の情報量と見た目の決まり」13 項目

## 台本（narration/stepN.md）の書き方

```
## key
<!-- 語り（読み仮名に開いた文章） -->

---
```

- `## key` が音声つきシーンの名前。`stepN.tsx` の `{ key: "..." }` と**同じ名前・同じ順番**にする
- **英字・数字はカナに開く**（`Step 3`→「ステップ三」、`CSV`→「シーエスブイ」、`Claude`→「クロード」、`Local`→「ローカル」、`Manual`→「マニュアル」、`Plan`→「プラン」、`Accept`→「アクセプト」、`Reject`→「リジェクト」）。ファイル名・金額の数字は読み下す（9,440円→九千四百四十円）
- 1 シーン 15〜40 秒（約 100〜250 字）。話し言葉。**高校生が聞いて分かる言葉**。気分や励ましだけの一文（「大丈夫です」「安心してください」など）は入れない
- 内容は HTML の該当 Step の記述が正。**HTML に無い条件や数字を足さない**
- 語りが触れる数字・名前・手順は**全部画面に載せる**。画面にだけある条件を足さない
- 全体の構成の目安: タイトル → この Step でやること → 手順（押す場所・入力するお願い文） → 確認するところ（数字・見た目） → つまずきと直し方 → まとめ（次の Step へ）。**振り返りに使う**動画なので、手順と確認ポイントを省かない
- お願い文（プロンプト）は、HTML の文面を画面に出す。長い文は 2〜3 行に分けて `<br />` で折る

## 映像（stepN.tsx）の書き方

- `makeVideo("stepN", [{ key, node }, { card: true, node }, ...])`。`card` は無音 2 秒の章扉
- 使う部品は `src/scenes/*`（Title・Columns・Steps・Table・Pair・Flow・Stat・TagList・Summary・Timeline・SectionCard）。`step0.tsx` を見て props を確かめる
- kicker に `"Step N"` を入れる。番号バッジ・頭文字の四角は使わない
- 本文 30px 以上。語の途中で折れそうな長い文は `<br />` で切れ目を指定する
- 行・手順が順に出る部品（Steps/Table/Pair）は、`stepDelay`/`rowDelay`（フレーム数）を**語りの進みに合わせる**。語りが 1 項目に使う秒数 × 30 を目安にする（音声を作ってから `src/data/stepN.json` の秒数を見て決める）

## 作業の順番

```bash
cd /Users/kozzy/Desktop/aidd_handson/video/claude-code-beginner
# 1. 台本を書く → 読みを機械で確認（想定外の読みがないか）
python3 scripts/tts_video.py stepN --kana
# 2. 映像を書く。型検査
npx tsc --noEmit
# 3. 音声を作る（VOICEVOX は起動済み）
python3 scripts/tts_video.py stepN            # 直した 1 シーンだけなら --only key
# 4. 静止画で全シーンを見る（Read で画像を開いて、はみ出し・語の途中の折り返し・余白の偏り・要素の衝突を直す）
node scripts/scene-frames.mjs --pairs stepN <Series の並びの key をすべて。card は card1, card2…>
node scripts/stills.mjs StepN <上の出力をそのまま貼る>      # → out/stills/<name>.png（他の担当の画像と名前が重なるので、書き出し後すぐ見る）
# 5. 音声つきで書き出す（音量そろえまで入っている）
node scripts/render.mjs stepN                 # → out/stepN.mp4
```

- 静止画は**全シーン**を見る。`name_end` は長いシーンの終わり近く（全要素が出たあと）
- `out/stills/` は共有なので、名前に `stepN_` を付けて出すとよい（例: `stepN_title:120`）
- 書き出したら `ffprobe -v error -show_entries format=duration -of csv=p=0 out/stepN.mp4` で尺を確かめ、`ffmpeg -i out/stepN.mp4 -af volumedetect -f null - 2>&1 | grep mean_volume` が −25dB より小さくないことを確かめる
- 並行して他の担当がレンダリングしている。同時実行で遅くなっても止まらない。ディスクを使うので、終わったら `out/stepN_raw.mp4` は消してよい
- やらないこと: git commit・push、Drive へのアップロード、HTML の編集（親がやる）

## 完了報告に書くこと

- 作ったファイルのパスと、動画の尺（秒）・シーン数
- 静止画で直した点
- 台本のうち、HTML の記述と食い違いそうな箇所・自信のない箇所（あれば）
- 読み（`--kana`）で直した語
