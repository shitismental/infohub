import { MEDIA_URL } from "@env";

export const getMediaUrl = (path) => {
  if (!path) return "";

  if (process.env.NODE_ENV === "development") {
    return path.startsWith("http") ? path : `${MEDIA_URL}${path}`;
  }

  if (path.startsWith(MEDIA_URL)) {
    return path.replace(MEDIA_URL, "");
  }

  return path;
};