export interface Blog {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  content: string;
  htmlContent?: unknown | null;
  readTime?: number | null;
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type BlogSummary = Omit<Blog, "content" | "htmlContent" | "readTime">;

export interface BlogMutationPayload {
  title: string;
  slug: string;
  content: string;
  description?: string;
  published?: boolean;
}

export interface BlogDraft {
  title: string;
  description: string;
  content: string;
  savedAt: string;
}
