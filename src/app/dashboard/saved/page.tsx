import React from "react";
import { prisma } from "@/lib/db";
import SavedClient from "./SavedClient";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const reports = await prisma.startupAnalysis.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map database json results to typescript structure
  const formattedReports = reports.map((r: { id: string; startupIdea: string; analysisResult: any; createdAt: Date }) => ({
    id: r.id,
    startupIdea: r.startupIdea,
    analysisResult: r.analysisResult as any,
    createdAt: r.createdAt.toISOString(),
  }));

  return <SavedClient initialReports={formattedReports} />;
}
