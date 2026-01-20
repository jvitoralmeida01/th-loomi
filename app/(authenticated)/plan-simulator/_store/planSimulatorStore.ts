import { configureStore } from "@reduxjs/toolkit";
import planSimulatorReducer from "./planSimulatorSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      planSimulator: planSimulatorReducer,
    },
  });
};

export type PlanSimulatorStore = ReturnType<typeof makeStore>;
export type PlanSimulatorRootState = ReturnType<PlanSimulatorStore["getState"]>;
export type PlanSimulatorDispatch = PlanSimulatorStore["dispatch"];
