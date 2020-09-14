import React from "react";
import PropTypes from "prop-types";

const HistoryForm = (props) => {
  return (
    <div>
      <button type="button" onClick={props.rewind}>
        &lt;&lt; Rewind Time
      </button>
      <button type="button" onClick={props.fastForward}>
        Fast Forward Time &gt;&gt;
      </button>
    </div>
  );
};

HistoryForm.propTypes = {
  rewind: PropTypes.func.isRequired,
  fastForward: PropTypes.func.isRequired,
};

export default HistoryForm;
