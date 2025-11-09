"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RiniLogo from "@/components/RiniLogo";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    if (typeof window !== "undefined") {
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
      if (isAuthenticated) {
        router.push("/report/introduction");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user by email
    const user = users.find(
      (u: { email: string; password: string }) =>
        u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    // Set authentication
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect to report steps
    router.push("/report/introduction");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex cursor-pointer items-center gap-2">
            <RiniLogo size={32} color="#199980" />
            <span className="text-2xl font-bold text-[#199980]">RiniAI</span>
          </Link>
        </div>

        {/* Login Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            Welcome Back
          </h1>
          <p className="mb-6 text-sm text-slate-600">
            Sign in to continue to RiniAI
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input pl-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input pl-12"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-lg bg-[#199980] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#158066] disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="cursor-pointer font-medium text-[#199980] hover:text-[#158066]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
