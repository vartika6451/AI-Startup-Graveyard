import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.startupAnalysis.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting analysis:", error);
    return NextResponse.json({ error: "Failed to delete report" }, { status: 500 });
  }
}
