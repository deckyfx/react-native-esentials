// https://usehooks-ts.com/react-hook/use-interval

import { useState, useEffect, useRef, useCallback } from 'react';

export type UseIntervalOutput = { isRunning: boolean; start: (delay?: number) => void; stop: () => void };

const useInterval = (callback: () => void, delay: number | null, autostart = false): UseIntervalOutput => {
  const savedCallback = useRef(callback);

  const intervalId: React.MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  const [isRunning, setIsRunning] = useState(autostart);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const start = useCallback(
    (_delay?: number): void => {
      if (_delay && typeof _delay === 'number') {
        delay = _delay;
      }
      // Don't schedule if no delay is specified.
      // Note: 0 is a valid value for delay.
      if (!delay && delay !== 0) {
        stop();
        return;
      }
      // if already executing, clear previous task
      if (intervalId.current) {
        clearTimeout(intervalId.current);
      }
      setIsRunning(true);
      intervalId.current = setInterval(() => savedCallback.current(), delay);
    },
    [callback],
  );

  const stop = useCallback((): void => {
    if (intervalId.current) {
      setIsRunning(false);
      clearTimeout(intervalId.current);
    }
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (autostart) {
      start();
    }

    return () => stop();
  }, [delay]);

  return { isRunning, start, stop };
};

export default useInterval;
