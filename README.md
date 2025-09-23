# Sauna Station

サウナ施設の検索・予約システム

## 📋 目次

- [技術スタック](#技術スタック)
- [プロジェクト構成](#プロジェクト構成)
- [環境構築](#環境構築)
- [開発ルール](#開発ルール)
- [コード品質](#コード品質)
- [デプロイ](#デプロイ)
- [トラブルシューティング](#トラブルシューティング)
- [サポート](#サポート)

## 技術スタック

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

## プロジェクト構成

```
sauna-station/
├── api/                        # Rails API
│   ├── app/
│   │   ├── controllers/
│   │   │   └── api/
│   │   │       └── v1/         # API v1エンドポイント
│   │   ├── models/             # データモデル
│   │   ├── serializers/        # JSON レスポンス用
│   │   ├── jobs/               # 非同期処理
│   │   └── mailers/           # メール送信
│   ├── config/                # Rails設定
│   ├── db/                    # データベース関連
│   └── spec/                  # テスト
│       ├── factories/         # テストデータ
│       ├── models/            # モデルテスト
│       └── requests/          # APIテスト
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

## 環境構築

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
docker-compose up --build
```

4. **アクセス確認**

- Frontend: http://localhost:5173
- API: http://localhost:3000
- API(開発用メール配信確認): http://localhost:3000/letter_opener/
- Database: localhost:3306

### 日常的な開発

```bash
# 開発環境の起動
docker-compose up

# 特定のサービスのみ起動
docker-compose up api
docker-compose up frontend

# コンテナに入る
docker-compose exec api bash
docker-compose exec frontend sh

# ログの確認
docker-compose logs -f api
docker-compose logs -f frontend
```

### データベース操作

```bash
# マイグレーション実行
docker-compose exec api bundle exec rails db:migrate

# シードデータの投入
docker-compose exec api bundle exec rails db:seed

# データベースリセット
docker-compose exec api bundle exec rails db:drop db:create db:migrate db:seed
```

## 開発ルール

### Git フロー

- **メインブランチ**: `main`
- **開発ブランチ**: `develop`
- **フィーチャーブランチ**: `feature/issue番号-機能名`
- **バグ修正ブランチ**: `bugfix/issue番号-修正内容`
- **設定周りのブランチ**: `chore/issue番号-修正内容`

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
  - シリアライザー: `app/serializers/`
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

## コード品質

### Frontend: ESLint / Prettier

- 実行ディレクトリ: `frontend`
- コマンド
  - 依存関係（初回/更新）: `npm ci`
  - Lint 実行: `npm run lint`
  - Lint 自動修正: `npm run lint:fix`
  - フォーマット確認: `npm run format`
  - フォーマット修正: `npm run format:fix`

### Backend: RuboCop

- ローカルで実行（Ruby がローカルに入っている場合）
  - `cd api && bundle install`
  - `bundle exec rubocop`
- Docker 環境で実行
  - `docker-compose exec api bundle exec rubocop`

### テスト戦略

#### Backend

```bash
# 全テスト実行
docker-compose exec api bundle exec rspec

# 特定のテスト実行
docker-compose exec api bundle exec rspec spec/models/user_spec.rb
```

#### Frontend

```bash
# テスト実行（今後追加予定）
docker-compose exec frontend npm test
```

## デプロイ

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

## トラブルシューティング

### よくある問題

**コンテナが起動しない**

```bash
# コンテナとボリュームをクリア
docker-compose down -v
docker system prune -a
docker-compose up --build
```

**データベース接続エラー**

```bash
# DBコンテナの再起動
docker-compose restart db
```

**フロントエンドのビルドエラー**

```bash
# node_modulesの再インストール
docker-compose exec frontend rm -rf node_modules
docker-compose exec frontend npm install
```

## サポート

開発中に問題が発生した場合は、以下の手順で対応してください：

1. この README のトラブルシューティングを確認
2. GitHub の Issue を検索
3. 新しい Issue を作成
4. チームメンバーに相談

---

**Last Updated**: 2025-09-07
