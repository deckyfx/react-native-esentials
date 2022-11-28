// https://usehooks-ts.com/react-hook/use-countdown

import { useCallback } from 'react';

import useBoolean from './useBoolean';
import useCounter from './useCounter';
import useInterval from './useInterval';

export interface UseCountdownType {
  seconds: number;
  interval: number;
  isIncrement?: boolean;
}

export interface CountdownHelpers {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

// New interface IN & OUT
export interface CountdownOption {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
}

export interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}

const useCountdown = (
  countdownOption: UseCountdownType | CountdownOption,
): [number, CountdownHelpers | CountdownControllers] => {
  /**
   * Use to determine the the API call is a deprecated version.
   */
  let isDeprecated = false;

  let countStart, intervalMs, isIncrement: boolean | undefined, countStop: number | undefined;

  if ('seconds' in countdownOption) {
    console.warn(
      '[useCountdown:DEPRECATED] new interface is already available (see https://usehooks-ts.com/react-hook/use-countdown), the old version will retire on usehooks-ts@3.',
    );

    isDeprecated = true;
    countStart = countdownOption.seconds;
    intervalMs = countdownOption.interval;
    isIncrement = countdownOption.isIncrement;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ({ countStart, intervalMs, isIncrement, countStop } = countdownOption);
  }

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
  const [isCountdownRunning, startCountdown, stopCountdown] = useBoolean(false);

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return isDeprecated
    ? [
        count,
        {
          start: startCountdown,
          stop: stopCountdown,
          reset: resetCountdown,
        } as CountdownHelpers,
      ]
    : [
        count,
        {
          startCountdown,
          stopCountdown,
          resetCountdown,
        } as CountdownControllers,
      ];
};

export default useCountdown;
