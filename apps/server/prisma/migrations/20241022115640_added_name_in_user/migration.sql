/*
  Warnings:

  - You are about to alter the column `userName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" VARCHAR(50) NOT NULL DEFAULT '',
ALTER COLUMN "userName" SET DATA TYPE VARCHAR(50);
