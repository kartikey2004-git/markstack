import db from "@/lib/database";

// All published posts with bodies. Used for site search and related posts.
// Cached 10 minutes, so the database is read at most about once per 10 minutes
// no matter how many visitors search or open a post.
export const revalidate = 600;

export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      where: {
        status: "published",
      },
      orderBy: {
        createdAt: "desc",
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

    return Response.json(blogs);
  } catch {
    return Response.json([], {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
