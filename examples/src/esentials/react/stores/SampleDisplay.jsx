import React from "react";

import { useStore } from "../MyStore";

import { SampleStateHook } from "../SampleState";

const SampleDisplay = ({}) => {
  const state = useStore(SampleStateHook);

  return (
    <div>
      <span>{state}</span>
    </div>
  );
};

export default SampleDisplay;
