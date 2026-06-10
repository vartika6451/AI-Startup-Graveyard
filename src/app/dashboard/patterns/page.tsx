import React from "react";
import { prisma } from "@/lib/db";
import PatternsClient from "./PatternsClient";

export const dynamic = "force-dynamic";

export default async function PatternsPage() {
  const failureReasons = await prisma.failureReason.findMany({
    include: {
      startup: {
        select: {
          name: true,
          fundingRaised: true,
        },
      },
    },
  });

  return <PatternsClient failureReasons={failureReasons} />;
}
