import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth-utils";

export default async function NewCanvasLayout({ children }: { children: ReactNode }) {
  await requireAuth("/canvas/new");
  return children;
}
