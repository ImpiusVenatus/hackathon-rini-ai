"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

type Step = { label: string; href: string; icon?: string };

export function BackNav({ steps }: { steps: Step[] }) {
  const pathname = usePathname();
  const currentIndex = Math.max(
    0,
    steps.findIndex((step) => pathname.startsWith(step.href))
  );

  if (currentIndex <= 0) return null;

  const prevHref = steps[currentIndex - 1].href;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Link
        href={prevHref}
        className="cursor-pointer inline-flex items-center gap-1 text-slate-900 underline text-sm sm:text-base font-medium hover:text-[#199980] transition mt-4"
      >
        <FiChevronLeft className="w-4 h-4" />
        Back
      </Link>
    </div>
  );
}
