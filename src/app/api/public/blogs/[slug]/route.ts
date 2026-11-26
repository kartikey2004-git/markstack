import db from "@/lib/database";

export const revalidate = 600;

// Full published post, including the markdown body.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const blog = await db.blog.findFirst({
      where: {
        slug,
        status: "published",
      },
      select: {
        title: true,
        description: true,
        slug: true,
        content: true,
        readTime: true,
        createdAt: true,
        updatedAt: true,
        coverImage: true,
      },
    });

    if (!blog) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(blog);
  } catch {
    return Response.json(
      { error: "Unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
