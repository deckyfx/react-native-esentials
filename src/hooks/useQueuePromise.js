import {useCallback, useEffect, useState} from 'react';

export default useQueuePromise = (queuepromise = new QueuePromise()) => {
  const [qp, setQp] = useState(queuepromise);
  const [qpstate, setState] = useState(queuepromise.state);
  const [taskId, setTaskId] = useState(0);

  const actions = {
    addTask: useCallback((task) => {
      setQp((prev) => {
        prev.enqueue(task);
        return prev;
      });
    }, []),
    start: useCallback(() => {
      setQp((prev) => {
        prev.start();
        return prev;
      });
    }, []),
    stop: useCallback((task) => {
      setQp((prev) => {
        prev.stop();
        return prev;
      });
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
