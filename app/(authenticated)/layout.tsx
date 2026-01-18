import Sidebar from "../_components/Sidebar";
import Topbar from "../_components/Topbar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 pl-26 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
