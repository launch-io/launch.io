import { renderHook, act } from "@testing-library/react-hooks";
import { initializeLaunch } from "../src/utils/initializeLaunch";
import { useLaunch } from "../src/hooks/useLaunch";

const calculatorService = {
  name: "calculator",

  initialState: {
    value: 0,
  },

  actions: {
    increase: ({ state }) => ({ value: state.value + 1 }),
    decrease: ({ state }) => ({ value: state.value - 1 }),
  },
};

beforeAll(() => {
  initializeLaunch([calculatorService], { enableTimeTravel: true });
});

describe("useLaunch tests", () => {
  it("verifies that it fetches service state", () => {
    const { result } = renderHook(() =>
      useLaunch(({ state }) => state.calculator)
    );

    expect(result.current.value).toBe(0);
  });

  it("verifies that it fetches service actions", () => {
    const { result } = renderHook(() =>
      useLaunch(({ actions }) => actions.calculator)
    );

    expect(typeof result.current.increase).toBe("function");
    expect(typeof result.current.decrease).toBe("function");
  });

  it("verifies that it launches service actions", () => {
    const { result: stateResult } = renderHook(() =>
      useLaunch(({ state }) => state.calculator)
    );
    const { result: actionResult } = renderHook(() =>
      useLaunch(({ actions }) => actions.calculator)
    );

    act(() => {
      actionResult.current.increase();
    });

    expect(stateResult.current.value).toBe(1);
  });

  it("verifies that it launches time travel actions", () => {
    const { result: stateResult } = renderHook(() =>
      useLaunch(({ state }) => state.calculator)
    );
    const { result: historyActionResult } = renderHook(() =>
      useLaunch(({ actions }) => actions._history)
    );

    act(() => {
      historyActionResult.current.stepBack();
    });

    expect(stateResult.current.value).toBe(0);
  });
});
