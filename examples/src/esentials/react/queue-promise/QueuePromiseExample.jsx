import React, { useEffect, useRef } from "react";

import useQueuePromise from "../../../../../src/hooks/useQueuePromise";
import { State } from "../../../../../src/queues/queue-promise";

import { joinClasses } from "../Helper";

import Enqueue from "./Enqueue";
import Greeter from "./Greeter";

const QueuePromiseExample = ({}) => {
  const [qp, qpstate, taskId, { addTask, start, stop }] = useQueuePromise();

  const greet = (arg) => {
    return async () => {
      return new Promise((res) =>
        setTimeout(() => {
          getGreeter()?.greet(arg);
          res();
        }, 1000)
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
      case State.IDLE:
        return "IDLE";
      case State.RUNNING:
        return "RUNNING";
      case State.STOPPED:
        return "STOPPED";
    }
  };

  useEffect(() => {
    if (qpstate == State.IDLE) {
      getGreeter()?.greet("");
    }
  }, [qpstate]);

  return (
    <div className="flex space-x-4 items-center ">
      <div>Queue Promises</div>
      <Enqueue onEnqueue={onEnqueue} />
      <button
        className={joinClasses([
          "bg-blue-500",
          "hover:bg-blue-700",
          "text-white",
          "font-bold",
          "py-2",
          "px-4",
          "rounded",
          "shadow-sm",
        ])}
        onClick={start}
      >
        Resume
      </button>
      <button
        className={joinClasses([
          "bg-blue-500",
          "hover:bg-blue-700",
          "text-white",
          "font-bold",
          "py-2",
          "px-4",
          "rounded",
          "shadow-sm",
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
