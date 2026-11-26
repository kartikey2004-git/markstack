import db from "@/lib/database";

// Cache the list on the CDN/data cache for 10 minutes. Edits also call the
// site's revalidate endpoint, so changes show up sooner when they matter.
export const revalidate = 600;

// List view only: no post bodies. Full content is served by /api/public/blogs/[slug].
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
        readTime: true,
        createdAt: true,
        updatedAt: true,
        coverImage: true,
      },
    });

    return Response.json(blogs);
  } catch {
    // Do not cache failures: a 503 tells the site to keep its own cache.
    return Response.json([], {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
