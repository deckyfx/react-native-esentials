// https://usehooks-ts.com/react-hook/use-timeout

import React, { useEffect, useRef, useCallback } from 'react';

export type UseTimeoutOutput = [execute: (delay?: number) => void];

const useTimeout = (callback: () => void, delay: number | null, autostart = true): UseTimeoutOutput => {
  const savedCallback = useRef(callback);

  const timeoutId: React.MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const execute = useCallback(
    (_delay?: number) => {
      if (_delay && typeof _delay === 'number') {
        delay = _delay;
      }
      // Don't schedule if no delay is specified.
      // Note: 0 is a valid value for delay.
      if (!delay && delay !== 0) {
        return;
      }
      // if already executing, clear previous task
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => savedCallback.current(), delay);
    },
    [callback],
  );

  // Set up the timeout.
  useEffect(() => {
    if (autostart) {
      execute();
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [delay]);

  return [execute];
};

export default useTimeout;
