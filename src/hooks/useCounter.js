// https://usehooks-ts.com/react-hook/use-counter

import {useState} from 'react';

export default useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);
  const reset = () => setCount(initialValue || 0);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
};
