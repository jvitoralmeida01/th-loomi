import Sidebar from "../_components/Sidebar";
import Navbar from "../_components/Navbar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-26 pt-16">
            {children}
        </main>
      </div>
    </div>
  );
}
