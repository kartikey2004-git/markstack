import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/lib/utils";
import { serializeMDX } from "@/lib/markdown/mdx-renderer";
import { createBlog } from "@/lib/supabase/blogs";

export async function POST(request: NextRequest) {
  try {
    const { title, description, content } = await request.json();

    // Validate inputs
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    // Generate slug and HTML content
    const slug = generateSlug(title);
    const htmlContent = await serializeMDX(content);

    // Create blog in Supabase
    const blog = await createBlog({
      title: title.trim(),
      description: description?.trim() || "",
      content: content.trim(),
      html_content: htmlContent,
      slug,
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Failed to save blog to database" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      slug: blog.slug,
      message: "Blog saved successfully",
    });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}
