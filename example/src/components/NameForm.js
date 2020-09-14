import React from "react";
import PropTypes from "prop-types";

const NameForm = (props) => {
  return (
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input
            value={props.name.firstName}
            onChange={(e) => {
              props.nameChange(e, "firstName");
            }}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={props.name.lastName}
            onChange={(e) => {
              props.nameChange(e, "lastName");
            }}
          />
        </div>
      </form>
    </div>
  );
};

NameForm.propTypes = {
  name: PropTypes.object.isRequired,
  nameChange: PropTypes.func.isRequired,
};

export default NameForm;
