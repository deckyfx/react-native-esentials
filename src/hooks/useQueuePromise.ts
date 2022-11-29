import { useCallback, useEffect, useState, useRef } from 'react';

import QueuePromise from '../queues/queue-promise';

// Public interface
export interface QueuePromiseActions {
  addTask: (task: (...args: any[]) => any) => void;
  start: () => void;
  stop: () => void;
}

export interface QueuePromiseCallbacks {
  onStart?: (qp: QueuePromise) => void;
  onStop?: (qp: QueuePromise) => void;
  onEnd?: (qp: QueuePromise) => void;
  onExecuting?: (qp: QueuePromise, id: number) => void;
  onResolved?: (qp: QueuePromise, id: number, value: unknown) => void;
  onRejected?: (qp: QueuePromise, id: number, error: Error) => void;
  onDequeued?: (qp: QueuePromise, id: number) => void;
}

const useQueuePromise = (
  queuepromise: QueuePromise | null | undefined = new QueuePromise(),
  callback: QueuePromiseCallbacks = {},
): [QueuePromise, number, QueuePromiseActions] => {
  queuepromise = queuepromise ? queuepromise : new QueuePromise();
  const [qp, setQp] = useState(queuepromise);

  const [qpstate, setQpstate] = useState(queuepromise.state);

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
    if (!queuepromise || queuepromise instanceof QueuePromise == false) {
      console.log(queuepromise);
      return;
    }
    queuepromise.setOnStart(() => {
      setQpstate(qp.state);
      if (callback.onStart) {
        callback.onStart(qp);
      }
    });
    queuepromise.setOnStop(() => {
      setQpstate(qp.state);
      if (callback.onStop) {
        callback.onStop(qp);
      }
    });
    queuepromise.setOnEnd(() => {
      setQpstate(qp.state);
      if (callback.onEnd) {
        callback.onEnd(qp);
      }
    });
    queuepromise.setOnExecuting((id) => {
      if (callback.onExecuting) {
        callback.onExecuting(qp, id);
      }
    });
    queuepromise.setOnResolved((id, value) => {
      if (callback.onResolved) {
        callback.onResolved(qp, id, value);
      }
    });
    queuepromise.setOnRejected((id, error) => {
      if (callback.onRejected) {
        callback.onRejected(qp, id, error);
      }
    });
    queuepromise.setOnDequeued((id) => {
      if (callback.onDequeued) {
        callback.onDequeued(qp, id);
      }
    });
    queuepromise.start();
  }, []);

  return [qp, qpstate, actions];
};

export default useQueuePromise;
