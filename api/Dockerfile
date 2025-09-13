FROM ruby:3.3-slim

# 必要パッケージをインストール
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  libmariadb-dev \
  libyaml-dev \
  nodejs \
  npm \
  default-mysql-client \
  curl \
  pkg-config \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# dockerizeをインストール
ENV DOCKERIZE_VERSION v0.7.0
RUN curl -fsSL https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  | tar -C /usr/local/bin -xzv

WORKDIR /app

# Gemfileを先にコピーしてbundle installをキャッシュ効率化
COPY Gemfile Gemfile.lock ./
RUN bundle config --global frozen 1 \
  && bundle install --jobs 4 --retry 3 \
  && bundle clean --force

# アプリケーションファイルをコピー
COPY . .

# 本番環境でのアセット事前コンパイル準備
RUN bundle exec bootsnap precompile --gemfile app/ lib/

# 非rootユーザーでの実行
RUN groupadd -r appuser && useradd -r -g appuser appuser \
  && chown -R appuser:appuser /app
USER appuser

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails s -b 0.0.0.0 -p 3000"]
