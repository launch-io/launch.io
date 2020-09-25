export interface NameState {
  firstName: string;
  lastName: string;
  isLoading: boolean;
}
const initialState: NameState = {
  firstName: "",
  lastName: "",
  isLoading: false,
};

const actions = {
  updateName: ({ state }, payload) => ({ ...state, ...payload }),
  fetchName: async ({ actions, launch }) => {
    launch(actions.requestName());

    const response = await fetch(`https://swapi.dev/api/people/1`);
    const data = await response.json();

    launch(actions.receiveName({ name: data.name }));
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
