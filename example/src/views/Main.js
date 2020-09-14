import React from "react";
import useName from "../hooks/useName";
import useHistory from "../hooks/useHistory";
import useCalculator from "../hooks/useCalculator";
import NameForm from "../components/NameForm";
import HistoryForm from "../components/HistoryForm";
import CalculatorForm from "../components/CalculatorForm";

export default function Main() {
  const nameContext = useName();
  const historyContext = useHistory();
  const calculatorContext = useCalculator();

  const handleNameChange = (e, propName) => {
    nameContext.updateName({ [propName]: e.target.value });
  };

  return (
    <div>
      <NameForm name={nameContext.state} nameChange={handleNameChange} />
      <CalculatorForm
        value={calculatorContext.state.value}
        increase={calculatorContext.increase}
        decrease={calculatorContext.decrease}
      />
      <HistoryForm
        rewind={historyContext.rewind}
        fastForward={historyContext.fastForward}
      ></HistoryForm>
    </div>
  );
}
