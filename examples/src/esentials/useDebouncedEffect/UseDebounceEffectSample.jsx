import React, { useRef } from 'react';

import SampleDisplay from './SampleDisplay';

import { joinClasses } from '../Helper';

const UseDebounceEffectSample = ({}) => {
  const display = useRef(null);

  const getDisplay = () => {
    return display.current;
  };

  const showThenFadeout = () => {
    getDisplay()?.show();
  };

  return (
    <div className="flex space-x-4 items-center ">
      <div>Debouncing useEffect callback</div>
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
        onClick={showThenFadeout}
      >
        Show then Fade Out After 500ms
      </button>
      <SampleDisplay ref={display} />
    </div>
  );
};

export default UseDebounceEffectSample;
