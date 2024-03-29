import { act,renderHook } from "@testing-library/react-hooks";

import { useLaunch } from "../src/hooks/useLaunch";
import { initializeLaunch } from "../src/utils/initializeLaunch";

const calculatorStep = 1;

const calculatorService = {
  name: "calculator",

  initialState: {
    value: 0,
  },

  actions: {
    increase: ({ state }, payload: number) => ({
      value: state.value + payload,
    }),
    decrease: ({ state }, payload: number) => ({
      value: state.value - payload,
    }),
  },
};

beforeAll(() => {
  initializeLaunch([calculatorService], {
    enableTimeTravel: true,
    timeTravelHistoryLimit: 5,
  });
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
      actionResult.current.increase(calculatorStep);
    });

    expect(stateResult.current.value).toBe(1);

    act(() => {
      actionResult.current.decrease(calculatorStep);
    });

    expect(stateResult.current.value).toBe(0);
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

    expect(stateResult.current.value).toBe(1);

    act(() => {
      historyActionResult.current.stepForward();
    });

    expect(stateResult.current.value).toBe(0);
  });

  it("verifies that it restricts the time travel history limit", () => {
    const { result: actionResult } = renderHook(() =>
      useLaunch(({ actions }) => actions.calculator)
    );
    const { result: stateResult } = renderHook(() =>
      useLaunch(({ state }) => state.calculator)
    );
    const { result: historyActionResult } = renderHook(() =>
      useLaunch(({ actions }) => actions._history)
    );

    act(() => {
      // 6 actions to increase the value to 6
      actionResult.current.increase(calculatorStep);
      actionResult.current.increase(calculatorStep);
      actionResult.current.increase(calculatorStep);
      actionResult.current.increase(calculatorStep);
      actionResult.current.increase(calculatorStep);
      actionResult.current.increase(calculatorStep);
      // 6 time travel steps back, but the limit of 5 should have a value of 1
      historyActionResult.current.stepBack();
      historyActionResult.current.stepBack();
      historyActionResult.current.stepBack();
      historyActionResult.current.stepBack();
      historyActionResult.current.stepBack();
      historyActionResult.current.stepBack();
    });

    expect(stateResult.current.value).toBe(1);
  });
});
