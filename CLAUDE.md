# CLAUDE.md

このファイルは、このリポジトリでのコード作業時にClaude Code (claude.ai/code) にガイダンスを提供します。

## 開発コマンド

- `npm run dev --turbopack`: 開発サーバーを起動（Turbopack使用）
- `npm run build`: プロダクションビルド
- `npm run start`: プロダクションサーバー起動
- `npm run lint`: ESLintによるコード検証

## アーキテクチャ

このプロジェクトはNext.js 15のApp Routerを使用したシンプルなTodoアプリケーションです：

- **UI構造**: 単一ページアプリケーション（`src/app/page.tsx`）でTodoリストを管理
- **状態管理**: React hooksによるローカル状態管理（useState）
- **スタイリング**: Tailwind CSS 4を使用
- **データ構造**: タスクは文字列配列として管理、インデックスベースでの削除
- **フォント**: Geist Sans/Monoフォントを使用

## 技術仕様

- **React 19** + **Next.js 15** + **TypeScript 5**
- **Tailwind CSS 4** (PostCSS設定)
- **ESLint 9** (Next.js設定)
- Dockerサポート対応済み

## 開発時の注意点

- 現在のタスクデータは永続化されていません（ページリロードで消失）
- 'use client'ディレクティブによりクライアントサイドレンダリング
- タスクの重複チェックや編集機能は未実装