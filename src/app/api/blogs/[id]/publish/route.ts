import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-utils";
import { toggleBlogPublishForAuthor } from "@/lib/blogs/toggle-publish";
import { getErrorCode } from "@/lib/server/error-utils";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const user = await requireApiAuth();
    if (user instanceof NextResponse) {
      return user;
    }

    const updatedBlog = await toggleBlogPublishForAuthor(id, user.id);

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Blog ${updatedBlog.published ? "published" : "unpublished"} successfully`,
      published: updatedBlog.published,
    });
  } catch (error: unknown) {
    console.error("Error toggling blog publish status:", error);

    if (getErrorCode(error) === "P2025") {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}
