# CLAUDE.md

このファイルは、このリポジトリでのコード作業時にClaude Code (claude.ai/code) にガイダンスを提供します。

## 開発コマンド

### 基本コマンド
- `npm run dev --turbopack`: 開発サーバーを起動（Turbopack使用）
- `npm run build`: プロダクションビルド
- `npm run start`: プロダクションサーバー起動
- `npm run lint`: ESLintによるコード検証

### データベースコマンド
- `npm run db:generate`: Prismaクライアント生成
- `npm run db:push`: スキーマをデータベースに反映
- `npm run db:migrate`: マイグレーション実行
- `npm run db:migrate:reset`: マイグレーションリセット
- `npm run db:migrate:deploy`: 本番用マイグレーション実行
- `npm run db:studio`: Prisma Studio起動

### データベース切り替え
- `npm run db:switch:postgres`: PostgreSQLに切り替え
- `npm run db:switch:sqlite`: SQLiteに切り替え
- `npm run db:postgres`: PostgreSQLコンテナ起動
- `npm run db:postgres:stop`: PostgreSQLコンテナ停止

## アーキテクチャ

このプロジェクトはNext.js 15のApp Routerを使用したフルスタックTodoアプリケーションです：

### フロントエンド
- **UI構造**: 単一ページアプリケーション（`src/app/page.tsx`）でTodoリストを管理
- **状態管理**: React hooks（useState、useEffect、useCallback）によるローカル状態管理
- **スタイリング**: Tailwind CSS 4を使用
- **フォント**: Geist Sans/Monoフォントを使用

### バックエンド
- **API Routes**: Next.js App RouterのAPI Routes機能を使用
- **データベース**: Prisma ORM + PostgreSQL/SQLite
- **データ永続化**: データベースによる完全な永続化対応

### データベース設計
```prisma
enum TodoStatus {
  PENDING      // 未着手
  IN_PROGRESS  // 進行中
  COMPLETED    // 完了
}

model Todo {
  id          Int        @id @default(autoincrement())
  title       String     // タイトル（必須）
  description String?    // 詳細（オプション）
  dueDate     DateTime?  // 期限（オプション）
  status      TodoStatus @default(PENDING)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

## 実装済み機能

### 基本機能
1. ✅ **タスク作成**: タイトル、詳細、期限を設定可能
2. ✅ **ステータス管理**: 未着手 → 進行中 → 完了の循環変更
3. ✅ **タスク削除**: 個別タスクの削除機能
4. ✅ **連続作成**: タスク作成後のフォーム継続表示
5. ✅ **ソート機能**: 作成日時・期限日時によるソート

### 高度な機能
- **期限警告**: 期限切れタスクの視覚的表示（赤色）
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **TypeScript**: 完全な型安全性
- **データベース永続化**: PostgreSQL/SQLite対応
- **Docker対応**: PostgreSQLコンテナ環境

## API エンドポイント

### Todo操作
- `GET /api/todos?sortBy={createdAt|dueDate}&order={asc|desc}`: タスク一覧取得
- `POST /api/todos`: 新規タスク作成
- `PUT /api/todos/[id]`: タスク更新（ステータス変更含む）
- `DELETE /api/todos/[id]`: タスク削除

## ファイル構成

```
src/
├── app/
│   ├── api/todos/
│   │   ├── route.ts           # GET, POST
│   │   └── [id]/route.ts      # PUT, DELETE
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # メインUI
├── lib/
│   └── prisma.ts              # Prismaクライアント設定
└── types/
    └── todo.ts                # TypeScript型定義

prisma/
├── migrations/                # マイグレーションファイル
├── schema.prisma             # メインスキーマ
├── schema.postgresql.prisma  # PostgreSQL用
└── schema.sqlite.prisma     # SQLite用
```

## 技術仕様

- **React 19** + **Next.js 15** + **TypeScript 5**
- **Tailwind CSS 4** (PostCSS設定)
- **Prisma ORM** + **PostgreSQL/SQLite**
- **ESLint 9** (Next.js設定)
- **Docker Compose** (PostgreSQL環境)

## 開発時の注意点

- デフォルトでPostgreSQLを使用（`npm run db:switch:sqlite`でSQLiteに切り替え可能）
- PostgreSQL使用時は事前に`npm run db:postgres`でコンテナ起動が必要
- スキーマ変更時は`npm run db:migrate`でマイグレーション実行
- Prisma Studioで`http://localhost:5555`からデータベース確認可能
- 型安全性を保つため、API型定義（`src/types/todo.ts`）を必ず使用