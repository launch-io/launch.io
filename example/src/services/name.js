const initialState = {
  firstName: "",
  lastName: "",
  isLoading: false,
};

const actions = {
  updateName: ({ state }, payload) => ({ ...state, ...payload }),
  fetchName: ({ actions, launch }) => {
    launch(actions.requestName());
    fetch(`https://swapi.dev/api/people/1`)
      .then((response) => response.json())
      .then((data) => {
        launch(actions.receiveName({ name: data.name }));
      });
  },
  requestName: ({ state }) => ({ ...state, isLoading: true }),
  receiveName: ({ state }, payload) => {
    const newName = payload.name.split(" ");
    return {
      ...state,
      firstName: newName[0],
      lastName: newName[1],
      isLoading: false,
    };
  },
  resetName: () => ({ ...initialState }),
};

export default {
  name: "name",
  initialState,
  actions,
};
