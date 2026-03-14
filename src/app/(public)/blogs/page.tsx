"use client";

import { useBlogs } from "@/hooks/use-blogs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, Plus, Clock3 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AppContainer } from "@/components/layout/app-container";

export default function BlogsPage() {
  const { blogs, loading, error, deleteBlog } = useBlogs();

  if (loading) {
    return (
      <AppContainer className="py-8 sm:py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="border-border/80 bg-card/70 shadow-sm"
              >
                <CardHeader className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer className="py-10">
        <Card className="mx-auto max-w-xl border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle>Unable to load blogs</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </AppContainer>
    );
  }

  return (
    <AppContainer className="space-y-6 py-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Your blogs</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage your posts in one place.
          </p>
        </div>
        <Link href="/editor" className="w-full sm:w-auto">
          <Button className="h-10 w-full gap-2 sm:w-auto">
            <Plus className="size-4" />
            New blog
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <Card className="border-dashed border-border/80 bg-card/60">
          <CardContent className="py-14 text-center">
            <h3 className="text-lg font-medium">No blogs yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Create your first post to start building your writing archive.
            </p>
            <Link href="/editor">
              <Button className="mt-6">Create your first blog</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="flex h-full flex-col border-border/80 bg-card/70 shadow-sm"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <CardTitle className="line-clamp-2 text-lg font-semibold tracking-tight">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="truncate text-xs">
                      /{blog.slug}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="shrink-0"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/editor/${blog.id}`} className="gap-2">
                          <Edit className="size-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/blogs/${blog.slug}`} className="gap-2">
                          <Eye className="size-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2 text-destructive focus:text-destructive"
                        onClick={() => deleteBlog(blog.id)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {blog.description || "No description added yet."}
                </p>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5" />
                  Updated{" "}
                  {formatDistanceToNow(new Date(blog.updatedAt), {
                    addSuffix: true,
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/editor/${blog.id}`} className="flex-1">
                    <Button variant="outline" className="w-full gap-2">
                      <Edit className="size-4" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/blogs/${blog.slug}`} className="flex-1">
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
