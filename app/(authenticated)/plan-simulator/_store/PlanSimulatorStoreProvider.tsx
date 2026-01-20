"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, PlanSimulatorStore } from "./planSimulatorStore";

export default function PlanSimulatorStoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<PlanSimulatorStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
