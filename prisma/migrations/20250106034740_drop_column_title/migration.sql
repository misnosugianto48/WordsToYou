/*
  Warnings:

  - You are about to drop the column `title` on the `contents` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "contents_title_key";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "title";
