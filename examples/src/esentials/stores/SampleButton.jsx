import React from 'react';

import { S } from '../MyStore';

import { joinClasses } from '../Helper';

const SampleButton = ({}) => {
  const modifyValue = () => {
    S.modifySampleState();
  };

  return (
    <div>
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
        onClick={modifyValue}
      >
        Modify Value
      </button>
    </div>
  );
};

export default SampleButton;
