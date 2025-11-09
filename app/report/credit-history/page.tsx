"use client";
import Link from "next/link";
import { FiCreditCard, FiPlus, FiTrash2 } from "react-icons/fi";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormActions, useFormData } from "@/lib/hooks";
import { useRouter } from "next/navigation";

// Schema for credit history page
const creditHistoryPageSchema = z.object({
  creditAccounts: z
    .array(
      z.object({
        id: z.string(),
        lenderName: z
          .string()
          .min(2, "Lender name must be at least 2 characters"),
        creditType: z.string().min(1, "Credit type is required"),
        outstandingBalance: z
          .string()
          .min(1, "Outstanding balance is required")
          .refine(
            (val) => !isNaN(Number(val)) && Number(val) >= 0,
            "Outstanding balance must be a non-negative number"
          ),
        creditLimit: z
          .string()
          .min(1, "Credit limit is required")
          .refine(
            (val) => !isNaN(Number(val)) && Number(val) > 0,
            "Credit limit must be a positive number"
          ),
        monthlyPayment: z
          .string()
          .min(1, "Monthly payment is required")
          .refine(
            (val) => !isNaN(Number(val)) && Number(val) >= 0,
            "Monthly payment must be a non-negative number"
          ),
        paymentStatus: z.string().min(1, "Payment status is required"),
        accountOpenDate: z.string().min(1, "Account open date is required"),
        lastPaymentDate: z.string().min(1, "Last payment date is required"),
      })
    )
    .min(1, "At least one credit account is required"),
  creditHistory: z.object({
    bankruptcy: z.string().min(1, "Bankruptcy status is required"),
    accountsInCollections: z.string().min(1, "Collections status is required"),
    creditInquiries: z.string().min(1, "Credit inquiries status is required"),
    creditFreezeStatus: z.string().min(1, "Credit freeze status is required"),
  }),
});

type CreditHistoryPageFormData = z.infer<typeof creditHistoryPageSchema>;

