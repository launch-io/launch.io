import React, { useEffect } from "react";
import { useLaunchService } from "launch.io";

const CalculatorForm = () => {
  let { value, increase, decrease } = useLaunchService("calculator");

  useEffect(() => {
    console.log("CalculatorForm -> RENDER", value);
  });

  return (
    <div>
      <p>Value: {value}</p>
      <button type="button" onClick={() => increase()}>
        Increase
      </button>
      <button type="button" onClick={() => decrease()}>
        Decrease
      </button>
    </div>
  );
};

export default React.memo(CalculatorForm);
