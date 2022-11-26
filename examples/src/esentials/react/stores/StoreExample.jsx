import React from "react";

import SampleButton from "./SampleButton";
import SampleDisplay from "./SampleDisplay";

const StoreExample = ({}) => {
  return (
    <div className="flex space-x-4 items-center ">
      <div>Deliver state across components</div>
      <SampleButton />
      <SampleDisplay />
    </div>
  );
};

export default StoreExample;
