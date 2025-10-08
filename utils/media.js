import { MEDIA_URL } from "@env";

export const getMediaUrl = (path) => {
  if (!path) return "";

  // If backend gave absolute URL with IP
  if (path.startsWith("http://152.53.18.199/media")) {
    // In dev, keep original
    if (process.env.NODE_ENV === "development") {
      return path;
    }
    // In prod, strip the IP and use proxy
    return path.replace("http://152.53.18.199/media", MEDIA_URL);
  }

  // Already HTTPS (external URL) → leave as is
  if (path.startsWith("https://")) return path;

  // Otherwise relative path
  return `${MEDIA_URL}${path}`;
};
