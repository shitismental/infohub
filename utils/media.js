const MEDIA_URL = process.env.MEDIA_URL

export const getMediaUrl = (path) => {
  if (!path) return "";
  if (process.env.NODE_ENV === "development") return path;
  return path.replace("https://152.53.18.199/media", MEDIA_URL);
};