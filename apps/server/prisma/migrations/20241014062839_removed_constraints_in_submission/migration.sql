/*
  Warnings:

  - Made the column `difficultyLevel` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "difficultyLevel" SET NOT NULL,
ALTER COLUMN "difficultyLevel" DROP DEFAULT;
