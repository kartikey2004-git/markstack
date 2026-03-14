import { requireAuth } from "@/lib/auth-utils";
import { EditorWrapper } from "@/components/editor/editor-wrapper";

export default async function EditorPage() {
  await requireAuth("/editor");

  return <EditorWrapper />;
}
