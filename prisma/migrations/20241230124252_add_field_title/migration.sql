/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `contents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contents_title_key" ON "contents"("title");
