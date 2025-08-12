/*
  Warnings:

  - Added the required column `durationMs` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "durationMs" BIGINT NOT NULL;
