"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { Blog, BlogSummary } from "@/types/blog";
import { jsonRequestInit, requestJson, requestOk } from "@/lib/api/client";

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await requestJson<{ blogs?: BlogSummary[] }>(
        "/api/blogs",
        undefined,
        {
          fallback: "Failed to fetch blogs",
          unauthorized: "Please sign in to view your blogs",
        },
      );
      setBlogs((data.blogs || []) as BlogSummary[]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch blogs";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBlog = useCallback(async (id: string): Promise<Blog | null> => {
    try {
      return await requestJson<Blog>(`/api/blogs/${id}`, undefined, {
        fallback: "Failed to fetch blog",
        unauthorized: "Please sign in to view this blog",
        notFound: "Blog not found",
      });
    } catch (error) {
      console.error("Error fetching blog:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch blog";
      toast.error(errorMessage);
      return null;
    }
  }, []);

  const deleteBlog = useCallback(async (id: string): Promise<boolean> => {
    try {
      await requestOk(`/api/blogs/${id}`, { method: "DELETE" }, {
        fallback: "Failed to delete blog",
        unauthorized: "Please sign in to delete this blog",
        notFound: "Blog not found",
      });

      // Remove from local state
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting blog:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete blog";
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const updateBlogStatus = useCallback(
    async (id: string, status: "draft" | "published"): Promise<boolean> => {
      try {
        await requestOk(
          `/api/blogs/${id}`,
          jsonRequestInit("PATCH", { status }),
          {
            fallback: "Failed to update blog status",
            unauthorized: "Please sign in to update this blog",
            notFound: "Blog not found",
          },
        );

        // Update local state
        setBlogs((prev) =>
          prev.map((blog) => (blog.id === id ? { ...blog, status } : blog)),
        );

        const action = status === "published" ? "published" : "unpublished";
        toast.success(`Blog ${action} successfully`);
        return true;
      } catch (error) {
        console.error("Error updating blog status:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to update blog status";
        toast.error(errorMessage);
        return false;
      }
    },
    [],
  );

  const publishBlog = useCallback(
    async (id: string): Promise<boolean> => {
      return updateBlogStatus(id, "published");
    },
    [updateBlogStatus],
  );

  const unpublishBlog = useCallback(
    async (id: string): Promise<boolean> => {
      return updateBlogStatus(id, "draft");
    },
    [updateBlogStatus],
  );

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    fetchBlog,
    deleteBlog,
    publishBlog,
    unpublishBlog,
    refetch: fetchBlogs,
  };
}
