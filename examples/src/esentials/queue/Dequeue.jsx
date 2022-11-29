import React, { useState, useRef } from "react";

import { joinClasses } from "../Helper";

const Dequeue = ({ items, onDequeue }) => {
  return (
    <div className="flex space-x-4 items-center ">
      <div>
        <ul className="list-outside">
          <React.Fragment>
            {items.map((item) => {
              return <li key={item.key.toString()}>{item.value}</li>;
            })}
          </React.Fragment>
        </ul>
      </div>
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
        onClick={onDequeue}
      >
        Dequeue
      </button>
    </div>
  );
};

export default Dequeue;
