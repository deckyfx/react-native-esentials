import React, { useEffect, useRef } from 'react';

import { useQueuePromise, QueuePromiseState } from '@decky.fx/react-native-essentials';

import { joinClasses } from '../Helper';

import Enqueue from './Enqueue';
import Greeter from './Greeter';

const QueuePromiseExample = ({}) => {
  const [qp, qpstate, { addTask, start, stop }] = useQueuePromise(null, {
    onExecuting: (_, id) => {
      console.log('Executing:', id);
    },
    onResolved: (_, id, value) => {
      console.log('Task ', id, 'Success with return value: ', value);
    },
  });

  const greet = (arg) => {
    return async () => {
      return new Promise((res) =>
        setTimeout(() => {
          getGreeter()?.greet(arg);
          res(arg);
        }, 1000),
      );
    };
  };

  const onEnqueue = (value) => {
    addTask(greet(value));
  };

  const greeter = useRef(null);

  const getGreeter = () => {
    return greeter.current;
  };

  const getQpState = () => {
    switch (qpstate) {
      case QueuePromiseState.IDLE:
        return 'IDLE';
      case QueuePromiseState.RUNNING:
        return 'RUNNING';
      case QueuePromiseState.STOPPED:
        return 'STOPPED';
    }
  };

  useEffect(() => {
    if (qpstate == QueuePromiseState.IDLE) {
      getGreeter()?.greet('');
    }
  }, [qpstate]);

  return (
    <div className="flex space-x-4 items-center ">
      <div>Queue Promises</div>
      <Enqueue onEnqueue={onEnqueue} />
      <button
        className={joinClasses([
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'shadow-sm',
        ])}
        onClick={start}
      >
        Resume
      </button>
      <button
        className={joinClasses([
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
          'shadow-sm',
        ])}
        onClick={stop}
      >
        Pause
      </button>
      <div>Greet {qp.array.length} guests</div>
      <Greeter ref={greeter} />
      <div>Worker Status {getQpState()}</div>
    </div>
  );
};

export default QueuePromiseExample;
