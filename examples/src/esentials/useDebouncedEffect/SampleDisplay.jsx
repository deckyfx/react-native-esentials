import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

import { useDebouncedEffect } from '@decky.fx/react-native-essentials';

const SampleDisplay = ({}, ref) => {
  const [triggered, setTriggered] = useState(0);
  const [isshowing, setIsShowing] = useState(false);

  const show = () => {
    setTriggered(new Date().getTime());
  };

  useEffect(() => {
    if (triggered > 0) {
      setIsShowing(true);
    }
  }, [triggered]);

  useDebouncedEffect(() => {
    if (triggered > 0) {
      setTimeout(() => {
        setIsShowing(false);
      }, 500);
    }
  }, [triggered]);

  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <div>
      <span>{isshowing ? `${triggered} Dissapear after 500ms` : ''}</span>
    </div>
  );
};

export default forwardRef(SampleDisplay);
