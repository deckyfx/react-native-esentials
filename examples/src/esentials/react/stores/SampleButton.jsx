import React from "react";

import { S } from "../MyStore";

const SampleButton = ({}) => {
  const modifyValue = () => {
    S.modifySampleState();
  };

  return (
    <div>
      <button onClick={modifyValue}>Modify Value</button>
    </div>
  );
};

export default SampleButton;
