# Sauna Station

サウナ施設の検索・予約システム

## 📋 目次

- [技術スタック](#技術スタック)
- [プロジェクト構成](#プロジェクト構成)
- [環境構築](#環境構築)
- [開発ルール](#開発ルール)
- [API 仕様](#api仕様)
- [デプロイ](#デプロイ)

## 🚀 技術スタック

### Backend (API)

- **Ruby**: 3.3.9
- **Rails**: 7.2.x (API モード)
- **Database**: MySQL 8.0
- **Web Server**: Puma 6.x
- **コンテナ**: Docker & Docker Compose

### Frontend

- **React**: 19.x
- **TypeScript**: 5.8.x
- **Build Tool**: Vite 7.x
- **Development Server**: Vite Dev Server
- **Linting**: ESLint

### Infrastructure

- **Docker**: コンテナ化
- **Docker Compose**: オーケストレーション

## 📁 プロジェクト構成

```
sauna-station/
├── api/                        # Rails API
│   ├── app/
│   │   ├── controllers/
│   │   │   └── api/
│   │   │       └── v1/         # API v1エンドポイント
│   │   ├── models/             # データモデル
│   │   ├── services/           # ドメインロジック（Confirm/Login など）
│   │   ├── mailers/            # メール送信
│   │   ├── views/              # メールテンプレート
│   │   └── jobs/               # 非同期処理
│   ├── config/                # Rails設定
│   ├── db/                    # データベース関連
│   └── spec/                  # テスト
│       ├── factories/         # テストデータ
│       ├── services/          # サービスレイヤーテスト
│       ├── mailers/           # メールテスト
│       └── requests/          # APIテスト（今後）
│
├── frontend/                  # React Frontend
│   ├── public/                # 静的ファイル
│   └── src/
│       ├── api/               # APIクライアント
│       ├── components/        # Reactコンポーネント
│       │   ├── ui/            # 汎用UIコンポーネント
│       │   ├── layout/        # レイアウト系
│       │   └── domain/        # ドメイン固有
│       ├── hooks/             # カスタムフック
│       ├── pages/             # ページコンポーネント
│       ├── store/             # 状態管理
│       ├── styles/            # スタイル定義
│       ├── types/             # TypeScript型定義
│       └── utils/             # ヘルパー関数
│
├── docker-compose.yml         # Docker Compose設定
└── README.md                  # このファイル
```

## 🛠 環境構築

### 前提条件

#### Mac/Linux

- Docker Desktop
- Git

#### Windows

- Docker Desktop for Windows
- Git for Windows
- WSL2 (推奨)

### 初回セットアップ

1. **リポジトリのクローン**

```bash
git clone <repository-url>
cd sauna-station
```

2. **環境変数の設定**

```bash
# Mac/Linux/Git Bash
cp .env.example .env

# Windows PowerShell
copy .env.example .env

# 開発環境では基本的にデフォルト値のままでOK
```

3. **コンテナのビルド・起動**

```bash
docker compose up -d --build
```

4. **アクセス確認**

- Frontend: http://localhost:5173
- API: http://localhost:3000
- API(開発用メール配信確認): http://localhost:3000/letter_opener/
- Database: localhost:3306

### 日常的な開発

```bash
# 開発環境の起動
docker compose up -d

# 特定のサービスのみ起動
docker compose up -d api
docker compose up -d frontend

# コンテナに入る
docker compose exec api bash
docker compose exec frontend sh

# ログの確認
docker compose logs -f api
docker compose logs -f frontend
```

### データベース操作

```bash
# マイグレーション実行
docker compose exec api bundle exec rails db:migrate

# シードデータの投入
docker compose exec api bundle exec rails db:seed

# データベースリセット
docker compose exec api bundle exec rails db:drop db:create db:migrate db:seed
```

## 📋 開発ルール

### Git フロー

- **メインブランチ**: `main`
- **開発ブランチ**: `develop`
- **フィーチャーブランチ**: `feature/機能名`
- **バグ修正ブランチ**: `bugfix/修正内容`

### コミットメッセージ

```
type: subject

body (optional)
```

**Type:**

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: コードスタイル
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: その他

### コーディング規約

#### Backend (Rails)

- **Rubocop**: コード品質チェック
- **命名規則**: snake_case
- **ファイル配置**:
  - コントローラー: `app/controllers/api/v1/`
  - モデル: `app/models/`
  - サービス: `app/services/`
  - メーラー: `app/mailers/`
  - メールテンプレート: `app/views/`
  - テスト: `spec/`

#### Frontend (React + TypeScript)

- **ESLint**: コード品質チェック
- **命名規則**:
  - コンポーネント: PascalCase
  - 関数・変数: camelCase
  - 定数: UPPER_SNAKE_CASE
- **ファイル配置**:
  - コンポーネント: `src/components/`
  - ページ: `src/pages/`
  - フック: `src/hooks/`
  - 型定義: `src/types/`

### テスト戦略

#### Backend

```bash
# 全テスト実行
docker compose exec api bundle exec rspec

# 特定のテスト実行
docker compose exec api bundle exec rspec spec/services/staffs/create_admin_spec.rb
```

#### Frontend

```bash
# テスト実行（今後追加予定）
docker compose exec frontend npm test
```

## 🚀 デプロイ

### 本番環境構築（予定）

- **インフラ**: AWS / Heroku
- **CI/CD**: GitHub Actions
- **監視**: 今後検討

### 環境変数

```bash
# .env.production
RAILS_ENV=production
DATABASE_URL=<本番DB_URL>
SECRET_KEY_BASE=<秘密キー>
VITE_API_URL=<本番API_URL>
```

## 🐛 トラブルシューティング

### よくある問題

**コンテナが起動しない**

```bash
# コンテナとボリュームをクリア
docker compose down -v
docker system prune -a
docker compose up -d --build
```

**データベース接続エラー**

```bash
# DBコンテナの再起動
docker compose restart db
```

**フロントエンドのビルドエラー**

```bash
# node_modulesの再インストール
docker compose exec frontend rm -rf node_modules
docker compose exec frontend npm install
```

## 📞 サポート

開発中に問題が発生した場合は、以下の手順で対応してください：

1. この README のトラブルシューティングを確認
2. GitHub の Issue を検索
3. 新しい Issue を作成
4. チームメンバーに相談

---

## 🔐 認証・確認フロー（現在の実装）

- 管理者仮登録: `POST /api/v1/staffs`
  - メール送信: 確認URLを含む
- メール確認: `GET /api/v1/confirm?token=...`
  - 成功時: `http://localhost:5173/staff/login?confirmed=1` にリダイレクト
  - 再送: `POST /api/v1/confirm/resend { email }`
- スタッフログイン: `POST /api/v1/staff/login`
  - 成功時: フロントは `/onboarding?step=2` へ遷移（施設基本情報から開始）

開発時のメール確認
- Letter Opener Web: `http://localhost:3000/letter_opener`

## 🧰 運用Tips

- コンテナ再起動時の Rails PID 問題
  - `api/docker/entrypoint.sh` が `tmp/pids/server.pid` を削除してから起動
- タイムゾーン
  - アプリは JST（Tokyo）、DB保存は UTC。コンテナ環境変数 `TZ=Asia/Tokyo`

## 🧪 テスト

- RSpec 実行
  - `docker compose exec api bundle exec rspec`
  - test 環境では ActionMailer は `:test` を利用（deliveries に蓄積）

---

**Last Updated**: 2025-09-23
