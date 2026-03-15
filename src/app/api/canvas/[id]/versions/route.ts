import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: canvasId } = await params;

    // Get the current user session using better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Verify user owns the canvas
    const canvas = await db.canvas.findFirst({
      where: {
        id: canvasId,
        userId: session?.user?.id || "",
      },
    });

    if (!canvas) {
      return NextResponse.json({ error: "Canvas not found" }, { status: 404 });
    }

    // Get all versions for this canvas
    const versions = await db.canvasVersion.findMany({
      where: {
        canvasId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ versions });
  } catch (error) {
    console.error("Versions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch versions" },
      { status: 500 },
    );
  }
}
