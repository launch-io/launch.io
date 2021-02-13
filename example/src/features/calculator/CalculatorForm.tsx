import React, { useEffect } from "react";
import { useLaunch } from "launch.io";

const CalculatorForm = () => {
  const calculatorStep = 2;
  const calculator = useLaunch(({ actions }) => actions.calculator);

  useEffect(() => {
    console.log("CalculatorForm -> RENDER");
  });

  return (
    <div>
      <button type="button" onClick={() => calculator.increase(calculatorStep)}>
        Increase
      </button>
      <button type="button" onClick={() => calculator.decrease(calculatorStep)}>
        Decrease
      </button>
    </div>
  );
};

export default React.memo(CalculatorForm);
