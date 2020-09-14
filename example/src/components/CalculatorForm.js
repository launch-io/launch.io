import React from "react";
import PropTypes from "prop-types";

const CalculatorForm = (props) => {
  return (
    <div>
      <p>Value: {props.value}</p>
      <button type="button" onClick={props.increase}>
        Increase
      </button>
      <button type="button" onClick={props.decrease}>
        Decrease
      </button>
    </div>
  );
};

CalculatorForm.propTypes = {
  value: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default CalculatorForm;
