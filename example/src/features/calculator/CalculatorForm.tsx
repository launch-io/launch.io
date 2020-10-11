import React, { useEffect } from "react";
import { useLaunch } from "launch.io";

const CalculatorForm = () => {
  const calculator = useLaunch(({ actions }) => actions.calculator);

  useEffect(() => {
    console.log("CalculatorForm -> RENDER");
  });

  return (
    <div>
      <button type="button" onClick={() => calculator.increase()}>
        Increase
      </button>
      <button type="button" onClick={() => calculator.decrease()}>
        Decrease
      </button>
    </div>
  );
};

export default React.memo(CalculatorForm);
