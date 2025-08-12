/*
  Warnings:

  - The `visibility` column on the `Contest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Public', 'Private');

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "visibility",
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'Public';

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'Public';

-- DropEnum
DROP TYPE "ContestVisibility";
