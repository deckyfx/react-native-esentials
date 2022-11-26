import React from "react";

import useQueue from "../../../../../src/hooks/useQueue";

import { joinClasses } from "../Helper";

import Enqueue from "./Enqueue";
import Dequeue from "./Dequeue";

const QueueExample = ({}) => {
  const [queue, { enqueue, dequeue, clear }] = useQueue();

  const onEnqueue = (value) => {
    enqueue(value);
  };

  const onDequeue = () => {
    dequeue();
  };

  return (
    <div className="flex space-x-4 items-center ">
      <div>Queue FIFO</div>
      <Enqueue onEnqueue={onEnqueue} />
      <Dequeue items={queue.array} onDequeue={onDequeue} />
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
        onClick={clear}
      >
        Clear
      </button>
    </div>
  );
};

export default QueueExample;
