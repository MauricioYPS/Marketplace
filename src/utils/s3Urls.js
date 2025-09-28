import { BASE_URL } from "../store/reducers/productsSlice";
const API_BASE = BASE_URL

const cache = new Map();
const EXPIRATION_WINDOW_MS = 55 * 1000;

const isHttpUrl = (value) => /^https?:\/\//i.test(String(value || ''));

export const resolveS3Url = async (rawValue) => {
  if (!rawValue) return null;
  if (isHttpUrl(rawValue)) return rawValue;

  const cached = cache.get(rawValue);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.url;
  }

  const response = await fetch(
    `${API_BASE}/s3/presign-download?key=${encodeURIComponent(rawValue)}`
  );

  if (!response.ok) {
    let details = '';
    try {
      details = await response.text();
    } catch (error) {
      details = '';
    }
    const suffix = details && details.trim() ? ` Detalle: ${details.trim()}` : '';
    throw new Error(`No se pudo obtener la URL de descarga para ${rawValue}.${suffix}`);
  }

  const data = await response.json();
  if (!data?.url) {
    throw new Error('Respuesta invalida al solicitar la URL firmada.');
  }

  const record = {
    url: data.url,
    expiresAt: now + EXPIRATION_WINDOW_MS,
  };
  cache.set(rawValue, record);
  return record.url;
};

export const resolveManyS3Urls = async (values = []) => {
  if (!Array.isArray(values) || values.length === 0) return [];
  const results = await Promise.allSettled(values.map((value) => resolveS3Url(value)));
  return results.map((result) => (result.status === 'fulfilled' ? result.value : null));
};

export const clearExpiredS3UrlCache = () => {
  const now = Date.now();
  for (const [key, record] of cache.entries()) {
    if (!record?.expiresAt || record.expiresAt <= now) {
      cache.delete(key);
    }
  }
};
