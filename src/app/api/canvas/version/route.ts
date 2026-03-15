import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const { canvasId, data } = await request.json();

    if (!canvasId || !data) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the current user session using better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify user owns the canvas
    const canvas = await db.canvas.findFirst({
      where: {
        id: canvasId,
        userId: session.user.id,
      },
    });

    if (!canvas) {
      return NextResponse.json(
        { error: "Canvas not found" },
        { status: 404 }
      );
    }

    // Create version snapshot
    const version = await db.canvasVersion.create({
      data: {
        canvasId,
        data: data,
      },
    });

    return NextResponse.json({ success: true, version });
  } catch (error) {
    console.error("Version creation error:", error);
    return NextResponse.json(
      { error: "Failed to create version" },
      { status: 500 }
    );
  }
}
