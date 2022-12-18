import { useCallback, useEffect, useState } from 'react';

export interface UseAsyncOutput<T> {
  error: Error | null;
  pending: boolean;
  value: T | null;
  execute: () => void;
}

const useAsync = <T>(asyncFunction: (...args: any[]) => Promise<T>, immediate = false): UseAsyncOutput<T> => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // useCallback ensures useEffect is not called on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setError(null);
    setPending(true);
    setValue(null);

    return asyncFunction()
      .then((response) => setValue(response))
      .catch((err) => setError(err))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    error,
    pending,
    value,
    execute,
  };
};

export default useAsync;
