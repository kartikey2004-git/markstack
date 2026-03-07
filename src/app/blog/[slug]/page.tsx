import { TopNav } from "@/components/layout/top-nav";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
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
} from "lucide-react";
import Link from "next/link";
import { MDXContent } from "@/components/blog/mdx-content";

interface BlogPost {
  title: string;
  description: string;
  content: string;
  htmlContent: any;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(process.cwd(), "blogs", `${slug}.json`);
    const fileContent = await readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
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
  const post = await getBlogPost(slug);

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

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      

        {/* Blog Header */}
        <header className="mb-12 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                Blog Post
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {getReadingTime(post.content)} min read
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
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              {post.updatedAt !== post.createdAt && (
                <div className="flex items-center gap-1">
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />
        </header>

        {/* Blog Content */}
        <main className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-base prose-code:font-mono prose-pre:bg-muted prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-img:rounded-lg prose-img:shadow-lg">
          <MDXContent content={post.htmlContent} />
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

            <Link href="/editor">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Write New Post
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
