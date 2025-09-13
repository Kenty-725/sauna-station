FROM node:20-alpine

# 必要なパッケージをインストール
RUN apk add --no-cache \
  git \
  curl

WORKDIR /app

# package.json と package-lock.json を先にコピーしてnpm installをキャッシュ効率化
COPY package*.json ./
RUN npm ci --only=production=false \
  && npm cache clean --force

# アプリケーションファイルをコピー
COPY . .

# 非rootユーザーでの実行
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001 \
  && chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 5173

CMD ["npm", "run", "dev"]
