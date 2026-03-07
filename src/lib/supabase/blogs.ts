import { createServerClient } from "./server";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  html_content: any;
  slug: string;
  created_at: string;
  updated_at: string;
}

export async function createBlog(data: {
  title: string;
  description: string;
  content: string;
  html_content: any;
  slug: string;
}): Promise<BlogPost | null> {
  try {
    const supabase = createServerClient();

    const { data: blog, error } = await supabase
      .from("blogs")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog:", error);
      return null;
    }

    return blog;
  } catch (error) {
    console.error("Error creating blog:", error);
    return null;
  }
}

export async function getBlogs(): Promise<
  Omit<BlogPost, "content" | "html_content">[]
> {
  try {
    const supabase = createServerClient();

    const { data: blogs, error } = await supabase
      .from("blogs")
      .select("id, title, description, slug, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }

    return blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createServerClient();

    const { data: blog, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching blog by slug:", error);
      return null;
    }

    return blog;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}
