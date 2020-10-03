import React, { useEffect } from "react";
import { useName } from "./name.hooks";

const NameForm = () => {
  const { firstName, lastName, updateName } = useName();
  useEffect(() => {
    console.log("NameForm -> RENDER", firstName, lastName);
  });
  return (
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input
            value={firstName}
            onChange={(e) => {
              updateName({ firstName: e.target.value });
            }}
          />
          <h3>{firstName}</h3>
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => {
              updateName({ lastName: e.target.value });
            }}
          />
          <h3>{lastName}</h3>
        </div>
      </form>
    </div>
  );
};

export default NameForm;
