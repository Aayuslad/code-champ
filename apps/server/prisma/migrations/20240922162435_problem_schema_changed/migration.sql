/*
  Warnings:

  - Added the required column `submissionCode` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "submissionCode" TEXT NOT NULL,
ADD COLUMN     "testCasesCount" INTEGER NOT NULL DEFAULT 0;
