import { useCallback, useEffect, useState } from 'react';

import QueuePromise from '../queues/queue-promise';

// Public interface
export interface QueuePromiseActions {
  addTask: (task: (...args: any[]) => any) => void;
  start: () => void;
  stop: () => void;
}

export interface QueuePromiseCallbacks {
  onStart?: () => void;
  onStop?: () => void;
  onEnd?: () => void;
  onExecuting?: (id: number) => void;
  onResolved?: (id: number, value: unknown) => void;
  onRejected?: (id: number, error: Error) => void;
  onDequeued?: (id: number) => void;
}

const useQueuePromise = (
  queuepromise = new QueuePromise(),
  callback: QueuePromiseCallbacks = {},
): [QueuePromise, number, QueuePromiseActions] => {
  const [qp, setQp] = useState(queuepromise);

  const actions: QueuePromiseActions = {
    addTask: useCallback((task) => {
      qp.enqueue(task);
      setQp(new QueuePromise(qp));
    }, []),
    start: useCallback(() => {
      qp.start();
      setQp(new QueuePromise(qp));
    }, []),
    stop: useCallback(() => {
      qp.stop();
      setQp(new QueuePromise(qp));
    }, []),
  };

  useEffect(() => {
    if (!(queuepromise instanceof QueuePromise)) {
      return;
    }
    if (callback.onStart) {
      queuepromise.setOnStart(callback.onStart);
    }
    if (callback.onStop) {
      queuepromise.setOnStop(callback.onStop);
    }
    if (callback.onEnd) {
      queuepromise.setOnEnd(callback.onEnd);
    }
    if (callback.onExecuting) {
      queuepromise.setOnExecuting(callback.onExecuting);
    }
    if (callback.onResolved) {
      queuepromise.setOnResolved(callback.onResolved);
    }
    if (callback.onRejected) {
      queuepromise.setOnRejected(callback.onRejected);
    }
    if (callback.onDequeued) {
      queuepromise.setOnDequeued(callback.onDequeued);
    }
    queuepromise.start();
  }, []);

  return [qp, qp.state, actions];
};

export default useQueuePromise;
