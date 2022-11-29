import React from "react";

import SampleButton from "./SampleButton";
import SampleDisplay from "./SampleDisplay";

const EventBusExample = ({}) => {
  return (
    <div className="flex space-x-4 items-center ">
      <div>Deliver event across components</div>
      <SampleButton />
      <SampleDisplay />
    </div>
  );
};

export default EventBusExample;
