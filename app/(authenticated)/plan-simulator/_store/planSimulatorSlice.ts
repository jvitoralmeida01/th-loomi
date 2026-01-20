import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan, PlanType } from "@/src/domain/entities/planSimulator";
import {
  defaultAdditionalCoverages,
  defaultVehicleValue,
  defaultClientAge,
  defaultSelectedPlan,
} from "../_utils/config";

export type { PlanType } from "@/src/domain/entities/planSimulator";

export interface AdditionalCoverage {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

export interface PlanSimulatorState {
  plans: Plan[];
  selectedPlan: PlanType;
  vehicleValue: number;
  clientAge: number;
  additionalCoverages: AdditionalCoverage[];
  isInitialized: boolean;
}

export interface InitializeStatePayload {
  plans: Plan[];
  selectedPlan?: PlanType;
  vehicleValue?: number;
  clientAge?: number;
  additionalCoverages?: AdditionalCoverage[];
}

const initialState: PlanSimulatorState = {
  plans: [],
  selectedPlan: defaultSelectedPlan,
  vehicleValue: defaultVehicleValue,
  clientAge: defaultClientAge,
  additionalCoverages: defaultAdditionalCoverages,
  isInitialized: false,
};

const planSimulatorSlice = createSlice({
  name: "planSimulator",
  initialState,
  reducers: {
    initializeState: (state, action: PayloadAction<InitializeStatePayload>) => {
      state.plans = action.payload.plans;
      if (action.payload.selectedPlan !== undefined) {
        state.selectedPlan = action.payload.selectedPlan;
      }
      if (action.payload.vehicleValue !== undefined) {
        state.vehicleValue = action.payload.vehicleValue;
      }
      if (action.payload.clientAge !== undefined) {
        state.clientAge = action.payload.clientAge;
      }
      if (action.payload.additionalCoverages !== undefined) {
        state.additionalCoverages = action.payload.additionalCoverages;
      }
      state.isInitialized = true;
    },
    setSelectedPlan: (state, action: PayloadAction<PlanType>) => {
      state.selectedPlan = action.payload;
    },
    setVehicleValue: (state, action: PayloadAction<number>) => {
      state.vehicleValue = action.payload;
    },
    setClientAge: (state, action: PayloadAction<number>) => {
      state.clientAge = action.payload;
    },
    toggleCoverage: (state, action: PayloadAction<string>) => {
      const coverage = state.additionalCoverages.find(
        (c) => c.id.toString() === action.payload.toString()
      );
      if (coverage) {
        coverage.selected = !coverage.selected;
      }
    },
  },
});

export const {
  initializeState,
  setSelectedPlan,
  setVehicleValue,
  setClientAge,
  toggleCoverage,
} = planSimulatorSlice.actions;

export default planSimulatorSlice.reducer;
