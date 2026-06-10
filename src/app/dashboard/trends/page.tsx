import React from "react";
import { prisma } from "@/lib/db";
import TrendsClient from "./TrendsClient";

export const dynamic = "force-dynamic";

export default async function TrendsPage() {
  const trends = await prisma.marketTrend.findMany({
    orderBy: {
      growthRate: "desc",
    },
  });

  return <TrendsClient trends={trends} />;
}
