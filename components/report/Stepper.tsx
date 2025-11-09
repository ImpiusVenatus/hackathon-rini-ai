"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  FiCheck,
  FiShield,
  FiUser,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";

type StepDefinition = {
  label: string;
  href: string;
  icon?: string; // icon key (serialized from server)
};

const ICONS: Record<string, React.ElementType> = {
  shield: FiShield,
  user: FiUser,
  dollar: FiDollarSign,
  credit: FiCreditCard,
  check: FiCheckCircle,
};

export function Stepper({ steps }: { steps: StepDefinition[] }) {
  const pathname = usePathname();
  const currentIndex = Math.max(
    0,
    steps.findIndex((step) => pathname.startsWith(step.href))
  );

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;
        const isLast = idx === steps.length - 1;
        const Icon = step.icon ? ICONS[step.icon] : undefined;

        return (
          <React.Fragment key={step.href}>
            <Link
              href={step.href}
              className="flex flex-col items-center flex-1 group"
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={`rounded-full p-1.5 mb-1 transition-all ${
                  isActive ? "border-2 border-dashed border-[#199980]" : ""
                }`}
              >
                <div
                  className={`rounded-full p-2.5 flex items-center justify-center transition-all ${
                    isCompleted || isActive
                      ? "bg-[#199980]/10"
                      : "bg-slate-200/70"
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="text-[#199980] w-5 h-5" />
                  ) : Icon ? (
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#199980]" : "text-slate-500"
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-xs font-semibold ${
                        isActive ? "text-[#199980]" : "text-slate-600"
                      }`}
                    >
                      {idx + 1}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`text-[10px] sm:text-xs font-semibold text-center ${
                  isActive ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </Link>

            {!isLast && (
              <div
                className={`w-6 sm:w-12 md:w-20 h-0.5 sm:h-1 rounded-full transition-all relative overflow-hidden mx-1 ${
                  idx < currentIndex ? "bg-[#199980]" : "bg-slate-300"
                }`}
              >
                {idx < currentIndex && (
                  <div className="absolute inset-0 bg-[#199980] animate-progress-line rounded-full" />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
