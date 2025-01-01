import { useEffect, useState } from 'react';

interface ErrorResponse {
  error: string;
}

export function useFetch<T>(url: string, options?: RequestInit): [T | null, boolean, Error | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          const errorData = (await response.json()) as ErrorResponse;
          throw new Error(`${errorData.error} (Status: ${response.status})`);
        }
        return response.json();
      })
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url, options]);

  return [data, loading, error];
}
