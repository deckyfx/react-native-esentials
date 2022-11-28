// Simmiliar to useDebounce but instead waiting to set a value, its waiting to do an action
// Simmiliar result can be achieved by using useDebounce + useEffect, this is just a shorthand

import { EffectCallback, useEffect } from 'react';

const useDebouncedEffect = (action: EffectCallback, deps: never[], delay = 0): void => {
  useEffect(() => {
    const handler = setTimeout(() => action(), delay || 500);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};

export default useDebouncedEffect;
