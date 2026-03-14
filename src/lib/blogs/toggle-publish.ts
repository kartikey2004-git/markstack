import db from "@/lib/database";

export async function toggleBlogPublishForAuthor(id: string, authorId: string) {
  const blog = await db.blog.findFirst({
    where: {
      id,
      authorId,
    },
    select: {
      id: true,
      published: true,
    },
  });

  if (!blog) {
    return null;
  }

  return db.blog.update({
    where: {
      id,
    },
    data: {
      published: !blog.published,
    },
  });
}

