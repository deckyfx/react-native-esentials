import React, { useState, forwardRef, useImperativeHandle } from 'react';

import { useDebouncedEffect } from '@decky.fx/react-native-essentials';

const SampleDisplay = ({}, ref) => {
  const [triggered, setTriggered] = useState(0);

  const show = () => {
    setTriggered(new Date().getTime());
  };

  // if triggered value changed, set it to 0 after 500 ms
  useDebouncedEffect(
    () => {
      if (triggered > 0) {
        setTriggered(0);
      }
    },
    [triggered],
    1000,
  );

  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <div>
      <span>{triggered > 0 ? `${triggered} Dissapear after 1 second` : ''}</span>
    </div>
  );
};

export default forwardRef(SampleDisplay);
