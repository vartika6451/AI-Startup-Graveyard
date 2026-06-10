import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const reports = await prisma.startupAnalysis.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reports);
  } catch (error: any) {
    console.error("Error fetching analyses:", error);
    return NextResponse.json({ error: "Failed to fetch saved reports" }, { status: 500 });
  }
}
