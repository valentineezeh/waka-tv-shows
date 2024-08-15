export const truncate = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length - 3) + "...";
  }
  return text;
};

export const stripTags = (str) => {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "");
};

export const fetchFromAPI = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
};

export const cacheData = (data, CACHE_KEY) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

export const getCachedData = (key) => {
  const cachedData = localStorage.getItem(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

export const isCacheExpired = (timestamp, expiredTime) => {
  const now = Date.now();
  return now - timestamp > expiredTime;
};

export const defaultImg =
  "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg";
