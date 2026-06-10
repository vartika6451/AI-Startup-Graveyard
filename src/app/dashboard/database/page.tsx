import React from "react";
import { prisma } from "@/lib/db";
import DatabaseClient from "./DatabaseClient";

export const dynamic = "force-dynamic";

export default async function DatabasePage() {
  const startups = await prisma.startup.findMany({
    include: {
      failureReasons: true,
      lessonsLearned: true,
    },
    orderBy: {
      fundingRaised: "desc",
    },
  });

  return <DatabaseClient initialStartups={startups} />;
}
