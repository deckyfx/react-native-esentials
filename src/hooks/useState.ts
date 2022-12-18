// https://github.com/mweststrate/use-st8

import { useMemo, useState as t } from 'react';

export type State<T> = (() => T) | ((newValue: T | ((current: T) => T)) => void);

const useState = <T>(initialValue: (() => T) | T): State<T> => {
  const [state, setState] = t(initialValue);

  return useMemo(() => {
    const command = (...args: [] | [T]) => {
      switch (args.length) {
        case 0:
          return state;
        case 1:
          return setState(args[0]!);
        default:
          throw new Error('Expected 0 or 1 arguments');
      }
    };
    return command as State<T>;
  }, [state]);
};

export default useState;
