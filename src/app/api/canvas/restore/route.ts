import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const { canvasId, versionId } = await request.json();

    if (!canvasId || !versionId) {
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

    // Get the version to restore
    const version = await db.canvasVersion.findFirst({
      where: {
        id: versionId,
        canvasId,
      },
    });

    if (!version) {
      return NextResponse.json(
        { error: "Version not found" },
        { status: 404 }
      );
    }

    // Update canvas with version data
    const updatedCanvas = await db.canvas.update({
      where: {
        id: canvasId,
      },
      data: {
        data: version.data!,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, canvas: updatedCanvas });
  } catch (error) {
    console.error("Version restore error:", error);
    return NextResponse.json(
      { error: "Failed to restore version" },
      { status: 500 }
    );
  }
}
