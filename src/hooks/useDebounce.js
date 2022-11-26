// https://usehooks-ts.com/react-hook/use-debounce

import {useEffect, useState} from 'react';

export default useDebounce = (value, delay = 0) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
