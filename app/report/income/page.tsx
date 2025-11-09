"use client";
import Link from "next/link";
import { FiDollarSign, FiPlus, FiTrash2 } from "react-icons/fi";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormActions, useFormData } from "@/lib/hooks";
import { useRouter } from "next/navigation";

// Schema for income page
const incomePageSchema = z.object({
  employmentInfo: z.object({
    employmentType: z.string().min(1, "Employment type is required"),
    industry: z.string().min(1, "Industry is required"),
    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters"),
    jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
    employmentStartDate: z.string().min(1, "Employment start date is required"),
    workExperience: z.string().min(1, "Work experience is required"),
  }),
  incomeSources: z
    .array(
      z.object({
        id: z.string(),
        type: z.string().min(1, "Income type is required"),
        source: z
          .string()
          .min(2, "Source description must be at least 2 characters"),
        amount: z
          .string()
          .min(1, "Amount is required")
          .refine(
            (val) => !isNaN(Number(val)) && Number(val) > 0,
            "Amount must be a positive number"
          ),
        frequency: z.string().min(1, "Frequency is required"),
        startDate: z.string().min(1, "Start date is required"),
        isStable: z.string().min(1, "Income stability is required"),
      })
    )
    .min(1, "At least one income source is required"),
  financialStability: z.object({
    monthlyExpenses: z
      .string()
      .min(1, "Monthly expenses are required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 0,
        "Monthly expenses must be a non-negative number"
      ),
    emergencyFund: z.string().optional(),
    otherMonthlyIncome: z.string().optional(),
    expectedIncomeGrowth: z
      .string()
      .min(1, "Expected income growth is required"),
  }),
});

type IncomePageFormData = z.infer<typeof incomePageSchema>;

