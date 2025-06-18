/*
  Warnings:

  - You are about to drop the column `completed` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "completed",
DROP COLUMN "text",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "title" TEXT NOT NULL;
