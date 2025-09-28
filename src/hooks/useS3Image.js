import { useEffect, useState } from 'react';
import { resolveS3Url } from '../utils/s3Urls';

const PLACEHOLDER = 'https://placehold.co/400x400/EEE/444?text=Sin+imagen';

export const useS3Image = (rawSource) => {
  const [url, setUrl] = useState(() => {
    if (!rawSource) return null;
    return /^https?:\/\//i.test(rawSource) ? rawSource : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!rawSource) {
      setUrl(null);
      setError(null);
      return () => {
        isMounted = false;
      };
    }

    if (/^https?:\/\//i.test(rawSource)) {
      setUrl(rawSource);
      setError(null);
      return () => {
        isMounted = false;
      };
    }

    setLoading(true);
    setError(null);

    resolveS3Url(rawSource)
      .then((resolvedUrl) => {
        if (!isMounted) return;
        setUrl(resolvedUrl ?? null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err);
        setError(err);
        setUrl(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [rawSource]);

  return {
    url: url ?? null,
    loading,
    error,
    fallback: PLACEHOLDER,
  };
};