export default function IncomePage() {
  const router = useRouter();
  const {
    setEmploymentInfo,
    setIncomeSources,
    setFinancialStability,
    nextStep,
  } = useFormActions();
  const formData = useFormData();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IncomePageFormData>({
    resolver: zodResolver(incomePageSchema),
    defaultValues: {
      employmentInfo: formData.employmentInfo,
      incomeSources: formData.incomeSources,
      financialStability: formData.financialStability,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "incomeSources",
  });

  const onSubmit = (data: IncomePageFormData) => {
    setEmploymentInfo(data.employmentInfo);
    setIncomeSources(data.incomeSources);
    setFinancialStability(data.financialStability);
    nextStep();
    router.push("/report/credit-history");
  };

  const addIncomeSource = () => {
    append({
      id: Date.now().toString(),
      type: "",
      source: "",
      amount: "",
      frequency: "monthly",
      startDate: "",
      isStable: "",
    });
  };

  const removeIncomeSource = (index: number) => {
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
                <FiDollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  Income Details
                </h1>
                <p className="text-white/90 text-base sm:text-lg">
                  Help us understand your financial stability and income sources
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8"
          >
            {/* Employment Information */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Employment Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Employment Type
                  </label>
                  <select
                    {...register("employmentInfo.employmentType")}
                    className={`input ${
                      errors.employmentInfo?.employmentType
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select Employment Type</option>
                    <option value="salaried">Salaried Employee</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="business-owner">Business Owner</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="contractor">Contractor</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                  {errors.employmentInfo?.employmentType && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentInfo.employmentType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Industry/Sector
                  </label>
                  <select
                    {...register("employmentInfo.industry")}
                    className={`input ${
                      errors.employmentInfo?.industry ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance & Banking</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail & E-commerce</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="government">Government</option>
                    <option value="non-profit">Non-profit</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.employmentInfo?.industry && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentInfo.industry.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Company/Business Name
                  </label>
                  <input
                    {...register("employmentInfo.companyName")}
                    type="text"
                    placeholder="Employer or Business Name"
                    className={`input ${
                      errors.employmentInfo?.companyName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.employmentInfo?.companyName && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentInfo.companyName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Job Title/Position
                  </label>
                  <input
                    {...register("employmentInfo.jobTitle")}
                    type="text"
                    placeholder="Your role or position"
                    className={`input ${
                      errors.employmentInfo?.jobTitle ? "border-red-500" : ""
                    }`}
                  />
                  {errors.employmentInfo?.jobTitle && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentInfo.jobTitle.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Employment Start Date
                  </label>
                  <input
                    {...register("employmentInfo.employmentStartDate")}
                    type="date"
                    className={`input ${
                      errors.employmentInfo?.employmentStartDate
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {errors.employmentInfo?.employmentStartDate && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentInfo.employmentStartDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Work Experience (Years)
                  </label>
                  <select
                    {...register("employmentInfo.workExperience")}
                    className={`input ${
                      errors.employmentInfo?.workExperience
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {errors.employmentInfo?.workExperience && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentInfo.workExperience.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Income Sources */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Income Sources
              </h2>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-slate-50  rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 "
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 ">
                      Income Source {index + 1}
                    </h3>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIncomeSource(index)}
                        className="cursor-pointer p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Income Type
                      </label>
                      <select
                        {...register(`incomeSources.${index}.type`)}
                        className={`input ${
                          errors.incomeSources?.[index]?.type
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Income Type</option>
                        <option value="salary">Salary/Wages</option>
                        <option value="business">Business Income</option>
                        <option value="freelance">Freelance/Contract</option>
                        <option value="investment">Investment Income</option>
                        <option value="rental">Rental Income</option>
                        <option value="pension">Pension/Retirement</option>
                        <option value="social-security">Social Security</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.incomeSources?.[index]?.type && (
                        <p className="text-red-500 text-sm">
                          {errors.incomeSources[index]?.type?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Source Description
                      </label>
                      <input
                        {...register(`incomeSources.${index}.source`)}
                        type="text"
                        placeholder="e.g., ABC Company, Freelance Projects"
                        className={`input ${
                          errors.incomeSources?.[index]?.source
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.incomeSources?.[index]?.source && (
                        <p className="text-red-500 text-sm">
                          {errors.incomeSources[index]?.source?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Amount (BDT)
                      </label>
                      <input
                        {...register(`incomeSources.${index}.amount`)}
                        type="number"
                        placeholder="0"
                        className={`input ${
                          errors.incomeSources?.[index]?.amount
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.incomeSources?.[index]?.amount && (
                        <p className="text-red-500 text-sm">
                          {errors.incomeSources[index]?.amount?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Frequency
                      </label>
                      <select
                        {...register(`incomeSources.${index}.frequency`)}
                        className={`input ${
                          errors.incomeSources?.[index]?.frequency
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-weekly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                        <option value="irregular">Irregular</option>
                      </select>
                      {errors.incomeSources?.[index]?.frequency && (
                        <p className="text-red-500 text-sm">
                          {errors.incomeSources[index]?.frequency?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Start Date
                      </label>
                      <input
                        {...register(`incomeSources.${index}.startDate`)}
                        type="date"
                        className={`input ${
                          errors.incomeSources?.[index]?.startDate
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.incomeSources?.[index]?.startDate && (
                        <p className="text-red-500 text-sm">
                          {errors.incomeSources[index]?.startDate?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 ">
                        Income Stability
                      </label>
                      <select
                        {...register(`incomeSources.${index}.isStable`)}
                        className={`input ${
                          errors.incomeSources?.[index]?.isStable
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Stability Level</option>
                        <option value="very-stable">Very Stable</option>
                        <option value="stable">Stable</option>
                        <option value="moderate">Moderately Stable</option>
                        <option value="unstable">Unstable</option>
                        <option value="very-unstable">Very Unstable</option>
                      </select>
                      {errors.incomeSources?.[index]?.isStable && (
                        <p className="text-red-500 text-sm">
                          {errors.incomeSources[index]?.isStable?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addIncomeSource}
                className="cursor-pointer w-full p-3 sm:p-4 border-2 border-dashed border-slate-300  rounded-xl sm:rounded-2xl text-slate-700  hover:border-[#199980] hover:text-[#199980] transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add Another Income Source
              </button>
            </div>

            {/* Financial Stability */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Financial Stability
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Monthly Expenses (BDT)
                  </label>
                  <input
                    {...register("financialStability.monthlyExpenses")}
                    type="number"
                    placeholder="Total monthly expenses"
                    className={`input ${
                      errors.financialStability?.monthlyExpenses
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {errors.financialStability?.monthlyExpenses && (
                    <p className="text-red-500 text-sm">
                      {errors.financialStability.monthlyExpenses.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Emergency Fund (BDT)
                  </label>
                  <input
                    {...register("financialStability.emergencyFund")}
                    type="number"
                    placeholder="Available emergency savings"
                    className="input"
                  />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Other Monthly Income
                  </label>
                  <input
                    {...register("financialStability.otherMonthlyIncome")}
                    type="number"
                    placeholder="Additional monthly income"
                    className="input"
                  />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <label className="block text-sm font-medium text-slate-800 ">
                    Expected Income Growth
                  </label>
                  <select
                    {...register("financialStability.expectedIncomeGrowth")}
                    className={`input ${
                      errors.financialStability?.expectedIncomeGrowth
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select growth expectation</option>
                    <option value="high">High (10%+ annually)</option>
                    <option value="moderate">Moderate (5-10% annually)</option>
                    <option value="low">Low (0-5% annually)</option>
                    <option value="declining">Declining</option>
                    <option value="uncertain">Uncertain</option>
                  </select>
                  {errors.financialStability?.expectedIncomeGrowth && (
                    <p className="text-red-500 text-sm">
                      {errors.financialStability.expectedIncomeGrowth.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6">
              <Link
                href="/report/introduction"
                className="cursor-pointer text-[#199980]  hover:text-[#158066]  font-medium transition-colors text-center sm:text-left w-full sm:w-auto"
              >
                ← Back to Introduction
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
                Continue to Credit History
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
