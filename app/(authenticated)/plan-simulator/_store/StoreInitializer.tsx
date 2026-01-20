"use client";

import { useEffect, useRef } from "react";
import { usePlanSimulatorDispatch } from "./hooks";
import { initializeState, InitializeStatePayload } from "./planSimulatorSlice";

interface StoreInitializerProps {
  initialData: InitializeStatePayload;
}

export default function StoreInitializer({
  initialData,
}: StoreInitializerProps) {
  const dispatch = usePlanSimulatorDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(initializeState(initialData));
      initialized.current = true;
    }
  }, [dispatch, initialData]);

  return null;
}
