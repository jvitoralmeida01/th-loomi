import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "../_components/Sidebar";
import Topbar from "../_components/Topbar";
import UserInfoSync from "../_components/UserInfoSync";
import { AUTH_TOKEN_COOKIE } from "@/src/application/services/AuthService";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE);

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col">
      <UserInfoSync />
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 pl-26 pt-16">{children}</main>
      </div>
    </div>
  );
}
