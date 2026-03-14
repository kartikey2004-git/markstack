import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { MDXContent } from "@/components/shared/mdx-content";
import db from "@/lib/database";
import { toggleBlogPublishForAuthor } from "@/lib/blogs/toggle-publish";
import { getCurrentUser, requireAuth } from "@/lib/auth-utils";
import { serializeMDX } from "@/lib/markdown/mdx-renderer";
import { calculateReadTime } from "@/lib/markdown/read-time";
import { revalidatePath } from "next/cache";
import type { SerializedMdx } from "@/lib/markdown/mdx-renderer";

function isSerializedMdx(value: unknown): value is SerializedMdx {
  return (
    typeof value === "object" &&
    value !== null &&
    "compiledSource" in value &&
    typeof (value as { compiledSource?: unknown }).compiledSource === "string"
  );
}

async function getBlogPost(slug: string, authorId?: string) {
  const blog = await db.blog.findFirst({
    where: {
      slug,
      ...(authorId ? {} : { published: true }),
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // If blog is not published, only show it to the author
  if (blog && !blog.published && blog.authorId !== authorId) {
    return null;
  }

  return blog;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const currentUser = await getCurrentUser();

  const post = await getBlogPost(slug, currentUser?.id);

  if (!post) {
    notFound();
  }

  const postId = post.id;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const readingTime = post.readTime ?? calculateReadTime(post.content);
  const renderedContent = isSerializedMdx(post.htmlContent)
    ? post.htmlContent
    : await serializeMDX(post.content);

  async function togglePublishAction() {
    "use server";

    const user = await requireAuth(`/blogs/${slug}`);
    const updatedBlog = await toggleBlogPublishForAuthor(postId, user.id);

    if (!updatedBlog) {
      redirect(`/blogs/${slug}`);
    }

    revalidatePath(`/blogs/${slug}`);
    revalidatePath("/blogs");
    revalidatePath("/editor");
    redirect(`/blogs/${slug}`);
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Blog Header */}
        <header className="mb-12 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                Blog Post
              </Badge>
              {!post.published && (
                <Badge variant="outline" className="text-xs">
                  Draft
                </Badge>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {readingTime} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {post.description}
              </p>
            )}

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author.name || post.author.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt.toString())}</span>
              </div>
              {post.updatedAt !== post.createdAt && (
                <div className="flex items-center gap-1">
                  <span>Updated </span>
                  <span>{formatDate(post.updatedAt.toString())}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />
        </header>

        {/* Blog Content */}
        <main className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-base prose-code:font-mono prose-pre:bg-muted prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-img:rounded-lg prose-img:shadow-lg">
          <MDXContent content={renderedContent} />
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground mb-2">
                Enjoyed this post? Share it with others!
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              {currentUser && currentUser.id === post.authorId && (
                <>
                  <form action={togglePublishAction}>
                    <Button
                      type="submit"
                      variant={post.published ? "outline" : "default"}
                      size="sm"
                      className="gap-2"
                    >
                      {post.published ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Publish
                        </>
                      )}
                    </Button>
                  </form>
                  <Link href={`/editor/${post.id}`}>
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Edit Post
                    </Button>
                  </Link>
                </>
              )}
              <Link href="/editor">
                <Button className="gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Write New Post
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
