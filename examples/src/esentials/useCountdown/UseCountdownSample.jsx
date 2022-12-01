import { useState } from 'react';

import { useCountdown, TimerUtil } from '@decky.fx/react-native-essentials';

import { joinClasses } from '../Helper';

export default function UseCountdownSample() {
  const [intervalValue, setIntervalValue] = useState(1000);

  const [count, iscounting, { start, stop, reset }] = useCountdown(
    {
      countStart: 5,
      intervalMs: intervalValue,
      isIncrement: false,
      countStop: 0,
    },
    () => {
      console.log('Ended');
    },
  );

  const handleChangeIntervalValue = (event) => {
    setIntervalValue(Number(event.target.value));
  };
  return (
    <div className="flex space-x-4 items-center ">
      <div>Count down / Count up</div>
      <input
        className={joinClasses([
          'shadow',
          'appearance-none',
          'border',
          'rounded',
          'w-full',
          'py-2',
          'px-3',
          'text-gray-700',
          'leading-tight',
          'focus:outline-none',
          'focus:shadow-outline',
          'w-40',
        ])}
        type="number"
        value={intervalValue}
        onChange={handleChangeIntervalValue}
        placeholder="Interval in ms"
      />
      <br />
      <button
        className={joinClasses([
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'shadow-sm',
        ])}
        onClick={start}
      >
        start
      </button>
      <br />
      <button
        className={joinClasses([
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'shadow-sm',
        ])}
        onClick={stop}
      >
        stop
      </button>
      <br />
      <button
        className={joinClasses([
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'shadow-sm',
        ])}
        onClick={reset}
      >
        reset
      </button>
      <div>{iscounting ? `Counting ${count}` : ''}</div>
    </div>
  );
}
