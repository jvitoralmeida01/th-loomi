import TopbarTitle from "@/app/_components/TopbarTitle";
import TopbarAction from "@/app/(authenticated)/ticket-management/_components/TopbarAction";

export default function Topbar() {
  return (
    <nav className="fixed w-full top-0 z-40 bg-surface px-8 py-4 shadow-lg">
      <div className="flex flex-row justify-between items-center pl-24">
        <TopbarTitle />
        <TopbarAction />
      </div>
    </nav>
  );
}
