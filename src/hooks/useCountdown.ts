// https://usehooks-ts.com/react-hook/use-countdown

import { useCallback, useEffect, useRef } from 'react';

import useBoolean from './useBoolean';
import useCounter from './useCounter';
import useInterval from './useInterval';

// New interface IN & OUT
export interface CountdownOption {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
}

export interface CountdownControllers {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const useCountdown = (
  countdownOption: CountdownOption,
  callback: () => void | null | undefined,
): [number, boolean, CountdownControllers] => {
  const savedCallback = useRef(callback);

  let countStart: number | undefined;
  let intervalMs: number | undefined;
  let isIncrement: boolean | undefined;
  let countStop: number | undefined;
  ({ countStart, intervalMs, isIncrement, countStop } = countdownOption);

  // default values
  intervalMs = intervalMs ?? 1000;
  isIncrement = isIncrement ?? false;
  countStop = countStop ?? 0;

  const [count, increment, decrement, resetCounter] = useCounter(countStart);

  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */

  const [isCountdownRunning, _, start, stop] = useBoolean(false);

  /**
   * Will set running false and reset the seconds to initial value
   */
  const reset = () => {
    stop();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (isIncrement && count === countStop! - 1) {
      if (savedCallback.current) {
        savedCallback.current();
      }
    } else if (!isIncrement && count === countStop! + 1) {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (count === countStop) {
      stop();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stop, callback]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null, true);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  return [
    count,
    isCountdownRunning,
    {
      start,
      stop,
      reset,
    } as CountdownControllers,
  ];
};

export default useCountdown;
