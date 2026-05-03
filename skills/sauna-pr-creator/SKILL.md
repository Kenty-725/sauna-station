---
name: sauna-pr-creator
description: sauna-station リポジトリで Pull Request を作成するときに使う。`.github/pull_request_template.md` を読み、日本語で各項目を埋め、必要なら `git push` のうえ `gh pr create` で `develop` 向け PR を作成する。
---

# Sauna PR Creator

## 概要

このスキルは `sauna-station` で PR を作るときの定型作業をまとめたものです。ユーザーが「PR を作って」「テンプレートに沿って日本語で PR を出して」のように依頼したときに使います。

## 使う場面

- 変更をコミット済みで、PR 作成まで進めたいとき
- `.github/pull_request_template.md` に沿って本文を作る必要があるとき
- PR 本文を日本語で整えたいとき
- GitHub MCP が使えない場合に `gh` へ切り替える必要があるとき

## 手順

### 1. 事前確認

- 現在のブランチ名を確認する。通常は `feature/*` または `bugfix/*` を前提にする。
- `git status --short` で作業ツリーが clean か確認する。
- PR 作成前に必要なテストやビルドが終わっているか確認し、実行したコマンドを控える。
- base ブランチは原則 `develop` とする。別指定があればそれに従う。

### 2. テンプレートを読む

- 必ず `.github/pull_request_template.md` を読む。
- テンプレートの見出し・チェックボックス構造は維持する。
- 空欄は残さない。該当しない箇所は `なし`、または簡潔な補足で埋める。

### 3. PR 本文を組み立てる

本文は日本語で書く。特に次を守る。

- `## 📋 概要`
  今回の変更で何を実装・修正したかを 1 段落で要約する。
- `## 🔗 関連Issue`
  Issue がなければ `- なし` と書く。
- `## 📝 変更内容`
  実際の変更を 3 点前後のチェックリストで書く。
- `## やらないこと`
  スコープ外を明記する。
- `## 📱 スクリーンショット`
  UI 変更があれば Before/After、なければ `なし` かテキスト説明にする。
- `## 🧪 テスト実施項目`
  実行したコマンドをそのまま列挙する。
- `## ⚠️ 注意事項`
  テンプレートの各チェック項目を正しくオン・オフする。推測でチェックしない。
- `## 📋 レビューのポイント`
  レビュアーに見てほしい論点を 2-3 個書く。
- `## ✅ PR作成者チェックリスト`
  実際に満たしているものだけ `[x]` にする。

### 4. PR 作成方法

優先順位は以下。

1. GitHub MCP が認証済みで使えるならそれでもよい
2. 使えない場合は `gh` を使う
3. `gh` を使う前に `gh auth status` を確認する
4. ブランチが未 push なら先に `git push -u origin <branch>`
5. PR は `gh pr create --base develop --head <branch> --title ... --body-file -` で作る

`--body-file -` を使い、ヒアドキュメントでテンプレート準拠の本文を流し込むと崩れにくい。

### 5. 完了確認

- PR URL が出力されたことを確認する。
- base が `develop`、head が現在ブランチであることを確認する。
- ユーザーへの返答では、PR URL、コミット SHA、実行した主な検証だけを簡潔に伝える。

## 失敗時の扱い

- GitHub MCP が `Authentication Failed` なら、説明を添えて `gh` に切り替える。
- `gh pr create` が拒否されたら、権限承認を取り直して再実行する。
- テンプレートが見つからない場合は、その旨を明示し、既存慣習に近い日本語本文で代替する。
- working tree が dirty なら、未コミット差分をどう扱うか先に整理する。勝手に除去しない。

## 参考コマンド

```bash
git status --short
git branch --show-current
git push -u origin <branch>
gh auth status
gh pr create --base develop --head <branch> --title "<title>" --body-file -
```

## 出力の基準

- PR タイトルは日本語で簡潔に書く。
- 本文はテンプレートの順序を変えない。
- 実行していないテストを書かない。
- 断定できない注意事項はチェックしない。
