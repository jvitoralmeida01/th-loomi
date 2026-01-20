import Spinner from "@/app/_components/Spinner";

export default function TicketManagementLoading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <Spinner size="lg" />
    </div>
  );
}
