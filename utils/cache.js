const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

export const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

export const setCachedData = (key, data) => {
  cache.set(key, { 
    data, 
    timestamp: Date.now() 
  });
};

export const clearCache = () => {
  cache.clear();
};

export const removeCachedData = (key) => {
  cache.delete(key);
};

