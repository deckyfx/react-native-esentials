import { useCallback, useState } from 'react';

import Queue, { ResolvedQueueItem } from '../queues/queue';

// Public interface
export interface QueueActions<T> {
  enqueue: (value: T) => void;
  dequeue: () => ResolvedQueueItem<T> | undefined;
  clear: () => void;
}

const useQueue = <T>(initialState = new Queue<T>()): [Queue<T>, QueueActions<T>] => {
  const [queue, setQueue] = useState(new Queue<T>(initialState));

  const actions: QueueActions<T> = {
    enqueue: useCallback((value) => {
      queue.enqueue(value);
      setQueue(new Queue(queue));
    }, []),

    dequeue: useCallback(() => {
      const element = queue.dequeue();
      setQueue(new Queue(queue));
      return element;
    }, []),

    clear: useCallback(() => {
      setQueue(new Queue());
    }, []),
  };

  return [queue, actions];
};

export default useQueue;
