import React from "react";
import { prisma } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch statistics in parallel
  const [startupsCount, analysesCount, failureReasons, recentAnalyses, marketTrends] = await Promise.all([
    prisma.startup.count(),
    prisma.startupAnalysis.count(),
    prisma.failureReason.findMany({
      select: {
        category: true,
      },
    }),
    prisma.startupAnalysis.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        startupIdea: true,
        createdAt: true,
      },
    }),
    prisma.marketTrend.findMany({
      orderBy: {
        growthRate: "desc",
      },
    }),
  ]);

  // Aggregate failure reason counts
  const categoryMap: Record<string, number> = {};
  failureReasons.forEach((r) => {
    categoryMap[r.category] = (categoryMap[r.category] || 0) + 1;
  });

  const failureCategoryCounts = Object.entries(categoryMap).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <DashboardClient
      startupsCount={startupsCount}
      analysesCount={analysesCount}
      failureCategoryCounts={failureCategoryCounts}
      recentAnalyses={recentAnalyses}
      marketTrends={marketTrends}
    />
  );
}
