// Simmilar to useDebouce but its Throtled

import {useEffect, useState, useRef} from 'react';

export default useDebounce = (value, delay = 0) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

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
