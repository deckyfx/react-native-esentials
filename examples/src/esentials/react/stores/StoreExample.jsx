import React from "react";

import SampleButton from "./SampleButton";
import SampleDisplay from "./SampleDisplay";

const StoreExample = ({}) => {
  return (
    <div>
      Deliver state across components
      <SampleButton />
      <SampleDisplay />
    </div>
  );
};

export default StoreExample;
