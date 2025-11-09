"use client";
import {
  FiCheckCircle,
  FiArrowLeft,
  FiDownload,
  FiLoader,
} from "react-icons/fi";
import Link from "next/link";
import {
  useFormData,
  useCalculateRiniScore,
  useScoreResult,
  useIsLoading,
} from "@/lib/hooks";
import { useEffect } from "react";

export default function ReviewPage() {
  const formData = useFormData();
  const scoreResult = useScoreResult();
  const isLoading = useIsLoading();
  const calculateScore = useCalculateRiniScore();

  const handleCalculateScore = async () => {
    try {
      await calculateScore.mutateAsync(formData);
      // The score result will be automatically set in the store
    } catch (error) {
      console.error("Failed to calculate score:", error);
      // You could add error handling UI here
    }
  };

  // Auto-calculate score when page loads if we don't have a result
  useEffect(() => {
    if (!scoreResult && !isLoading) {
      handleCalculateScore();
    }
  }, []);

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `BDT ${num.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-lg sm:shadow-xl overflow-hidden">
          {/* Header section */}
          <div className="bg-[#199980] p-4 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-white  flex items-center justify-center flex-shrink-0">
                <FiCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  Review Your Information
                </h1>
                <p className="text-white/90 text-base sm:text-lg">
                  Please confirm all details before generating your Rini Score
                  report
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8">
            {/* Personal Information Review */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Personal Information
              </h2>

              <div className="bg-slate-50  rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Full Name
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.personalInfo.fullName || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Date of Birth
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formatDate(formData.personalInfo.dateOfBirth)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      National ID
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.personalInfo.nationalId || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Mobile Number
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.personalInfo.mobileNumber || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Email Address
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.personalInfo.email || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Current Address
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.personalInfo.address &&
                      formData.personalInfo.city &&
                      formData.personalInfo.postalCode
                        ? `${formData.personalInfo.address}, ${formData.personalInfo.city} ${formData.personalInfo.postalCode}`
                        : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employment & Income Review */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Employment & Income
              </h2>

              <div className="bg-slate-50  rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Employment Type
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.employmentInfo.employmentType || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Industry
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.employmentInfo.industry || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Company
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.employmentInfo.companyName || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Position
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.employmentInfo.jobTitle || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Employment Start Date
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formatDate(formData.employmentInfo.employmentStartDate)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600 ">
                      Work Experience
                    </p>
                    <p className="font-medium text-slate-900  text-sm sm:text-base">
                      {formData.employmentInfo.workExperience || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Income Sources */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 ">
                  <h4 className="font-semibold text-slate-900  mb-3 sm:mb-4 text-base sm:text-lg">
                    Income Sources
                  </h4>
                  {formData.incomeSources.map((source) => (
                    <div key={source.id} className="mb-3 sm:mb-4 last:mb-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="text-slate-600 ">Type</p>
                          <p className="font-medium text-slate-900 ">
                            {source.type || "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 ">Amount</p>
                          <p className="font-medium text-slate-900 ">
                            {source.amount
                              ? formatCurrency(source.amount)
                              : "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 ">Frequency</p>
                          <p className="font-medium text-slate-900 ">
                            {source.frequency || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credit History Review */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Credit History
              </h2>

              <div className="bg-slate-50  rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 ">
                <div className="space-y-3 sm:space-y-4">
                  {formData.creditAccounts.map((account, index) => (
                    <div
                      key={account.id}
                      className={
                        index > 0
                          ? "border-t border-slate-200  pt-3 sm:pt-4"
                          : ""
                      }
                    >
                      <h4 className="font-semibold text-slate-900  mb-2 sm:mb-3 text-base sm:text-lg">
                        {account.creditType || "Credit Account"} -{" "}
                        {account.lenderName || "Unknown Lender"}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="text-slate-600 ">Outstanding Balance</p>
                          <p className="font-medium text-slate-900 ">
                            {account.outstandingBalance
                              ? formatCurrency(account.outstandingBalance)
                              : "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 ">
                            Credit Limit/Loan Amount
                          </p>
                          <p className="font-medium text-slate-900 ">
                            {account.creditLimit
                              ? formatCurrency(account.creditLimit)
                              : "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 ">Payment Status</p>
                          <p className="font-medium text-green-600">
                            {account.paymentStatus || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Result */}
            {scoreResult && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900  flex items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                  Your Rini Score
                </h2>

                <div className="bg-[#199980] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                    {scoreResult.score}
                  </div>
                  <div className="text-lg sm:text-xl mb-3 sm:mb-4">
                    out of 900
                  </div>
                  <div className="text-xl sm:text-2xl font-semibold mb-2">
                    {scoreResult.riskLevel}
                  </div>
                  <p className="text-white/90 text-sm sm:text-base">
                    Risk Level
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="bg-slate-50  rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 ">
                  <h4 className="font-semibold text-slate-900  mb-3 sm:mb-4 text-base sm:text-lg">
                    Score Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(scoreResult.breakdown).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="text-slate-700  capitalize text-sm sm:text-base">
                            {key.replace(/_/g, " ")}
                          </span>
                          <span className="font-semibold text-slate-900  text-sm sm:text-base">
                            {value}/100
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Advice */}
                {scoreResult.advice && scoreResult.advice.length > 0 && (
                  <div className="bg-[#199980]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#199980]/20">
                    <h4 className="font-semibold text-[#199980] mb-3 sm:mb-4 text-base sm:text-lg">
                      Advice
                    </h4>
                    <ul className="space-y-2">
                      {scoreResult.advice.map((advice, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 sm:gap-3 text-[#158066]  text-sm sm:text-base"
                        >
                          <span className="text-[#199980]  mt-1">•</span>
                          {advice}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {scoreResult.recommendations.length > 0 && (
                  <div className="bg-blue-50  rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 ">
                    <h4 className="font-semibold text-blue-800  mb-3 sm:mb-4 text-base sm:text-lg">
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {scoreResult.recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 sm:gap-3 text-blue-700  text-sm sm:text-base"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="bg-slate-50  rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-200  text-center">
                <FiLoader className="w-10 h-10 sm:w-12 sm:h-12 text-[#199980]  animate-spin mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900  mb-2">
                  Calculating Your Rini Score
                </h3>
                <p className="text-slate-700  text-sm sm:text-base">
                  Please wait while we process your information...
                </p>
              </div>
            )}

            {/* Consent Confirmation */}
            <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2 text-base sm:text-lg">
                    Consent Confirmed
                  </h3>
                  <p className="text-blue-700 text-xs sm:text-sm">
                    You have agreed to the terms and conditions and given
                    consent for RiniScore to process your data for generating
                    your credit score report. Your information will be handled
                    securely in accordance with our Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6">
              <Link
                href="/report/credit-history"
                className="cursor-pointer text-[#199980]  hover:text-[#158066]  font-medium transition-colors text-center sm:text-left w-full sm:w-auto"
              >
                <FiArrowLeft className="w-4 h-4 inline mr-2" />
                Back to Credit History
              </Link>

              {!scoreResult && !isLoading && (
                <button
                  onClick={handleCalculateScore}
                  disabled={calculateScore.isPending}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 ${
                    calculateScore.isPending
                      ? "bg-slate-400 cursor-not-allowed"
                      : "cursor-pointer bg-[#199980] hover:bg-[#158066] shadow-lg hover:shadow-xl transform hover:scale-105"
                  } text-white flex items-center justify-center gap-2 sm:gap-3`}
                >
                  {calculateScore.isPending ? (
                    <>
                      <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                      Generate Rini Score Report
                    </>
                  )}
                </button>
              )}

              {scoreResult && (
                <button
                  onClick={() => window.print()}
                  className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 bg-[#199980] hover:bg-[#158066] text-white shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Report
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
