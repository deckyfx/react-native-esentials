import React from "react";

import { E } from "../MyEventBus";

import { SampleEvent } from "../SampleEvent";

const SampleButton = ({}) => {
  const dispatchEvent = () => {
    E.dispatch(SampleEvent, []);
  };

  return (
    <div>
      <button onClick={dispatchEvent}>Dispatch Event</button>
    </div>
  );
};

export default SampleButton;
