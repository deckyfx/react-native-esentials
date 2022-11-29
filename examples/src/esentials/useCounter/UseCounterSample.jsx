import React, { useRef } from 'react';

import { useCounter } from '@decky.fx/react-native-essentials';

import { joinClasses } from '../Helper';

const UseCounterSample = ({}) => {
  const [counter, increment, decrement, reset] = useCounter(0);

  return (
    <div className="flex space-x-4 items-center ">
      <div>Counting made easy</div>
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
        onClick={increment}
      >
        Increase
      </button>
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
        onClick={decrement}
      >
        Decrease
      </button>
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
        Reset
      </button>
      <div>{counter}</div>
    </div>
  );
};

export default UseCounterSample;
