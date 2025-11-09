"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaChartLine, FaUser, FaSignOutAlt } from "react-icons/fa";
import RiniLogo from "@/components/RiniLogo";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isReportPage = pathname?.startsWith("/report");
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser] = useState<{
    name: string;
    email: string;
  } | null>(() => {
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      if (authStatus) {
        const userStr = localStorage.getItem("currentUser");
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            return { name: user.name, email: user.email };
          } catch {
            // Invalid user data
          }
        }
      }
    }
    return null;
  });
  const [isAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isAuthenticated") === "true";
    }
    return false;
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      setIsProfileOpen(false);
      // Force a full page reload to clear all state
      window.location.href = "/";
    }
  };

  // Hide navbar on report pages, login, and signup pages
  if (isReportPage || isLoginPage || isSignupPage) {
    return null;
  }

  return (
    <nav className="relative z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex cursor-pointer items-center gap-2">
            <RiniLogo size={28} color="#199980" />
            <span className="text-xl font-bold text-[#199980]">RiniAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {isDashboard ? (
              <Link
                href="/"
                className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#199980]"
              >
                <FaHome className="h-4 w-4" />
                Home
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#199980] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#158066]"
              >
                <FaChartLine className="h-4 w-4" />
                Dashboard
              </Link>
            )}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#199980]"
              >
                <FaUser className="h-4 w-4" />
                Profile
              </button>

              {isAuthenticated && isProfileOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg">
                  <div className="p-4 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">
                      {currentUser?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {currentUser?.email || ""}
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
