"use client";

import clsx from "clsx";
import {
  Briefcase,
  Image as ImageIcon,
  LayoutDashboard,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    label: "Team Members",
    href: "/admin/team",
    icon: Users,
  },
  {
    label: "Gallery Images",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-600 bg-blue-950">
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="flex h-16 items-center border-b border-gray-700 px-6 py-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-bold text-xl text-gray-900 mx-auto"
          >
            <Image
              src="/tgs-logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain h-10"
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-2 px-3">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? " bg-blue-900/20 text-blue-400"
                      : "text-gray-700 dark:text-gray-400 hover:bg-blue-900/40 hover:text-white"
                  )}
                >
                  <Icon
                    className={clsx(
                      "mr-3 h-5 w-5 shrink-0",
                      isActive
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / User Profile (Optional) */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-500 flex items-center justify-center">
              <p className="text-white font-bold">AD</p>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Admin</span>
              <span className="text-xs text-gray-300">
                admin@tgsadvisor.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
