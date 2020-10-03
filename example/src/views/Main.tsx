import React from "react";
import NameForm from "../features/name/NameForm";
import CalculatorForm from "../features/calculator/CalculatorForm";
import CalculatorDisplay from "../features/calculator/CalculatorDisplay";
import HistoryForm from "../features/history/HistoryForm";

export default React.memo(function Main() {
  return (
    <div>
      <NameForm />
      <CalculatorForm />
      <CalculatorDisplay />
      <HistoryForm />
    </div>
  );
});
