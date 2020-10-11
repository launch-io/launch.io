import React, { useEffect } from "react";
import { useLaunch } from "launch.io";

const HistoryForm = () => {
  const history = useLaunch(({ actions }) => actions._history);

  useEffect(() => {
    console.log("HistoryForm -> RENDER");
  });

  return (
    <div>
      <button type="button" onClick={() => history.stepBack()}>
        &lt;&lt; Rewind Time
      </button>
      <button type="button" onClick={() => history.stepForward()}>
        Fast Forward Time &gt;&gt;
      </button>
    </div>
  );
};

export default React.memo(HistoryForm);
