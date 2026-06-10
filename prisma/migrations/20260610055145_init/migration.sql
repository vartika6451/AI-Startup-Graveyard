-- CreateTable
CREATE TABLE "startups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "businessModel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fundingRaised" DOUBLE PRECISION NOT NULL,
    "foundedYear" INTEGER NOT NULL,
    "closedYear" INTEGER,
    "website" TEXT,

    CONSTRAINT "startups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failureReasons" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "failureReasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonsLearned" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "lesson" TEXT NOT NULL,

    CONSTRAINT "lessonsLearned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketTrends" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "trend" TEXT NOT NULL,
    "growthRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "marketTrends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "startupAnalyses" (
    "id" TEXT NOT NULL,
    "startupIdea" TEXT NOT NULL,
    "analysisResult" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "startupAnalyses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "failureReasons" ADD CONSTRAINT "failureReasons_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "startups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonsLearned" ADD CONSTRAINT "lessonsLearned_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "startups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
