import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { analyzeIdea } from "@/lib/services/analytics";

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 });
    }

    // Run the analytics service
    const analysisResult = await analyzeIdea(name, description);

    // Save to DB
    const saved = await prisma.startupAnalysis.create({
      data: {
        startupIdea: `${name}: ${description}`,
        analysisResult: analysisResult as any, // Cast to JSON-safe structure
      },
    });

    // Attach saved ID for tracking/saving checks in UI
    const finalResponse = {
      ...analysisResult,
      savedId: saved.id,
      createdAt: saved.createdAt,
    };

    return NextResponse.json(finalResponse);
  } catch (error: any) {
    console.error("Error during analysis:", error);
    return NextResponse.json({ error: error?.message || "Failed to analyze startup idea" }, { status: 500 });
  }
}
