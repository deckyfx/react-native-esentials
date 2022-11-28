// Simmilar to useDebouce but its Throtled

import { useEffect, useState, useRef } from 'react';

const useThrotle = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const shouldWait = useRef(false);

  useEffect(() => {
    if (shouldWait.current) {
      return;
    }
    shouldWait.current = true;
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      shouldWait.current = false;
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useThrotle;
