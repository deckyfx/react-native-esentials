import React, { useState, useCallback } from 'react';

export type UseArrayOutput<T> = {
  array: T[];
  set: React.Dispatch<React.SetStateAction<T[]>>;
  length: () => number;
  empty: () => boolean;
  at: (index: number) => T;
  add: (element: T) => void;
  push: (element: T) => void;
  clear: () => void;
  unshift: (element: T) => void;
  pop: () => void;
  shift: () => void;
  move: (from: number, to: number) => void;
  slice: (start: number | undefined, end: number | undefined) => void;
  splice: (...args: [number, number, ...T[]]) => void;
  removeAt: (index: number) => void;
  removeIf: (func: (t: T, i: number) => boolean) => void;
  setAt: (index: number, newValue: T) => void;
  map: (func: (t: T, i: number) => T) => void;
};

const useArray = <T>(initial: T[]): UseArrayOutput<T> => {
  const [array, set] = useState(initial);

  const length = useCallback(() => array.length, []);
  const empty = useCallback(() => array.length === 0, []);
  const at = useCallback((index: number) => array[index], []);
  const add = useCallback((a: T) => set((v) => [...v, a]), []);
  const push = add;
  const clear = useCallback(() => set(() => []), []);
  const unshift = useCallback((a: T) => set((v) => [...(Array.isArray(a) ? a : [a]), ...v]), []);
  const pop = useCallback(() => set((v) => v.slice(0, -1)), []);
  const shift = useCallback(() => set((v) => v.slice(1)), []);
  const slice = useCallback(
    (start: number | undefined = undefined, end: number | undefined = undefined) =>
      set((it) => {
        return it.slice(start, end);
      }),
    [],
  );
  const splice = useCallback(
    (...args: [number, number, ...T[]]) =>
      set((it) => {
        const copy = it.slice();
        const restargs = args.slice(0, 2) as T[];
        return it.splice(args[0], args[1], ...restargs);
      }),
    [],
  );
  const move = useCallback(
    (from: number, to: number) =>
      set((it) => {
        const copy = it.slice();
        copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
        return copy;
      }),
    [],
  );
  const removeAt = useCallback(
    (index: number) =>
      set((v) => {
        const copy = v.slice();
        copy.splice(index, 1);
        return copy;
      }),
    [],
  );
  const removeIf = useCallback((func: (t: T, i: number) => boolean) => {
    set((v) => {
      const copy = v.slice();
      return copy.filter(func);
    });
  }, []);
  const setAt = useCallback(
    (index: number, newValue: T) =>
      set((v) => {
        const copy = v.slice();
        copy.splice(index, 0, newValue);
        return copy;
      }),
    [],
  );
  const map = useCallback(
    (func: (t: T, i: number) => T) =>
      set((v) => {
        const copy = v.slice();
        return copy.map(func);
      }),
    [],
  );

  return {
    array,
    set,
    length,
    empty,
    at,
    add,
    push,
    clear,
    unshift,
    pop,
    shift,
    move,
    slice,
    splice,
    removeAt,
    removeIf,
    setAt,
    map,
  };
};

export default useArray;
