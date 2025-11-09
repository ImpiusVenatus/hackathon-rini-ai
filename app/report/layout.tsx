import { Stepper } from "@/components/report/Stepper";
import { BackNav } from "@/components/report/BackNav";
import Link from "next/link";
import RiniLogo from "@/components/RiniLogo";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = [
    {
      label: "Identity & Address",
      href: "/report/introduction",
      icon: "user",
    },
    { label: "Income", href: "/report/income", icon: "dollar" },
    {
      label: "Credit History",
      href: "/report/credit-history",
      icon: "credit",
    },
    { label: "Review & Submit", href: "/report/review", icon: "check" },
  ];

  return (
    <>
      {/* Simple Navbar */}
      <nav className="fixed top-0 w-full z-[1000] bg-white border-b border-slate-200  ">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1">
          <div className="flex items-center justify-start h-12 md:h-16">
            <Link
              href="/"
              className="flex cursor-pointer items-center gap-2 min-w-0"
            >
              <RiniLogo size={24} color="#199980" />
              <span className="font-bold text-lg sm:text-xl text-[#199980] truncate">
                RINI REPORT
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content with top margin for navbar */}
      <div className="pt-24 max-w-4xl mx-auto p-6">
        <Stepper steps={steps} />
        <BackNav steps={steps} />
        <div className="mt-6 sm:mt-8">{children}</div>
      </div>
    </>
  );
}
