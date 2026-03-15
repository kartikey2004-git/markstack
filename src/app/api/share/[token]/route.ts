import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token: shareToken } = await params;

    // Find canvas by share token (must be public)
    const canvas = await db.canvas.findFirst({
      where: {
        shareToken,
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!canvas) {
      return NextResponse.json(
        { error: "Canvas not found or not publicly accessible" },
        { status: 404 },
      );
    }

    return NextResponse.json({ canvas });
  } catch (error) {
    console.error("Share fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared canvas" },
      { status: 500 },
    );
  }
}
