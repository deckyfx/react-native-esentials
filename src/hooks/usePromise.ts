// https://stackoverflow.com/questions/50500524/promise-fetch-returning-promisevoid-t-instead-of-expected-object

import { useCallback, useEffect, useState } from 'react';

export enum UsePromiseState {
  IDLE = 0,
  RUNNING = 1,
  SUCCESS = 2,
  FAILED = -1,
}

const usePromise = <T>(
  task: () => Promise<T>,
): { status: UsePromiseState; result: T | null | undefined; error: Error | null | undefined; run: () => void } => {
  const [state, setState] = useState<{
    status: UsePromiseState;
    result: T | undefined | null;
    error: Error | undefined | null;
  }>({
    status: UsePromiseState.IDLE,
    result: null,
    error: null,
  });

  const run = useCallback(() => {
    Promise.resolve(true)
      .then(() => {
        setState({
          status: UsePromiseState.RUNNING,
          result: null,
          error: null,
        });
        return task();
      })
      .then((result: T) => {
        setState({
          status: UsePromiseState.SUCCESS,
          result,
          error: null,
        });
        return Promise<void>;
      })
      .catch((error: Error) => {
        setState({
          status: UsePromiseState.FAILED,
          result: null,
          error,
        });
      })
      .finally(() => {
        setState((prev) => {
          return {
            ...prev,
            status: UsePromiseState.IDLE,
          };
        });
      });
  }, [task]);

  return { status: state.status, result: state.result, error: state.error, run };
};

export default usePromise;
