import React, { useEffect } from "react";
import { useLaunchService } from "launch.io";

const NameForm = () => {
  const name = useLaunchService("name");

  useEffect(() => {
    name.fetchName();
  }, [name.fetchName]);

  useEffect(() => {
    console.log("NameForm -> RENDER", name.firstName, name.lastName);
  });
  return (
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input
            value={name.firstName}
            onChange={(e) => {
              name.updateName({ firstName: e.target.value });
            }}
          />
          <h3>{name.firstName}</h3>
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={name.lastName}
            onChange={(e) => {
              name.updatedName({ lastName: e.target.value });
            }}
          />
          <h3>{name.lastName}</h3>
        </div>
      </form>
    </div>
  );
};

export default NameForm;
