import db from "@/lib/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Clock3, User } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AppContainer } from "@/components/layout/app-container";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await db.blog.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <AppContainer className="space-y-6 pt-20 pb-8 sm:pt-24 sm:pb-10">
      <div className="space-y-1">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Blogs</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Read published articles from MarkStack writers.
          </p>
        </div>
      </div>

      {blogs.length === 0 ? (
        <Card className="border-dashed border-border/80 bg-card/60">
          <CardContent className="py-14 text-center">
            <h3 className="text-lg font-medium">No published blogs yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Check back soon for new articles.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="flex h-full flex-col border-border/80 bg-card/70 shadow-sm card-hover"
            >
              <CardHeader className="space-y-3">
                <div className="min-w-0 space-y-1">
                  <CardTitle className="line-clamp-2 text-lg font-semibold tracking-tight">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="truncate text-xs">
                    /{blog.slug}
                  </CardDescription>
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {blog.description || "No description added yet."}
                </p>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="size-3.5" />
                  {blog.author.name || blog.author.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5" />
                  Updated{" "}
                  {formatDistanceToNow(new Date(blog.updatedAt), {
                    addSuffix: true,
                  })}
                </div>
                <div>
                  <Link href={`/blogs/${blog.slug}`}>
                    <Button className="w-full gap-2">
                      <Eye className="size-4" />
                      View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppContainer>
  );
}
