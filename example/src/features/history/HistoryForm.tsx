import React from "react";
import useHistory from "./history.hooks";

const HistoryForm = () => {
  const { stepBack, stepForward } = useHistory();
  return (
    <div>
      <button type="button" onClick={stepBack}>
        &lt;&lt; Rewind Time
      </button>
      <button type="button" onClick={stepForward}>
        Fast Forward Time &gt;&gt;
      </button>
    </div>
  );
};

export default HistoryForm;
