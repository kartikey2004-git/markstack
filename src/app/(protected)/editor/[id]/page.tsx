import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-utils";
import db from "@/lib/database";
import { EditorWrapper } from "@/components/editor/editor-wrapper";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireAuth(`/editor/${id}`);

  const blog = await db.blog.findFirst({
    where: {
      id,
      authorId: user.id,
    },
  });

  if (!blog) {
    notFound();
  }

  return <EditorWrapper blog={blog} />;
}
