import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth-utils";

// Server-side sign-in check: logged-out visitors go to /auth before the page renders.
export default async function CanvasesLayout({ children }: { children: ReactNode }) {
  await requireAuth("/canvases");
  return children;
}
