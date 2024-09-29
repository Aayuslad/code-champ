-- CreateTable
CREATE TABLE "OngoingProblem" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "solutionCode" TEXT NOT NULL,

    CONSTRAINT "OngoingProblem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OngoingProblem" ADD CONSTRAINT "OngoingProblem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
