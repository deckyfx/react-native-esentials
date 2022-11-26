import React, { useEffect, useState } from "react";

import { joinClasses } from "../Helper";

const Enqueue = ({ onEnqueue }) => {
  const [name, setName] = useState("");

  const updateInput = (event) => {
    setName(event.target.value);
  };

  const addToQueue = () => {
    if (onEnqueue) {
      onEnqueue(name);
      setName("");
    }
  };

  useEffect(() => {}, [name]);

  return (
    <div className="flex space-x-4 items-center ">
      <input
        className={joinClasses([
          "shadow",
          "appearance-none",
          "border",
          "rounded",
          "w-full",
          "py-2",
          "px-3",
          "text-gray-700",
          "leading-tight",
          "focus:outline-none",
          "focus:shadow-outline",
          "w-40",
        ])}
        id="name"
        type="text"
        placeholder="Guest Name"
        maxLength={30}
        value={name}
        onChange={updateInput}
      />
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
        onClick={addToQueue}
      >
        Enqueue
      </button>
    </div>
  );
};

export default Enqueue;
