/*
  Warnings:

  - You are about to alter the column `durationMs` on the `Contest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Contest" ALTER COLUMN "durationMs" SET DATA TYPE INTEGER;
