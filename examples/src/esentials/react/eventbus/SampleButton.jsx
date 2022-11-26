import React from "react";

import { E } from "../MyEventBus";

import { SampleEvent } from "../SampleEvent";

const SampleButton = ({}) => {
  const dispatchEvent = () => {
    E.dispatch(SampleEvent, []);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm"
        onClick={dispatchEvent}
      >
        Dispatch Event
      </button>
    </div>
  );
};

export default SampleButton;
