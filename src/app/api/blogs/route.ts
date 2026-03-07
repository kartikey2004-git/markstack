import { NextRequest, NextResponse } from "next/server";
import { getBlogs } from "@/lib/supabase/blogs";

export async function GET() {
  try {
    const blogs = await getBlogs();

    // Transform the data to match the expected format
    const transformedBlogs = blogs.map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      description: blog.description,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at,
    }));

    return NextResponse.json({ blogs: transformedBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
