import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth-utils";

export default async function CanvasLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAuth(`/canvas/${id}`);
  return children;
}
