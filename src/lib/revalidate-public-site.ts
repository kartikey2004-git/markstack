const REVALIDATE_URL = "https://kartikcodes.vercel.app/api/revalidate";

export async function revalidatePublicBlogCache() {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;

  try {
    await fetch(REVALIDATE_URL, {
      method: "POST",
      headers: {
        "x-revalidate-secret": secret,
      },
    });
  } catch (error) {
    console.error("Failed to revalidate public blog cache:", error);
  }
}
