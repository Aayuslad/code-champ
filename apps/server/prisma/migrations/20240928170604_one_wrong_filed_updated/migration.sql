/*
  Warnings:

  - You are about to drop the column `solutionCode` on the `OngoingProblem` table. All the data in the column will be lost.
  - Added the required column `solutions` to the `OngoingProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OngoingProblem" DROP COLUMN "solutionCode",
ADD COLUMN     "solutions" TEXT NOT NULL;
