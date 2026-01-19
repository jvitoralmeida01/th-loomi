import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlanType = "basic" | "intermediate" | "premium";

export interface AdditionalCoverage {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

export interface PlanSimulatorState {
  selectedPlan: PlanType;
  vehicleValue: number;
  clientAge: number;
  additionalCoverages: AdditionalCoverage[];
}

const initialState: PlanSimulatorState = {
  selectedPlan: "intermediate",
  vehicleValue: 50000,
  clientAge: 28,
  additionalCoverages: [
    {
      id: 0,
      name: "Cobertura contra roubo e furto",
      price: 25,
      selected: true,
    },
    {
      id: 1,
      name: "Danos por colisão",
      price: 35,
      selected: true,
    },
    {
      id: 2,
      name: "Cobertura contra incêndio",
      price: 20,
      selected: true,
    },
    {
      id: 3,
      name: "Fenômenos naturais (granizo, enchente)",
      price: 30,
      selected: false,
    },
  ],
};

const planSimulatorSlice = createSlice({
  name: "planSimulator",
  initialState,
  reducers: {
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

export const { setSelectedPlan, setVehicleValue, setClientAge, toggleCoverage } =
  planSimulatorSlice.actions;

export default planSimulatorSlice.reducer;

