import React, { forwardRef, useImperativeHandle } from 'react';

import { useBoolean, useTimeout } from '@decky.fx/react-native-essentials';

const SampleDisplay = ({}, ref) => {
  const { value: isshown, toggle: toggleIsShown } = useBoolean(false);

  const [toggle] = useTimeout(toggleIsShown, 1000, false);

  useImperativeHandle(ref, () => ({
    toggle,
  }));

  return (
    <div>
      <span>{isshown ? `Show Text` : ''}</span>
    </div>
  );
};

export default forwardRef(SampleDisplay);
