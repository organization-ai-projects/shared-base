import { useEffect, useState } from 'react';

export function useFetch<T>(url: string, options?: RequestInit): [T | null, boolean, Error | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error];
}
