import React, { useRef } from 'react';

import SampleDisplay from './SampleDisplay';

import { joinClasses } from '../Helper';

const UseTimeoutSample = ({}) => {
  const display = useRef(null);

  const getDisplay = () => {
    return display.current;
  };

  const toggle = () => {
    getDisplay()?.toggle();
  };

  return (
    <div className="flex space-x-4 items-center ">
      <div>Executing timeouted callback</div>
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
        onClick={toggle}
      >
        Toggle state after 1 second
      </button>
      <SampleDisplay ref={display} />
    </div>
  );
};

export default UseTimeoutSample;
