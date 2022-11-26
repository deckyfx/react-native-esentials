import React from "react";

import SampleButton from "./SampleButton";
import SampleDisplay from "./SampleDisplay";

const EventBusExample = ({}) => {
  return (
    <div>
      Deliver event across components
      <SampleButton />
      <SampleDisplay />
    </div>
  );
};

export default EventBusExample;
