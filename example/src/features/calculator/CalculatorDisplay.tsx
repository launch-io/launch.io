import React, { useEffect } from "react";
import { useLaunch } from "launch.io";

const CalculatorDisplay = () => {
  const value = useLaunch(({ state }) => state.calculator.value);

  useEffect(() => {
    console.log("CalculatorDisplay -> RENDER");
  });

  return <p>Value: {value}</p>;
};

export default React.memo(CalculatorDisplay);
