-- CreateTable
CREATE TABLE "OngoingContestProblem" (
    "id" TEXT NOT NULL,
    "contestPorblemId" TEXT NOT NULL,
    "solutions" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "OngoingContestProblem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OngoingContestProblem" ADD CONSTRAINT "OngoingContestProblem_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ContestParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
