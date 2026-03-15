import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MDXContent } from "@/components/shared/mdx-content";
import { BlogShareButtons } from "@/components/shared/blog-share-buttons";
import db from "@/lib/database";
import { getCurrentUser } from "@/lib/auth-utils";
import { serializeMDX } from "@/lib/markdown/mdx-renderer";
import { calculateReadTime } from "@/lib/markdown/read-time";
import { AppContainer } from "@/components/layout/app-container";

async function getBlogPost(slug: string, authorId?: string) {
  const blog = await db.blog.findFirst({
    where: {
      slug,
      OR: [
        { published: true },
        ...(authorId ? [{ authorId, published: false }] : []),
      ],
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const readingTime = post.readTime ?? calculateReadTime(post.content);
  // Always re-serialize from raw markdown so the compiled output always uses
  // the production JSX runtime (development: false), regardless of what may
  // be stored in the DB htmlContent column.
  const renderedContent = await serializeMDX(post.content);

  return (
    <div className="bg-background">
      <AppContainer className="max-w-4xl py-8 sm:py-12">
        {/* Blog Header */}
        <header className="mb-10 space-y-6 sm:mb-12">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="secondary" className="rounded-md text-xs">
                Blog Post
              </Badge>
              <div className="flex items-center rounded-md border bg-muted/40 px-2 py-1 text-xs text-muted-foreground sm:text-sm">
                <Clock className="mr-1 size-3.5" />
                {readingTime} min read
              </div>
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {post.title}
            </h1>

            {post.description && (
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {post.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground sm:gap-6">
              <div className="flex items-center gap-1">
                <User className="size-4" />
                <span>{post.author.name || post.author.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
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
        <main className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-relaxed prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-5 prose-img:rounded-lg">
          <MDXContent content={renderedContent} />
        </main>

        {/* Footer */}
        <footer className="mt-14 border-t pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                Enjoyed this post? Share it with others!
              </p>
              <BlogShareButtons
                title={post.title}
                description={post.description}
              />
            </div>

            <div className="flex gap-2">
              <Link href="/editor">
                <Button className="gap-2">
                  <ArrowRight className="size-4" />
                  Write New Post
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </AppContainer>
    </div>
  );
}
