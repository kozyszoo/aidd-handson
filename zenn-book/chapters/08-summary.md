---
title: "まとめと次のステップ"
---

## ハンズオンで学んだこと

全6ステップを通じて、以下の内容を体験しました。

| ステップ | 学んだこと |
|:---:|:---|
| 1 | Antigravity CLI の基本操作、2つの View、モデル選択 |
| 2 | GEMINI.md によるプロジェクトルールの定義、Workflows |
| 3 | 自然言語での HTML 生成、DALL-E による画像生成 |
| 4 | MCP による外部ツール接続、Web リサーチの自動化 |
| 5 | Agent Skills の作成と呼び出し、Rules / Workflows との使い分け |
| 6 | MCP + Skills を組み合わせた本格的な Vibe Coding |

## Antigravity CLI の全体像

ここまでの内容を振り返ると、Antigravity が提供する仕組みは大きく3層に分かれます。

**基盤**: Editor View と Agent Manager の Dual View、マルチモデル対応
**カスタマイズ**: Rules（GEMINI.md）、Workflows、Agent Skills
**拡張**: MCP による外部ツール接続

<!--
  [図12: Antigravity CLI の3層構造図]
  【図形生成プロンプト】
  Antigravity CLI の機能を3層のピラミッド（または同心円）で表現した構造図。

  ピラミッド形式（下から上へ）:
    最下層（基盤 / 最も広い面積 / 淡グレー）:
      - ラベル: 「基盤」
      - 要素: Editor View / Agent Manager / マルチモデル対応
      - 各要素にアイコンを付ける

    中層（カスタマイズ / 中くらいの面積 / 淡青）:
      - ラベル: 「カスタマイズ」
      - 要素: Rules（GEMINI.md）/ Workflows / Agent Skills
      - 各要素にアイコンを付ける

    最上層（拡張 / 最も狭い面積 / 淡緑 #4ecca3）:
      - ラベル: 「拡張」
      - 要素: MCP（外部ツール接続）
      - アイコンを付ける

  右側に矢印で「上に行くほど拡張性が高まる」ことを示す補足テキストを配置。
  背景: 白 (#ffffff)、アクセントカラー: #4ecca3。サイズ: 800×500px。
-->

これらを組み合わせることで「何を作りたいか」を自然言語で伝えるだけで、リサーチから実装、レビュー、デプロイ準備まで一貫して進められるようになります。

## 料金プラン

| プラン | 料金 | 主な内容 |
|:---:|:---:|:---|
| Free | 無料 | Gemini 3.5 Flash（制限あり）、DALL-E（月50枚）、ローカル MCP |
| Pro | $19/月 | Gemini 3.5 Flash（優先）、GPT-4.1、DALL-E（無制限）、クラウド MCP |
| Enterprise | 要相談 | チーム共有 Artifacts、Enterprise セキュリティ、カスタムモデル |

Free プランでも十分に活用できます。

## 次のステップ

### 自分のプロジェクトで使ってみる

まずは既存のプロジェクトに GEMINI.md を置いてみてください。応答言語とコーディング規約を指定するだけでも、エージェントの振る舞いが変わります。

### カスタム Skills を増やす

よく繰り返すタスクがあれば、それを SKILL.md に落とし込んでみましょう。コードレビュー、テスト生成、ドキュメント作成など、自分のワークフローに合った Skills を作ると開発がさらに加速します。

### MCP を拡張する

Slack、GitHub、Jira など、普段使っているツールに MCP で接続すると、エージェントの活動範囲がさらに広がります。

## 参考リンク

- [Antigravity 公式サイト](https://openai.com)
- [公式ドキュメント](https://openai.com/index/introducing-antigravity/)
- [MCP ドキュメント](https://modelcontextprotocol.io)
- [Skills ドキュメント](https://github.com/openai/antigravity)
- [MCP プロトコル仕様](https://modelcontextprotocol.io/)
- [Agent Skills 標準](https://agentskills.io)

## ハンズオン用リポジトリ

本書のソースコードとハンズオン資料はGitHubで公開しています。

```bash
git clone https://github.com/YOUR_USERNAME/aidd-handson.git
```

Issue やプルリクエストも歓迎です。

---

## おわりに

本日はご参加いただきありがとうございました！

Antigravity CLI を使った AI 駆動開発の可能性を少しでも感じてもらえたなら嬉しいです。今後もイベントや学習コンテンツを通じて、一緒に「Vibe Coding」の世界を探求しましょう。

### 🎪 今後のイベント

#### 🛠️ AIDD もくもく会

「AI 駆動開発（AIDD）」をテーマに、各自が持ち寄った課題を AI と共に解決するもくもく会。プロンプトや知見をみんなで共有します。

- **開催日時**: 日程調整中
- **形式**: オンライン（Discord / Zoom）

#### 📚 AI 活用勉強会・登壇

社内外の技術勉強会や登壇情報を随時発信中。気になる方は X をフォローしてください！

- **開催頻度**: 随時開催
- **フォロー**: [@kozzy0919](https://x.com/kozzy0919)

### 📗 書籍のご紹介

**開発系エンジニアのためのGit/GitHub絵とき入門**

- **著者**: 山岡 滉治（やまおか こうじ）
- **出版**: 秀和システム
- **発売**: 2025年3月

Git/GitHub の仕組みを「絵解き」でわかりやすく解説した入門書。チーム開発のフロー・ブランチ戦略・PR レビューまでカバーしています。エンジニア初心者から中級者まで必読！

**購入リンク**:
- [Amazon で詳細を見る](https://amzn.to/4ld2hGf)
- [X で著者をフォロー @kozzy0919](https://x.com/kozzy0919)

※上記リンクはAmazonアソシエイトリンクです。

### 🔗 学習リソース

- **公式ドキュメント**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **Qiita / Zenn**: #Antigravity タグで記事を検索
- **YouTube**: [公式チャンネル](https://youtube.com/@OpenAI)
- **Discord**: Antigravity Developers Community

---

それでは、Happy Vibe Coding! 🚀
