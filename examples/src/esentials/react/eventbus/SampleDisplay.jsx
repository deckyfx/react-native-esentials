import React, { useState } from "react";

import { useEventBus } from "../MyEventBus";

import { SampleEventMatcher } from "../SampleEvent";

const SampleDisplay = ({}) => {
  const [triggered, setTriggered] = useState("");

  const getTrigeredAt = () => {
    return `Triggered at ${triggered.toString()}`;
  };

  useEventBus(
    SampleEventMatcher(),
    () => {
      setTriggered(new Date());
    },
    []
  );

  return (
    <div>
      <span>{getTrigeredAt()}</span>
    </div>
  );
};

export default SampleDisplay;
