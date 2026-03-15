import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/database";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const { canvasId } = await request.json();

    if (!canvasId) {
      return NextResponse.json(
        { error: "Missing canvas ID" },
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

    // Generate share token if it doesn't exist
    let shareToken = canvas.shareToken;
    if (!shareToken) {
      shareToken = nanoid(10); // Generate a 10-character token
    }

    // Update canvas to make it public and set share token
    const updatedCanvas = await db.canvas.update({
      where: {
        id: canvasId,
      },
      data: {
        isPublic: true,
        shareToken,
      },
    });

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/share/${shareToken}`;

    return NextResponse.json({ 
      success: true, 
      shareToken,
      shareUrl,
      canvas: updatedCanvas 
    });
  } catch (error) {
    console.error("Share creation error:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { canvasId } = await request.json();

    if (!canvasId) {
      return NextResponse.json(
        { error: "Missing canvas ID" },
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

    // Remove public access and share token
    const updatedCanvas = await db.canvas.update({
      where: {
        id: canvasId,
      },
      data: {
        isPublic: false,
        shareToken: null,
      },
    });

    return NextResponse.json({ 
      success: true, 
      canvas: updatedCanvas 
    });
  } catch (error) {
    console.error("Share removal error:", error);
    return NextResponse.json(
      { error: "Failed to remove share link" },
      { status: 500 }
    );
  }
}
