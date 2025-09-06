# AGENTS.md

このリポジトリで AI コーディングエージェント（Codex CLI など）を使うための運用ガイドです。短時間で安全・確実に変更を進めるためのルール、手順、チェックリストをまとめています。

## 目的

- 変更を小さく安全に進める
- 既存のスタイルとツールチェーン（Next.js / Vitest / Storybook）に揃える
- 実行・検証方法を明確にする

## 環境・前提

- Node: `mise.toml` の `node = 22.19.0` を使用
- パッケージマネージャ: `npm`（`package.json` のスクリプトに準拠）
- フレームワーク: Next.js 15（Turbopack 有効）
- テスト: Vitest（UIモード/ブラウザ/カバレッジ対応）、Storybook + Vitest アドオン

## よく使うコマンド

- 開発サーバ: `npm run dev`
- ビルド: `npm run build`
- 本番起動: `npm run start`
- Storybook 起動: `npm run storybook`
- Storybook ビルド: `npm run build-storybook`
- テスト（ウォッチ）: `npm run test`
- テスト（UI）: `npm run test:ui`
- テスト（一括）: `npm run test:run`

## 変更方針（重要）

- 最小限・焦点を絞った差分にする（無関係な修正は行わない）
- 既存スタイルに合わせる（命名/構成/フォーマット）
- ルート原因に対処する（表面的な回避策は避ける）
- 必要に応じてドキュメントを更新（本ファイル含む）
- ライセンスやヘッダーは追加しない
- 一文字変数は使わない
- インラインコメントは最小限（要求がある場合のみ）

## ファイル編集ルール（エージェント向け）

- 変更は `apply_patch` を使って行う（例は下記）。
- 1 回のパッチはタスクに必要な差分に限定する。
- 大きなファイルを開く場合は 250 行以内の範囲で読む。
- `git commit` やブランチ作成は、明示的な指示がある場合のみ。

例: ファイル追加

```
*** Begin Patch
*** Add File: path/to/new-file.ts
+export const hello = () => 'world';
*** End Patch
```

例: 既存ファイル更新

```
*** Begin Patch
*** Update File: src/app.ts
@@
-export function sum(a: number, b: number) { return a + b }
+export function sum(a: number, b: number) {
+  return a + b;
+}
*** End Patch
```

## 計画（Plan）運用

- 複数工程・不確実性が高い作業は `update_plan` を使ってステップを共有。
- 常に 1 ステップのみ `in_progress` とし、完了ごとに `completed` に更新。
- 単純作業（1 ステップで完了）はプラン不要。

良い例（UI コンポーネント修正）

1. テスト追加/更新
2. コンポーネント修正
3. Storybook ストーリー更新
4. テスト実行で検証

## 検証の指針

- 変更対象の最小単位テストから先に実行し、段階的に広げる。
- UI コンポーネントは Storybook のストーリーや `@storybook/addon-vitest` によるブラウザテストも確認。
- 主要コマンド:
  - `npm run test`（ウォッチ）
  - `npm run test:ui`（UI モード）
  - `npm run test:run`（一括）
- 失敗の原因を切り分け、無関係なテストやコードには手を入れない。

## 本プロジェクト固有のメモ

- Vitest 設定: `vitest.config.ts`（Storybook プラグインを利用）
- Storybook 設定: `.storybook/` ディレクトリ
- 型/設定: `tsconfig.json`、`next.config.ts`
- UI コンポーネント例: `src/components/ui/`

## 変更の受け入れ基準（Checklist）

- 目的に沿った最小差分か
- ビルド・テストがローカルで成功するか
- 型エラーがないか
- Storybook ストーリー（該当する場合）が更新・動作するか
- 命名・スタイルが周辺コードに一致しているか
- 本ファイルや README に追記が必要なら更新済みか

## 典型タスクの進め方（テンプレ）

### 1) UI コンポーネントの小修正

1. 既存テストを読み、必要なら失敗テストを追加
2. コンポーネントを最小変更で修正
3. `npm run test` と `npm run storybook` で確認
4. 必要ならストーリーやドキュメント更新

### 2) バグ修正

1. 再現テストを追加（Red）
2. 根本原因に対処（Fix）
3. テスト・ビルド・ストーリーで確認（Green）

### 3) 設定の変更（Vitest/Storybook/Next）

1. 目的・影響範囲を簡潔にプラン化
2. 変更点を 1 ファイルずつ適用
3. 関連コマンドを実行して検証

## コミュニケーション

- 作業前に「何を・どこまでやるか」を 1〜2 行で宣言
- 作業中も進捗を短く共有（例: 「テスト更新→修正→再実行」）
- 判断が必要な点は早めに質問

---

このガイドは最小限に保ち、プロジェクトの変化に合わせて随時更新してください。
