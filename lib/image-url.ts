/**
 * Converts legacy image URLs to the new API-based format
 * This ensures backward compatibility with old database records
 *
 * @param url - The image URL (can be old or new format)
 * @returns The URL in the new API format
 */
export function getImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  if (url.startsWith("/api/uploads/")) {
    return url;
  }

  if (url.startsWith("/uploads/")) {
    return url.replace("/uploads/", "/api/uploads/");
  }

  return url;
}