export default function CreditHistoryPage() {
  const router = useRouter();
  const { setCreditAccounts, setCreditHistory, nextStep } = useFormActions();
  const formData = useFormData();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<CreditHistoryPageFormData>({
    resolver: zodResolver(creditHistoryPageSchema),
    defaultValues: {
      creditAccounts: formData.creditAccounts,
      creditHistory: formData.creditHistory,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "creditAccounts",
  });

  const onSubmit = (data: CreditHistoryPageFormData) => {
    setCreditAccounts(data.creditAccounts);
    setCreditHistory(data.creditHistory);
    nextStep();
    router.push("/report/review");
  };

  const addCreditAccount = () => {
    append({
      id: Date.now().toString(),
      lenderName: "",
      creditType: "",
      outstandingBalance: "",
      creditLimit: "",
      monthlyPayment: "",
      paymentStatus: "",
      accountOpenDate: "",
      lastPaymentDate: "",
    });
  };

  const removeCreditAccount = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-lg sm:shadow-xl overflow-hidden">
          {/* Header section */}
          <div className="bg-[#199980] p-4 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-white  flex items-center justify-center flex-shrink-0">
                <FiCreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  Credit History
                </h1>
                <p className="text-white/90 text-base sm:text-lg">
                  Tell us about your credit accounts and payment history
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8"
          >
            {/* Credit Accounts Section */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Credit Accounts
              </h2>

              {fields.map((field: { id: string }, index: number) => (
                <div
                  key={field.id}
                  className="bg-slate-50  rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 "
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 ">
                      Account {index + 1}
                    </h3>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCreditAccount(index)}
                        className="cursor-pointer p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Lender/Bank Name
                      </label>
                      <input
                        {...register(`creditAccounts.${index}.lenderName`)}
                        type="text"
                        placeholder="e.g., ABC Bank, XYZ Finance"
                        className={`input ${
                          errors.creditAccounts?.[index]?.lenderName
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.creditAccounts?.[index]?.lenderName && (
                        <p className="text-red-500 text-sm">
                          {errors.creditAccounts[index]?.lenderName?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Credit Type
                      </label>
                      <select
                        {...register(`creditAccounts.${index}.creditType`)}
                        className={`input ${
                          errors.creditAccounts?.[index]?.creditType
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Credit Type</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="personal-loan">Personal Loan</option>
                        <option value="home-loan">Home Loan</option>
                        <option value="auto-loan">Auto Loan</option>
                        <option value="business-loan">Business Loan</option>
                        <option value="microfinance">Microfinance</option>
                        <option value="student-loan">Student Loan</option>
                      </select>
                      {errors.creditAccounts?.[index]?.creditType && (
                        <p className="text-red-500 text-sm">
                          {errors.creditAccounts[index]?.creditType?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Outstanding Balance (BDT)
                      </label>
                      <input
                        {...register(
                          `creditAccounts.${index}.outstandingBalance`
                        )}
                        type="number"
                        placeholder="0"
                        className={`input ${
                          errors.creditAccounts?.[index]?.outstandingBalance
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.creditAccounts?.[index]?.outstandingBalance && (
                        <p className="text-red-500 text-sm">
                          {
                            errors.creditAccounts[index]?.outstandingBalance
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Credit Limit/Loan Amount (BDT)
                      </label>
                      <input
                        {...register(`creditAccounts.${index}.creditLimit`)}
                        type="number"
                        placeholder="0"
                        className={`input ${
                          errors.creditAccounts?.[index]?.creditLimit
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.creditAccounts?.[index]?.creditLimit && (
                        <p className="text-red-500 text-sm">
                          {errors.creditAccounts[index]?.creditLimit?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Monthly Payment (BDT)
                      </label>
                      <input
                        {...register(`creditAccounts.${index}.monthlyPayment`)}
                        type="number"
                        placeholder="0"
                        className={`input ${
                          errors.creditAccounts?.[index]?.monthlyPayment
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.creditAccounts?.[index]?.monthlyPayment && (
                        <p className="text-red-500 text-sm">
                          {
                            errors.creditAccounts[index]?.monthlyPayment
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Payment Status
                      </label>
                      <select
                        {...register(`creditAccounts.${index}.paymentStatus`)}
                        className={`input ${
                          errors.creditAccounts?.[index]?.paymentStatus
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Payment Status</option>
                        <option value="current">Current (0-30 days)</option>
                        <option value="30-days">30 days late</option>
                        <option value="60-days">60 days late</option>
                        <option value="90-days">90 days late</option>
                        <option value="120-days">120+ days late</option>
                        <option value="charged-off">Charged Off</option>
                      </select>
                      {errors.creditAccounts?.[index]?.paymentStatus && (
                        <p className="text-red-500 text-sm">
                          {errors.creditAccounts[index]?.paymentStatus?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Account Open Date
                      </label>
                      <input
                        {...register(`creditAccounts.${index}.accountOpenDate`)}
                        type="date"
                        className={`input ${
                          errors.creditAccounts?.[index]?.accountOpenDate
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.creditAccounts?.[index]?.accountOpenDate && (
                        <p className="text-red-500 text-sm">
                          {
                            errors.creditAccounts[index]?.accountOpenDate
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Last Payment Date
                      </label>
                      <input
                        {...register(`creditAccounts.${index}.lastPaymentDate`)}
                        type="date"
                        className={`input ${
                          errors.creditAccounts?.[index]?.lastPaymentDate
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.creditAccounts?.[index]?.lastPaymentDate && (
                        <p className="text-red-500 text-sm">
                          {
                            errors.creditAccounts[index]?.lastPaymentDate
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addCreditAccount}
                className="cursor-pointer w-full p-3 sm:p-4 border-2 border-dashed border-slate-300  rounded-xl sm:rounded-2xl text-slate-700  hover:border-[#199980] hover:text-[#199980] transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add Another Credit Account
              </button>
            </div>

            {/* Additional Credit Information */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Additional Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-700 ">
                    Have you ever filed for bankruptcy?
                  </label>
                  <select
                    {...register("creditHistory.bankruptcy")}
                    className={`input ${
                      errors.creditHistory?.bankruptcy ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select option</option>
                    <option value="no">No</option>
                    <option value="yes-past">Yes, in the past</option>
                    <option value="yes-current">Yes, currently</option>
                  </select>
                  {errors.creditHistory?.bankruptcy && (
                    <p className="text-red-500 text-sm">
                      {errors.creditHistory.bankruptcy.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-700 ">
                    Any accounts in collections?
                  </label>
                  <select
                    {...register("creditHistory.accountsInCollections")}
                    className={`input ${
                      errors.creditHistory?.accountsInCollections
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select option</option>
                    <option value="no">No</option>
                    <option value="yes-resolved">Yes, but resolved</option>
                    <option value="yes-current">Yes, currently active</option>
                  </select>
                  {errors.creditHistory?.accountsInCollections && (
                    <p className="text-red-500 text-sm">
                      {errors.creditHistory.accountsInCollections.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-700 ">
                    Credit inquiries in last 12 months
                  </label>
                  <select
                    {...register("creditHistory.creditInquiries")}
                    className={`input ${
                      errors.creditHistory?.creditInquiries
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select option</option>
                    <option value="0-2">0-2 inquiries</option>
                    <option value="3-5">3-5 inquiries</option>
                    <option value="6-10">6-10 inquiries</option>
                    <option value="10+">10+ inquiries</option>
                  </select>
                  {errors.creditHistory?.creditInquiries && (
                    <p className="text-red-500 text-sm">
                      {errors.creditHistory.creditInquiries.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-700 ">
                    Credit freeze status
                  </label>
                  <select
                    {...register("creditHistory.creditFreezeStatus")}
                    className={`input ${
                      errors.creditHistory?.creditFreezeStatus
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select option</option>
                    <option value="no-freeze">No freeze</option>
                    <option value="frozen">Currently frozen</option>
                    <option value="partial">Partially frozen</option>
                  </select>
                  {errors.creditHistory?.creditFreezeStatus && (
                    <p className="text-red-500 text-sm">
                      {errors.creditHistory.creditFreezeStatus.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6">
              <Link
                href="/report/income"
                className="cursor-pointer text-[#199980]  hover:text-[#158066]  font-medium transition-colors text-center sm:text-left w-full sm:w-auto"
              >
                ← Back to Income Details
              </Link>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 ${
                  isValid
                    ? "cursor-pointer bg-[#199980] hover:bg-[#158066] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Continue to Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
