// https://github.com/amrlabib/react-timer-hook

import { useState } from 'react';

import useInterval from './useInterval';

export enum TimeFormat {
  HALF_DAY = '12-hour',
  FULL_DAY = '24-hour',
}

export enum HalfDayAMPM {
  NONE = '',
  AM = 'am',
  PM = 'pm',
}

export interface TimerUtilGetTimeOutput {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  ampm?: HalfDayAMPM;
}

export class TimerUtil {
  static getTimeFromSeconds(secs: number = 0): TimerUtilGetTimeOutput {
    const totalSeconds = Math.ceil(secs);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      seconds,
      minutes,
      hours,
      days,
    };
  }

  static getSecondsFromTimeNow(): number {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = now.getTimezoneOffset() * 60;
    return currentTimestamp / 1000 - offset;
  }

  static getFormattedTimeFromSeconds(
    totalSeconds: number = 0,
    format: TimeFormat = TimeFormat.FULL_DAY,
  ): TimerUtilGetTimeOutput {
    const { seconds: secondsValue, minutes, hours } = TimerUtil.getTimeFromSeconds(totalSeconds);
    let ampm: HalfDayAMPM = HalfDayAMPM.NONE;
    let hoursValue: number = hours!;

    if (format === TimeFormat.HALF_DAY) {
      ampm = hours! >= 12 ? HalfDayAMPM.PM : HalfDayAMPM.AM;
      hoursValue = hours! % 12;
    }

    return {
      seconds: secondsValue,
      minutes,
      hours: hoursValue,
      ampm,
    };
  }
}

const useTime = (format: TimeFormat = TimeFormat.FULL_DAY): TimerUtilGetTimeOutput => {
  const [seconds, setSeconds] = useState(TimerUtil.getSecondsFromTimeNow());

  useInterval(() => {
    setSeconds(TimerUtil.getSecondsFromTimeNow());
  }, 1000);

  return {
    ...TimerUtil.getFormattedTimeFromSeconds(seconds, format),
  };
};

export default useTime;
