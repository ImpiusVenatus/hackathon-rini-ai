"use client";
import Link from "next/link";
import { UploadField } from "@/components/report/UploadField";
import { FiUser, FiShield, FiCheck, FiArrowRight } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, PersonalInfo } from "@/lib/validation";
import { useFormActions, useFormData } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IntroductionPage() {
  const router = useRouter();
  const { setPersonalInfo, nextStep, setConsent } = useFormActions();
  const formData = useFormData();
  const [consent, setConsentState] = useState(formData.consent);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo,
    mode: "onChange",
  });

  const onSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data);
    setConsent(consent);
    nextStep();
    router.push("/report/income");
  };

  const handleConsentChange = (checked: boolean) => {
    setConsentState(checked);
    setConsent(checked);
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-lg sm:shadow-xl overflow-hidden">
          {/* Header section */}
          <div className="bg-[#199980] p-4 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <FiUser className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  Welcome to RiniScore
                </h1>
                <p className="text-white/90 text-base sm:text-lg">
                  Let&apos;s get started with your basic information
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8"
          >
            {/* Personal Information */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Full Name (as per NID/Passport)"
                    className={`input ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    {...register("dateOfBirth")}
                    type="date"
                    className={`input ${
                      errors.dateOfBirth ? "border-red-500" : ""
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    {...register("nationalId")}
                    type="text"
                    placeholder="National ID or Passport Number"
                    className={`input ${
                      errors.nationalId ? "border-red-500" : ""
                    }`}
                  />
                  {errors.nationalId && (
                    <p className="text-red-500 text-sm">
                      {errors.nationalId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    {...register("mobileNumber")}
                    type="tel"
                    placeholder="Mobile Number"
                    className={`input ${
                      errors.mobileNumber ? "border-red-500" : ""
                    }`}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className={`input ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Current Address
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="House / Flat No, Street / Area"
                    className={`input ${
                      errors.address ? "border-red-500" : ""
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <input
                      {...register("city")}
                      type="text"
                      placeholder="City"
                      className={`input ${errors.city ? "border-red-500" : ""}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      {...register("postalCode")}
                      type="text"
                      placeholder="Postal Code"
                      className={`input ${
                        errors.postalCode ? "border-red-500" : ""
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-[#199980] rounded-full"></div>
                Identity Verification
              </h2>

              <div className="max-w-2xl">
                <UploadField label="Identity Document" />
              </div>
            </div>

            {/* Consent Section */}
            <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-[#199980] text-white flex items-center justify-center flex-shrink-0">
                    <FiShield className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                      Privacy & Consent
                    </h2>
                    <p className="text-slate-700 text-sm sm:text-base">
                      Your data security is our priority
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200">
                  <p className="text-slate-800 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    By continuing, you authorize{" "}
                    <span className="font-semibold text-[#199980]">
                      RiniScore
                    </span>{" "}
                    to access your credit, financial, and alternative data from
                    approved institutions, and process it for generating your
                    Rini Score and report. Your data will be handled in
                    accordance with our
                    <Link
                      href="/privacy"
                      className="cursor-pointer text-[#199980] hover:text-[#158066] underline underline-offset-2 ml-1 font-medium transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>

                  <label className="flex items-start gap-3 sm:gap-4 group cursor-pointer">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={consent}
                        onChange={(e) => handleConsentChange(e.target.checked)}
                      />
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                          consent
                            ? "bg-[#199980] border-[#199980] shadow-md"
                            : "border-slate-300 bg-white hover:border-[#199980]"
                        }`}
                      >
                        {consent && (
                          <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-slate-900 leading-relaxed group-hover:text-slate-950 transition-colors text-sm sm:text-base">
                      I have read and agree to the terms and conditions, and I
                      give consent to process my data.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {!consent && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-700 bg-amber-50 px-3 sm:px-4 py-2 rounded-full border border-amber-200 w-full sm:w-auto justify-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    Please accept to continue
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isValid || !consent}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 ${
                    isValid && consent
                      ? "cursor-pointer bg-[#199980] hover:bg-[#158066] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Continue to Next Step
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
