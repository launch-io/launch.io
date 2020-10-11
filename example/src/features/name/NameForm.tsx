import React, { useEffect } from "react";
import { useLaunch } from "launch.io";

const NameForm = () => {
  const state = useLaunch(({ state }) => state.name);
  const actions = useLaunch(({ actions }) => actions.name);

  useEffect(() => {
    actions.fetchName();
  }, [actions]);

  useEffect(() => {
    console.log("NameForm -> RENDER");
  });

  return (
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input
            value={state.firstName}
            onChange={(e) => {
              actions.updateName({ firstName: e.target.value });
            }}
          />
          <h3>{state.firstName}</h3>
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={state.lastName}
            onChange={(e) => {
              actions.updateName({ lastName: e.target.value });
            }}
          />
          <h3>{state.lastName}</h3>
        </div>
      </form>
    </div>
  );
};

export default React.memo(NameForm);
