import { useCallback, useEffect, useState } from "react";

import QueuePromise from "../queues/queue-promise";

const useQueuePromise = (queuepromise = new QueuePromise()) => {
  const [qp, setQp] = useState(queuepromise);
  const [qpstate, setState] = useState(queuepromise.state);
  const [taskId, setTaskId] = useState(0);

  const actions = {
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
    if (!queuepromise instanceof QueuePromise) {
      return;
    }
    queuepromise.setOnStart(() => {
      setState(qp.state);
    });
    queuepromise.setOnStop(() => {
      setState(qp.state);
    });
    queuepromise.setOnEnd(() => {
      setState(qp.state);
    });
    queuepromise.setOnExecuting((id) => {
      setTaskId(id);
    });
    queuepromise.start();
  }, []);

  return [qp, qpstate, taskId, actions];
};

export default useQueuePromise;
