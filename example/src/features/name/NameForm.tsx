import React, { useEffect } from "react";
import { useLaunch } from "launch.io";

const NameForm = () => {
  const name = useLaunch(({ state, actions }) => ({
    ...state.name,
    ...actions.name,
  }));

  useEffect(() => {
    name.fetchName();
  }, [name.fetchName]);

  useEffect(() => {
    console.log("NameForm -> RENDER");
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
              name.updateName({ lastName: e.target.value });
            }}
          />
          <h3>{name.lastName}</h3>
        </div>
      </form>
    </div>
  );
};

export default React.memo(NameForm);
