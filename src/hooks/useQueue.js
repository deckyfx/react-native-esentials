// https://usehooks-ts.com/react-hook/use-map

import {useCallback, useState} from 'react';

import Queue from '../queues/queue';

export default useQueue = (initialState = new Queue()) => {
  const [queue, setQueue] = useState(new Queue(initialState));

  const actions = {
    enqueue: useCallback((value) => {
      setQueue((prev) => {
        const copy = new Queue(prev);
        copy.enqueue(value);
        return copy;
      });
    }, []),

    dequeue: useCallback((entries) => {
      setQueue((prev) => {
        const copy = new Queue(prev);
        copy.dequeue(value);
        return copy;
      });
    }, []),

    clear: useCallback((key) => {
      setQueue(new Queue());
    }, []),
  };

  return [queue, actions];
};

useMap;
