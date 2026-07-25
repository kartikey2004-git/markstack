const REVALIDATE_URLS = [
  "https://kartikeycodes.tech/api/revalidate",
  "https://kartikcodes.vercel.app/api/revalidate",
];

export async function revalidatePublicBlogCache() {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;

  await Promise.all(
    REVALIDATE_URLS.map(async (url) => {
      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "x-revalidate-secret": secret,
          },
        });
      } catch (error) {
        console.error(`Failed to revalidate public blog cache at ${url}:`, error);
      }
    })
  );
}
