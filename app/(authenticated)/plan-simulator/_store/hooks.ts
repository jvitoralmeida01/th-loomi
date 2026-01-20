import { useDispatch, useSelector, useStore } from "react-redux";
import type { PlanSimulatorDispatch, PlanSimulatorStore, PlanSimulatorRootState } from "./planSimulatorStore";

export const usePlanSimulatorDispatch = useDispatch.withTypes<PlanSimulatorDispatch>();
export const usePlanSimulatorSelector = useSelector.withTypes<PlanSimulatorRootState>();
export const usePlanSimulatorStore = useStore.withTypes<PlanSimulatorStore>();
