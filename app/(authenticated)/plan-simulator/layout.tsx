import StoreProvider from "@/app/(authenticated)/plan-simulator/_store/PlanSimulatorStoreProvider";

export default function PlanSimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
