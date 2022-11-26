// Simmiliar to useDebounce but instead waiting to set a value, its waiting to do an action
// Simmiliar result can be achieved by using useDebounce + useEffect, this is just a shorthand

import {useEffect} from 'react';

export const useDebouncedEffect = (action, deps, delay = 0) => {
  useEffect(() => {
    const handler = setTimeout(() => action(), delay || 500);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};
