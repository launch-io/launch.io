import React from "react";
import NameForm from "../features/name/NameForm";
import CalculatorForm from "../features/calculator/CalculatorForm";
import HistoryForm from "../features/history/HistoryForm";

export default function Main() {
  return (
    <div>
      <NameForm />
      <CalculatorForm />
      <HistoryForm />
    </div>
  );
}
