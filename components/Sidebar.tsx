"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartLine, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import RiniLogo from "@/components/RiniLogo";

const navigation = [
  { name: "Credit Assessments", href: "/dashboard", icon: FaChartLine },
  { name: "Users", href: "/users", icon: FaUsers },
  { name: "Settings", href: "/settings", icon: FaCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-slate-200">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
        <RiniLogo size={24} color="#199980" />
        <h1 className="text-xl font-bold text-[#199980]">RiniAI Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {/* Dashboard Section Title */}
        <div className="px-3 py-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Dashboard
          </h2>
        </div>

        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#199980] text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-[#199980]"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4 space-y-3">
        {/* Account Section */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#199980]/10 text-[#199980]">
            <span className="text-sm font-semibold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 truncate">
              Admin
            </div>
            <div className="text-xs text-slate-500 truncate">Administrator</div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button className="flex cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#199980]">
          <FaSignOutAlt className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
