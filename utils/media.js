import { MEDIA_URL } from "@env";

export const getMediaUrl = (path) => {
  if (!path) return "";

  const backendPrefix = "http://152.53.18.199/media";

  // If backend returned a full absolute URL
  if (path.startsWith(backendPrefix)) {
    return path.replace(backendPrefix, MEDIA_URL); 
  }

  // Already HTTPS or external
  if (path.startsWith("https://")) return path;

  // Otherwise assume relative path
  return `${MEDIA_URL}${path}`;
};