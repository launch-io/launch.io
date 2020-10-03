import React, { useEffect } from "react";
import { useCalculator } from "./calculator.hooks";

const CalculatorForm = () => {
  let { value, increase, decrease } = useCalculator();
  useEffect(() => {
    console.log("CalculatorForm -> RENDER", value);
  });
  return (
    <div>
      <p>Value: {value}</p>
      <button type="button" onClick={increase}>
        Increase
      </button>
      <button type="button" onClick={decrease}>
        Decrease
      </button>
    </div>
  );
};

export default React.memo(CalculatorForm);
