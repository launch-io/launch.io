import React from "react";
import { useLaunchSelector } from "launch.io";
import { CalculatorState } from "./calculator.service";

const CalculatorDisplay = () => {
  const value = useLaunchSelector<CalculatorState>(
    ({ state }) => state.calculator.value
  );
  //   const value = 2;

  console.log("CalculatorDisplay -> render", value);
  return <h2>Calculator: {value}</h2>;
};

export default React.memo(CalculatorDisplay);
