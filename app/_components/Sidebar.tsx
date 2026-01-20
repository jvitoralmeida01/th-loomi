import Image from "next/image";
import routes from "../_utils/routes";
import SidebarButton from "./SidebarButton";
import logo from "@/assets/logo.png";
import dashboardIcon from "@/assets/icons/dashboard.svg";
import ticketIcon from "@/assets/icons/ticket.svg";
import chatIcon from "@/assets/icons/chat.svg";
import planSimulatorIcon from "@/assets/icons/plan_simulator.svg";
import userIcon from "@/assets/icons/user.svg";

interface NavItem {
  path: string;
  icon: any;
  label: string;
}

const navItems: NavItem[] = [
  { path: routes.dashboard, icon: dashboardIcon, label: "Dashboard" },
  {
    path: routes.ticketManagement,
    icon: ticketIcon,
    label: "Ticket Management",
  },
  { path: routes.chat, icon: chatIcon, label: "Chat" },
  { path: routes.profile, icon: userIcon, label: "Profile" },
  {
    path: routes.planSimulator,
    icon: planSimulatorIcon,
    label: "Plan Simulator",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen bg-surface shadow-xl-right z-50 flex flex-col items-center pt-7 pb-12 pl-4 pr-9 rounded-tr-3xl rounded-br-3xl">
      <Image
        src={logo}
        alt="Nortus Logo"
        className="w-8 h-8 pointer-events-none"
      />

      <nav className="flex flex-col justify-center gap-8 flex-1">
        {navItems.map((item) => (
          <SidebarButton
            key={item.path}
            path={item.path}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      <div className="p-4 rounded-full bg-primary flex items-center justify-center text-foreground font-montserrat font-semibold text-sm shadow-lg">
        AC
      </div>
    </aside>
  );
}
