# 🚀 Antigravity ハンズオン

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Google が提供する自律型 AI コーディングエージェント「**Antigravity**」と、ターミナルで動作する「**Antigravity CLI**」の基礎から実践的な活用方法までを、1.5〜2時間程度で習得するためのハンズオン資料です。

## 📚 目次

- [概要](#概要)
- [クイックスタート](#クイックスタート)
- [ハンズオン構成](#ハンズオン構成)
- [前提条件](#前提条件)
- [セットアップ](#セットアップ)
- [使い方](#使い方)
- [トラブルシューティング](#トラブルシューティング)
- [貢献](#貢献)
- [ライセンス](#ライセンス)

## 🎯 概要

**Antigravity** は、2026年5月の Google I/O 2026 で発表された、自律的な並列マルチエージェントを制御する独立したスタンドアロン型デスクトップアプリケーションです。高度な AI ソフトウェアエンジニアリングエージェントとして、ローカル環境やクラウド環境と連携して自律的にコーディングタスクを実行します。

### 2つのインターフェース

- 🌐 **Antigravity（デスクトップアプリ版）**: 自律的な並列エージェント（Dynamic Subagents）を視覚的に管理・制御できるメインインターフェース。
- 💻 **Antigravity CLI**: ターミナルで動作するオープンソースのコーディングエージェント。ローカル環境でファイルを高速に読み書きし、対話的にコード生成・修正を実行。

### 主な特徴

- 🤖 **自律的タスク実行**: `Planning Mode` により実装計画書（`implementation_plan.md`）を自動作成し、実行前に人間が確認・軌道修正可能。
- ⚡ **Dynamic Subagents（動的サブエージェント）**: 複雑なタスクを複数の専門子エージェントに自律的に分割・並列実行させ、開発効率を最大化。
- 📁 **New Worktree Mode**: ローカルファイルを汚さずに安全な隔離環境（Git Worktree）で自律実行・自動検証。
- 📋 **スラッシュコマンド連携**: `/schedule`（定時実行・タイマー）や `/goal`（徹底自律実行）などの高度なタスク管理コマンドに対応。
- 🎨 **Nano Banana 2**: 高品質なアセット生成・UI/UXデザインを自律的に構築するビジュアルデザイン特化モデルを内蔵。

### 学習目標

このハンズオンを通じて、以下のスキルを習得できます:

- ✅ Antigravity デスクトップアプリの基本操作と Agent Manager の活用
- ✅ Antigravity CLI のインストールと活用
- ✅ Planning モード / Fast モードの使い分けと意思決定
- ✅ 自然言語による高度なコード生成（Vibe Coding）
- ✅ Dynamic Subagents による並列タスクの設計とデバッグ

## ⚡ クイックスタート

```bash
# 1. リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/aidd-handson.git
cd aidd-handson

# 2. ハンズオン資料を開く
open docs/index.html

# 3. ハンズオンを開始
# docs/index.html から順番に進めてください
```

## 📂 リポジトリ構成

```
aidd-handson/
├── docs/                      # ドキュメント・プレゼンテーション資料
│   ├── index.html            # ハンズオンWebページ
│   ├── live-coding-script.md # ライブコーディング台本
│   └── img/                  # 画像・図表
│       ├── fig1.png
│       ├── fig2.png
│       ├── slide-*.png       # スライド画像
│       └── ...
├── LICENSE
└── README.md
```

## 📚 コンテンツ構成

### 🕐 当日のタイムライン

| 時間 | セクション | 内容 |
|:---|:---|:---|
| 19:00〜19:15 | **イントロ** | Vibe Codingとは？AI コーディングエージェントの進化 |
| 19:15〜19:30 | **Antigravity の特徴** | アプリ版 / CLI / Dynamic Subagents / Worktree Mode |
| 19:30〜20:00 | **Step 1** | 環境構築 + Antigravity CLI セットアップ（30分） |
| 20:00〜20:20 | **Step 2** | Vibe Coding 基礎編（自己紹介ページ作成） |
| 20:20〜20:40 | **Step 3** | Agent Manager で並列実行 + PR 自動作成 |
| 20:40〜21:00 | **Step 4** | Vibe Coding 発展編（AI Coffee Shop LP） |
| 21:00〜21:10 | **Step 5** | まとめ：AI-DLCとハッカソン戦略（料金プラン・最新機能） |

### 🎯 学習フロー

```
【Step 1】基礎の確立（19:30〜20:00）
  Antigravity CLI インストール → 基本操作を体験
      ↓
【Step 2】Vibe Coding を最速体験（20:00〜20:20）
  Antigravity CLI で自己紹介ページ作成
      ↓
【Step 3】Agent Manager で並列実行（20:20〜20:40）
  Dynamic Subagents / New Worktree Mode の活用
      ↓
【Step 4】総合演習（20:40〜21:00）
  AI Coffee Shop LP（リサーチ→実装→デプロイ準備）
      ↓
【Step 5】実践知識（21:00〜21:10）
  AI-DLC × ハッカソン最強戦略
```

## 🔧 前提条件

### 必須

- **Google アカウント**: Antigravity へのログインに必要
- **GitHub アカウント**: リポジトリとの連携に必要
- **Node.js**: v22 以上（Antigravity CLI のインストールに必要）
- **インターネット接続**: Google Gemini API との通信に必要

### 推奨

- **Git**: バージョン管理
- **VS Code / Cursor**: コード編集（Antigravity CLI と併用する場合）
- **Google API キー / Google Cloud アカウント**: CLI で使用

## 🛠️ セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/YOUR_USERNAME/aidd-handson.git
cd aidd-handson
```

### 2. Antigravity CLI のインストール

```bash
# npm でグローバルインストール
npm install -g @google/antigravity

# インストール確認
antigravity --version
```

### 3. API キーの設定

```bash
# 環境変数に API キーを設定
export GEMINI_API_KEY="AIzaSy..."
```

### 4. Antigravity デスクトップアプリの利用開始

1. [Antigravity](https://antigravity.google) にアクセスしてアプリをダウンロード・インストール
2. アプリを起動し、Google アカウントでログイン
3. 対象プロジェクトディレクトリを開き、`Local Mode` または `New Worktree Mode` を選択してタスクを開始

## 📖 使い方

### ハンズオンの進め方

1. **Webページを開く**: `docs/index.html` をブラウザで開く
2. **順番に進める**: Step 1から順番に進めることを推奨
3. **実際に手を動かす**: コードを書いて、動かして、理解を深める
4. **質問・疑問をメモ**: 後で調べたり、コミュニティで質問

### Antigravity CLI の基本操作

```bash
# 対話モードで起動
antigravity

# 直接指示を渡す
antigravity "このプロジェクトの構造を説明して"

# ファイルを指定して修正
antigravity "index.html にナビゲーションバーを追加して"
```

## 🎓 学習リソース

### 公式ドキュメント

- [Antigravity 公式ページ](https://antigravity.google)
- [Antigravity API ドキュメント](https://ai.google.dev/gemini-api)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
- [Agent Skills](https://agentskills.io)

## 🐛 トラブルシューティング

### よくある問題

#### 1. Antigravity CLI がインストールできない

**症状**: `npm install -g @google/antigravity` でエラー

**解決策**:
```bash
# Node.js のバージョンを確認（v22以上が必要）
node --version

# npm キャッシュをクリア
npm cache clean --force

# 再インストール
npm install -g @google/antigravity
```

#### 2. API キーが認識されない

**症状**: `Error: Missing API key` が表示される

**解決策**:
```bash
# 環境変数が正しく設定されているか確認
echo $GEMINI_API_KEY

# .bashrc や .zshrc に永続化
echo 'export GEMINI_API_KEY="AIzaSy..."' >> ~/.zshrc
source ~/.zshrc
```

## 🤝 貢献

このハンズオン資料への貢献を歓迎します！

### 貢献方法

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。
