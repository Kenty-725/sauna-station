# Docker・DB設定 課題整理と改善提案レポート

## 📋 調査概要
2025-09-13時点でのSauna Stationプロジェクトにおけるドッカー・データベース設定の課題と改善点を調査・整理。

---

## 🚨 **高優先度**の課題

### 1. セキュリティ: ハードコードされた認証情報
**現在の問題:**
- `docker-compose.yml`にDBパスワードが平文で記載
- 開発環境でも`password`という脆弱なパスワードを使用

**リスク:**
- 認証情報がVCS履歴に残る
- 開発者が本番環境でも同様の脆弱なパスワードを使用するリスク

**改善提案:**
```yaml
# docker-compose.yml の改善案
environment:
  MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD:-dev_password_123!}
  MYSQL_PASSWORD: ${DB_USER_PASSWORD:-dev_user_123!}
```

### 2. Docker Compose: 非効率なDB初期化処理
**現在の問題:**
- APIコンテナ起動時に毎回`db:create db:migrate`を実行
- DB接続の待機処理なし

**影響:**
- 起動時間の増加（不要なDB作成処理）
- DB準備前のAPI起動による接続エラー

**改善提案:**
```yaml
# healthcheck とwait処理の追加
depends_on:
  db:
    condition: service_healthy
```

### 3. Dockerfile: イメージサイズとキャッシュ効率
**現在の問題:**
- Rails Dockerfileでマルチステージビルド未使用
- パッケージキャッシュが残る

**影響:**
- 大きなイメージサイズ
- ビルド時間の増加

---

## ⚠️ **中優先度**の課題

### 4. 開発体験: ボリュームとファイル監視
**現在の問題:**
- Node.jsの`node_modules`ボリュームはあるが、最適化の余地
- Viteの設定でホストバインドは設定済み

**改善提案:**
- Dockerfileでの`COPY . .`を最適化
- `.dockerignore`ファイルの追加

### 5. 環境変数管理の改善
**現在の状況:**
- `.env.example`ファイルは適切に配置済み
- `.gitignore`で環境変数は適切に除外

**改善提案:**
- 開発環境用デフォルト値の設定
- 環境別設定ファイルの検討

### 6. Database設定の改善
**現在の問題:**
- MySQL 8.0のデフォルト認証プラグイン問題
- 文字セットの最適化

**改善提案:**
```yaml
db:
  command: --default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

---

## 📝 **低優先度**の課題

### 7. Rails Gemfile: 開発効率化
**現在の状況:**
- 基本的な構成は適切
- CORS gem がコメントアウト

**改善提案:**
- 開発用gemの追加（pry-rails、better_errors等）
- CORS設定の有効化とフロントエンド連携

### 8. コンテナ名とネットワーク
**現在の状況:**
- 明示的なコンテナ名設定済み
- ネットワーク設定は暗黙的にdefault

**改善提案:**
- 明示的なネットワーク定義
- サービス間通信の最適化

---

## 🛠 **具体的な改善ファイル例**

### 改善版 docker-compose.yml
```yaml
version: "3.9"

services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: sauna-api
    command: bash -c "dockerize -wait tcp://db:3306 -timeout 60s && bundle exec rails db:prepare && bundle exec rails s -b 0.0.0.0 -p 3000"
    volumes:
      - ./api:/app
      - bundle_data:/usr/local/bundle
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy
    environment:
      - RAILS_ENV=development
      - DATABASE_HOST=db
      - DATABASE_USERNAME=root
      - DATABASE_PASSWORD=${DB_ROOT_PASSWORD:-dev_password_123!}
      - DATABASE_NAME=${DB_NAME:-sauna_dev}
    networks:
      - sauna-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: sauna-frontend
    command: npm run dev
    volumes:
      - ./frontend:/app
      - node_modules:/app/node_modules
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=${FRONTEND_API_URL:-http://localhost:3000/api/v1}
    depends_on:
      - api
    networks:
      - sauna-network

  db:
    image: mysql:8.0
    container_name: sauna-db
    restart: always
    command: --default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD:-dev_password_123!}
      MYSQL_DATABASE: ${DB_NAME:-sauna_dev}
      MYSQL_USER: ${DB_USER:-sauna_user}
      MYSQL_PASSWORD: ${DB_USER_PASSWORD:-dev_user_123!}
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${DB_ROOT_PASSWORD:-dev_password_123!}"]
      timeout: 20s
      retries: 10
    networks:
      - sauna-network

volumes:
  bundle_data:
  node_modules:
  db_data:

networks:
  sauna-network:
    driver: bridge
```

---

## 📊 **優先度別実装ロードマップ**

### フェーズ1: セキュリティ強化（即座に実装）
1. 環境変数によるDB認証情報管理
2. デフォルトパスワードの強化
3. `.dockerignore`ファイル追加

### フェーズ2: 開発体験向上（1週間以内）
1. DB待機処理の実装
2. healthcheck機能追加
3. Dockerfile最適化

### フェーズ3: 長期的改善（1ヶ月以内）
1. マルチステージビルドの導入
2. 本番環境設定の追加
3. CI/CD用docker-compose.override.yml作成

---

## 🎯 **期待される効果**

- **セキュリティ向上**: 認証情報のハードコード撲滅
- **開発効率化**: 起動時間短縮、エラー減少
- **保守性向上**: 設定の柔軟性と環境間の一貫性
- **チーム開発**: 統一された開発環境

---

**調査日時**: 2025-09-13  
**調査対象**: docker-compose.yml, Dockerfile, database.yml, 環境変数設定
