"use client";

import { useState, useCallback } from "react";
import { calculateRiniScore as calculateScore } from "./scoreCalculator";

// Form data types
interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  nationalId: string;
  mobileNumber: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

interface EmploymentInfo {
  employmentType: string;
  industry: string;
  companyName: string;
  jobTitle: string;
  employmentStartDate: string;
  workExperience: string;
}

interface IncomeSource {
  id: string;
  type: string;
  source: string;
  amount: string;
  frequency: string;
  startDate: string;
  isStable: string;
}

interface CreditAccount {
  id: string;
  lenderName: string;
  creditType: string;
  outstandingBalance: string;
  creditLimit: string;
  monthlyPayment: string;
  paymentStatus: string;
  accountOpenDate: string;
  lastPaymentDate: string;
}

interface CreditHistory {
  bankruptcy: string;
  accountsInCollections: string;
  creditInquiries: string;
  creditFreezeStatus: string;
}

interface FinancialStability {
  monthlyExpenses: string;
  emergencyFund?: string;
  otherMonthlyIncome?: string;
  expectedIncomeGrowth: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  employmentInfo: EmploymentInfo;
  incomeSources: IncomeSource[];
  financialStability: FinancialStability;
  creditAccounts: CreditAccount[];
  creditHistory: CreditHistory;
  consent: boolean;
}

interface ScoreResult {
  score: number;
  riskLevel: string;
  breakdown: {
    payment_history: number;
    credit_utilization: number;
    history_length: number;
    credit_mix: number;
    recent_activity: number;
    income_stability: number;
  };
  advice: string[];
  recommendations: string[];
}

// Load from localStorage or use defaults
const loadFormData = (): FormData => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("riniFormData");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Invalid data, use defaults
      }
    }
  }
  return {
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      nationalId: "",
      mobileNumber: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
    employmentInfo: {
      employmentType: "",
      industry: "",
      companyName: "",
      jobTitle: "",
      employmentStartDate: "",
      workExperience: "",
    },
    incomeSources: [],
    financialStability: {
      monthlyExpenses: "",
      emergencyFund: undefined,
      otherMonthlyIncome: undefined,
      expectedIncomeGrowth: "",
    },
    creditAccounts: [],
    creditHistory: {
      bankruptcy: "",
      accountsInCollections: "",
      creditInquiries: "",
      creditFreezeStatus: "",
    },
    consent: false,
  };
};

// Global state (in a real app, use Zustand, Redux, or Context)
// eslint-disable-next-line prefer-const
let formDataStore: FormData = loadFormData();

// Save to localStorage
const saveFormData = (data: FormData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("riniFormData", JSON.stringify(data));
  }
};

let scoreResultStore: ScoreResult | null = null;
let isLoadingStore = false;

// Hooks
export function useFormData(): FormData {
  return formDataStore;
}

export function useFormActions() {
  const setPersonalInfo = useCallback((info: PersonalInfo) => {
    formDataStore.personalInfo = info;
    saveFormData(formDataStore);
  }, []);

  const setEmploymentInfo = useCallback((info: EmploymentInfo) => {
    formDataStore.employmentInfo = info;
    saveFormData(formDataStore);
  }, []);

  const setIncomeSources = useCallback((sources: IncomeSource[]) => {
    formDataStore.incomeSources = sources;
    saveFormData(formDataStore);
  }, []);

  const setFinancialStability = useCallback((stability: FinancialStability) => {
    formDataStore.financialStability = stability;
    saveFormData(formDataStore);
  }, []);

  const setCreditAccounts = useCallback((accounts: CreditAccount[]) => {
    formDataStore.creditAccounts = accounts;
    saveFormData(formDataStore);
  }, []);

  const setCreditHistory = useCallback((history: CreditHistory) => {
    formDataStore.creditHistory = history;
    saveFormData(formDataStore);
  }, []);

  const setConsent = useCallback((consent: boolean) => {
    formDataStore.consent = consent;
    saveFormData(formDataStore);
  }, []);

  const nextStep = useCallback(() => {
    // Step tracking if needed
  }, []);

  return {
    setPersonalInfo,
    setEmploymentInfo,
    setIncomeSources,
    setFinancialStability,
    setCreditAccounts,
    setCreditHistory,
    setConsent,
    nextStep,
  };
}

export function useScoreResult(): ScoreResult | null {
  return scoreResultStore;
}

export function useIsLoading(): boolean {
  return isLoadingStore;
}

export function useCalculateRiniScore() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = useCallback(async (data: FormData) => {
    setIsPending(true);
    isLoadingStore = true;

    // Simulate API delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calculate score in frontend using the backend-aligned calculator
    const result = calculateScore({
      creditAccounts: data.creditAccounts.map((acc) => ({
        lenderName: acc.lenderName || "",
        creditType: acc.creditType || "",
        outstandingBalance: parseFloat(String(acc.outstandingBalance)) || 0,
        creditLimit: parseFloat(String(acc.creditLimit)) || 0,
        monthlyPayment: parseFloat(String(acc.monthlyPayment)) || 0,
        paymentStatus: acc.paymentStatus || "",
        accountOpenDate: acc.accountOpenDate || "",
        lastPaymentDate: acc.lastPaymentDate || "",
      })),
      incomeSources: data.incomeSources.map((src) => ({
        type: src.type || "",
        source: src.source || "",
        amount: parseFloat(String(src.amount)) || 0,
        frequency: src.frequency || "monthly",
        startDate: src.startDate || "",
        isStable: src.isStable || "",
      })),
      employmentInfo: {
        employmentType: data.employmentInfo.employmentType || "",
        industry: data.employmentInfo.industry || "",
        companyName: data.employmentInfo.companyName || "",
        jobTitle: data.employmentInfo.jobTitle || "",
        employmentStartDate: data.employmentInfo.employmentStartDate || "",
        workExperience: data.employmentInfo.workExperience || "",
      },
      financialStability: data.financialStability
        ? {
            monthlyExpenses:
              parseFloat(String(data.financialStability.monthlyExpenses)) || 0,
            emergencyFund:
              parseFloat(String(data.financialStability.emergencyFund)) || 0,
            otherMonthlyIncome:
              parseFloat(String(data.financialStability.otherMonthlyIncome)) ||
              0,
            expectedIncomeGrowth:
              data.financialStability.expectedIncomeGrowth || "",
          }
        : {},
      creditHistory: data.creditHistory || {
        bankruptcy: "",
        accountsInCollections: "",
        creditInquiries: "",
        creditFreezeStatus: "",
      },
    });
    scoreResultStore = result;
    isLoadingStore = false;
    setIsPending(false);

    return result;
  }, []);

  return {
    mutateAsync,
    isPending,
  };
}
