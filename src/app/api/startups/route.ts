import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const industry = searchParams.get("industry") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (industry) {
      where.industry = industry;
    }

    const startups = await prisma.startup.findMany({
      where,
      include: {
        failureReasons: true,
        lessonsLearned: true,
      },
      orderBy: {
        fundingRaised: "desc",
      },
    });

    return NextResponse.json(startups);
  } catch (error: any) {
    console.error("Error fetching startups:", error);
    return NextResponse.json({ error: "Failed to fetch startups" }, { status: 500 });
  }
}
