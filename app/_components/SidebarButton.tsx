"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  path: string;
  icon: any;
  label: string;
}

export default function SidebarButton({
  path,
  icon,
  label,
}: SidebarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`px-4 py-3.5 rounded-lg flex items-center justify-center transition-all duration-300 ${
        isActive
          ? "bg-primary glow-primary hover:shadow-none"
          : "bg-neutral-100/5 hover:bg-neutral-100/10"
      }`}
      title={label}
    >
      <Image src={icon} alt={label} className="w-5 h-5 pointer-events-none" />
    </Link>
  );
}
