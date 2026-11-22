import "server-only";

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import db from "@/lib/database";
import { getCurrentUser } from "@/lib/auth-utils";
import { checkBlogExportRateLimit } from "./rate-limit";
import type { ExportableBlog, ExportKind } from "./types";

// Published posts are public, so anyone may export them. Drafts are visible
// only to their author, so only the author can export those.
// Rate limits use the user id when signed in, and the client IP otherwise.

async function getRateLimitKey(userId: string | null) {
  if (userId) return `user:${userId}`;

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0];
  const ip =
    forwardedFor?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  return `ip:${ip}`;
}

export async function requireBlogExportAccess(
  blogId: string,
  kind: ExportKind,
): Promise<
  | {
      user: { id: string; name: string; email: string } | null;
      blog: ExportableBlog;
    }
  | NextResponse
> {
  const viewer = await getCurrentUser();
  const viewerId = viewer?.id ?? null;

  const rateLimitResult = checkBlogExportRateLimit(
    await getRateLimitKey(viewerId),
    kind,
  );
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: `Too many ${kind} export requests. Please try again later.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      },
    );
  }

  const blog = await db.blog.findFirst({
    where: {
      id: blogId,
      OR: [
        { status: "published" },
        ...(viewerId ? [{ authorId: viewerId }] : []),
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      coverImage: true,
      readTime: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return {
    user: viewer
      ? { id: viewer.id, name: viewer.name, email: viewer.email }
      : null,
    blog,
  };
}
