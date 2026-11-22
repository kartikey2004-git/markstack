import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth-utils";

export default async function DashboardBlogsLayout({ children }: { children: ReactNode }) {
  await requireAuth("/dashboard/blogs");
  return children;
}
