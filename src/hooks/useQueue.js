// https://usehooks-ts.com/react-hook/use-map

import { useCallback, useState } from "react";

import Queue from "../queues/queue";

const useQueue = (initialState = new Queue()) => {
  const [queue, setQueue] = useState(new Queue(initialState));

  const actions = {
    enqueue: useCallback((value) => {
      queue.enqueue(value);
      setQueue(new Queue(queue));
    }, []),

    dequeue: useCallback(() => {
      queue.dequeue();
      console.log(queue);
      setQueue(new Queue(queue));
    }, []),

    clear: useCallback(() => {
      setQueue(new Queue());
    }, []),
  };

  return [queue, actions];
};

export default useQueue;
