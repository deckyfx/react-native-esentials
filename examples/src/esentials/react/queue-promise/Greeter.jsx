import React, { useState, forwardRef, useImperativeHandle } from "react";

const Greeter = ({}, ref) => {
  const [name, setName] = useState("");

  const greet = (name) => {
    setName(name);
  };

  useImperativeHandle(ref, () => ({
    greet,
  }));

  return (
    <div>{name ? `| Hello ${name} |` : "All guests Have been greeted"}</div>
  );
};

export default forwardRef(Greeter);
