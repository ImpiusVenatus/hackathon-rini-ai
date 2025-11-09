// Rini Score Calculation Utility
// Based on FastAPI backend logic

interface CreditAccount {
  lenderName: string;
  creditType: string;
  outstandingBalance: number;
  creditLimit: number;
  monthlyPayment: number;
  paymentStatus: string;
  accountOpenDate: string;
  lastPaymentDate: string;
}

interface IncomeSource {
  type: string;
  source: string;
  amount: number;
  frequency: string;
  startDate: string;
  isStable: string;
}

interface EmploymentInfo {
  employmentType: string;
  industry: string;
  companyName: string;
  jobTitle: string;
  employmentStartDate: string;
  workExperience: string;
}

interface FinancialStability {
  monthlyExpenses?: number;
  emergencyFund?: number;
  otherMonthlyIncome?: number;
  expectedIncomeGrowth?: string;
}

interface CreditHistory {
  bankruptcy?: string;
  accountsInCollections?: string;
  creditInquiries?: string;
  creditFreezeStatus?: string;
}

interface ScoreCalculationData {
  creditAccounts: CreditAccount[];
  incomeSources: IncomeSource[];
  employmentInfo: EmploymentInfo;
  financialStability?: FinancialStability;
  creditHistory?: CreditHistory;
}

interface ScoreResult {
  score: number;
  breakdown: {
    payment_history: number;
    credit_utilization: number;
    history_length: number;
    credit_mix: number;
    recent_activity: number;
    income_stability: number;
  };
  riskLevel: string;
  advice: string[];
  recommendations: string[];
}

/**
 * Calculate payment history score based on payment status (0-100)
 */
function calculatePaymentHistoryScore(creditAccounts: CreditAccount[]): number {
  if (!creditAccounts || creditAccounts.length === 0) {
    return 50.0; // Neutral score for no credit history
  }

  let totalScore = 0;
  for (const account of creditAccounts) {
    const status = account.paymentStatus?.toLowerCase() || "";
    if (status.includes("current") || status.includes("paid")) {
      totalScore += 100;
    } else if (status.includes("30") || status.includes("late")) {
      totalScore += 70;
    } else if (status.includes("60")) {
      totalScore += 40;
    } else if (status.includes("90")) {
      totalScore += 20;
    } else if (status.includes("120")) {
      totalScore += 10;
    } else if (
      status.includes("charged") ||
      status.includes("off") ||
      status.includes("default")
    ) {
      totalScore += 0;
    } else {
      // Unknown status - neutral
      totalScore += 50;
    }
  }

  return Math.min(totalScore / creditAccounts.length, 100.0);
}

/**
 * Calculate credit utilization score (0-100)
 */
function calculateCreditUtilizationScore(
  creditAccounts: CreditAccount[]
): number {
  if (!creditAccounts || creditAccounts.length === 0) {
    return 50.0;
  }

  let totalUtilization = 0;
  let accountsWithLimit = 0;

  for (const account of creditAccounts) {
    const limit = parseFloat(String(account.creditLimit)) || 0;
    if (limit > 0) {
      const balance = parseFloat(String(account.outstandingBalance)) || 0;
      const utilization = (balance / limit) * 100;
      totalUtilization += utilization;
      accountsWithLimit++;
    }
  }

  if (accountsWithLimit === 0) {
    return 50.0;
  }

  const avgUtilization = totalUtilization / accountsWithLimit;

  // Lower utilization = better score
  if (avgUtilization <= 10) {
    return 100.0;
  } else if (avgUtilization <= 30) {
    return 90.0;
  } else if (avgUtilization <= 50) {
    return 70.0;
  } else if (avgUtilization <= 70) {
    return 50.0;
  } else if (avgUtilization <= 90) {
    return 30.0;
  } else {
    return 10.0;
  }
}

/**
 * Calculate financial history length score (0-100)
 */
function calculateHistoryLengthScore(
  creditAccounts: CreditAccount[],
  employment: EmploymentInfo
): number {
  if (!creditAccounts || creditAccounts.length === 0) {
    return 50.0;
  }

  const now = new Date();
  let totalYears = 0;
  let accountsWithDate = 0;

  for (const account of creditAccounts) {
    if (account.accountOpenDate) {
      try {
        const openDate = new Date(account.accountOpenDate);
        const yearsOpen =
          (now.getTime() - openDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        if (yearsOpen > 0) {
          totalYears += yearsOpen;
          accountsWithDate++;
        }
      } catch {
        // Invalid date, skip
      }
    }
  }

  // Also consider employment history
  if (employment.employmentStartDate) {
    try {
      const empDate = new Date(employment.employmentStartDate);
      const yearsEmp =
        (now.getTime() - empDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      if (yearsEmp > 0) {
        totalYears += yearsEmp;
        accountsWithDate++;
      }
    } catch {
      // Invalid date, skip
    }
  }

  if (accountsWithDate === 0) {
    return 25.0;
  }

  const avgYears = totalYears / accountsWithDate;

  // Map years to score
  if (avgYears >= 10) {
    return 100.0;
  } else if (avgYears >= 7) {
    return 85.0;
  } else if (avgYears >= 5) {
    return 70.0;
  } else if (avgYears >= 3) {
    return 55.0;
  } else if (avgYears >= 1) {
    return 40.0;
  } else {
    return 25.0;
  }
}

/**
 * Calculate credit mix diversity score (0-100)
 */
function calculateCreditMixScore(creditAccounts: CreditAccount[]): number {
  if (!creditAccounts || creditAccounts.length === 0) {
    return 50.0;
  }

  const creditTypes = new Set(
    creditAccounts.map((account) => account.creditType?.toLowerCase() || "")
  );

  const uniqueTypes = creditTypes.size;

  if (uniqueTypes >= 4) {
    return 100.0;
  } else if (uniqueTypes === 3) {
    return 80.0;
  } else if (uniqueTypes === 2) {
    return 60.0;
  } else {
    return 40.0;
  }
}

/**
 * Calculate recent credit activity score (0-100)
 */
function calculateRecentActivityScore(creditHistory?: CreditHistory): number {
  if (!creditHistory || !creditHistory.creditInquiries) {
    return 70.0; // Default neutral score
  }

  const inquiries = creditHistory.creditInquiries.toLowerCase();

  if (
    inquiries.includes("0") ||
    inquiries.includes("1") ||
    inquiries.includes("2")
  ) {
    return 100.0;
  } else if (
    inquiries.includes("3") ||
    inquiries.includes("4") ||
    inquiries.includes("5")
  ) {
    return 80.0;
  } else if (
    inquiries.includes("6") ||
    inquiries.includes("7") ||
    inquiries.includes("8") ||
    inquiries.includes("9") ||
    inquiries.includes("10")
  ) {
    return 60.0;
  } else {
    return 40.0;
  }
}

/**
 * Calculate income stability score (0-100)
 */
function calculateIncomeStabilityScore(
  incomeSources: IncomeSource[],
  financial?: FinancialStability
): number {
  if (!incomeSources || incomeSources.length === 0) {
    return 50.0;
  }

  // Calculate total monthly income
  let totalMonthlyIncome = 0;
  for (const source of incomeSources) {
    const amount = parseFloat(String(source.amount)) || 0;
    const frequency = source.frequency?.toLowerCase() || "monthly";

    if (frequency.includes("monthly")) {
      totalMonthlyIncome += amount;
    } else if (frequency.includes("weekly")) {
      totalMonthlyIncome += amount * 4.33;
    } else if (frequency.includes("yearly") || frequency.includes("annual")) {
      totalMonthlyIncome += amount / 12;
    } else {
      // Assume monthly if unknown
      totalMonthlyIncome += amount;
    }
  }

  // Add other monthly income if available
  if (financial?.otherMonthlyIncome) {
    totalMonthlyIncome += parseFloat(String(financial.otherMonthlyIncome));
  }

  const expenses = financial?.monthlyExpenses
    ? parseFloat(String(financial.monthlyExpenses))
    : 0;

  if (totalMonthlyIncome <= 0) {
    return 50.0;
  }

  if (expenses <= 0) {
    // No expense data - score based on income amount and stability
    if (totalMonthlyIncome > 50000) {
      return 90.0;
    } else if (totalMonthlyIncome > 30000) {
      return 80.0;
    } else if (totalMonthlyIncome > 20000) {
      return 70.0;
    } else if (totalMonthlyIncome > 10000) {
      return 60.0;
    } else {
      return 50.0;
    }
  }

  // Calculate debt-to-income ratio
  const dtiRatio = expenses / totalMonthlyIncome;

  // Lower DTI = better score
  if (dtiRatio <= 0.3) {
    return 100.0;
  } else if (dtiRatio <= 0.5) {
    return 80.0;
  } else if (dtiRatio <= 0.7) {
    return 60.0;
  } else if (dtiRatio <= 0.9) {
    return 40.0;
  } else {
    return 20.0;
  }
}

/**
 * Determine risk level based on score
 */
function determineRiskLevel(score: number): string {
  if (score >= 750) {
    return "Excellent";
  } else if (score >= 650) {
    return "Good";
  } else if (score >= 550) {
    return "Fair";
  } else if (score >= 450) {
    return "Poor";
  } else {
    return "Very Poor";
  }
}

/**
 * Generate personalized advice and recommendations
 */
function generateAdviceAndRecommendations(
  data: ScoreCalculationData,
  score: number,
  breakdown: ScoreResult["breakdown"]
): { advice: string[]; recommendations: string[] } {
  const advice: string[] = [];
  const recommendations: string[] = [];

  // Payment history advice
  if (breakdown.payment_history < 80) {
    advice.push("Improve payment history by avoiding missed or late payments.");
    recommendations.push("Set up automatic payments for all credit accounts");
    recommendations.push(
      "Contact lenders immediately if you anticipate payment difficulties"
    );
  }

  // Credit utilization advice
  if (breakdown.credit_utilization < 70) {
    advice.push("Reduce credit utilization below 30% of your credit limit.");
    recommendations.push("Pay down high-balance credit cards first");
    recommendations.push(
      "Request credit limit increases from existing lenders"
    );
  }

  // History length advice
  if (breakdown.history_length < 50) {
    advice.push("Maintain longer credit history for better scoring.");
    recommendations.push("Keep old credit accounts open and active");
    recommendations.push("Avoid closing accounts with long payment history");
  }

  // Credit mix advice
  if (breakdown.credit_mix < 50) {
    advice.push("Diversify your credit types for better scoring.");
    recommendations.push("Consider a mix of revolving and installment credit");
    recommendations.push("Apply for different types of credit gradually");
  }

  // Recent activity advice
  if (breakdown.recent_activity < 70) {
    advice.push("Avoid too many recent credit applications.");
    recommendations.push("Space out credit applications by 6-12 months");
    recommendations.push("Only apply for credit when necessary");
  }

  // Income stability advice
  if (breakdown.income_stability < 50) {
    advice.push("Improve your debt-to-income ratio.");
    recommendations.push(
      "Increase your income through side hustles or career advancement"
    );
    recommendations.push("Reduce monthly expenses and create a budget");
  }

  // General recommendations based on score
  if (score < 500) {
    recommendations.push("Focus on building positive payment history");
    recommendations.push("Consider secured credit cards to rebuild credit");
    recommendations.push("Work with a credit counselor to develop a plan");
  } else if (score < 650) {
    recommendations.push("Continue making on-time payments");
    recommendations.push("Gradually reduce credit utilization");
    recommendations.push("Monitor your credit report regularly");
  } else {
    recommendations.push("Maintain your excellent credit habits");
    recommendations.push("Consider premium credit products with better terms");
    recommendations.push("Use your good credit to negotiate better rates");
  }

  return { advice, recommendations };
}

/**
 * Main function to calculate Rini Score (300-900 range)
 */
export function calculateRiniScore(data: ScoreCalculationData): ScoreResult {
  // 1. Calculate sub-scores (0-100 scale)
  const paymentHistoryScore = calculatePaymentHistoryScore(data.creditAccounts);
  const creditUtilizationScore = calculateCreditUtilizationScore(
    data.creditAccounts
  );
  const historyLengthScore = calculateHistoryLengthScore(
    data.creditAccounts,
    data.employmentInfo
  );
  const creditMixScore = calculateCreditMixScore(data.creditAccounts);
  const recentActivityScore = calculateRecentActivityScore(data.creditHistory);
  const incomeStabilityScore = calculateIncomeStabilityScore(
    data.incomeSources,
    data.financialStability
  );

  // 2. Calculate weighted score (0-100)
  const score0_100 =
    0.3 * paymentHistoryScore +
    0.25 * creditUtilizationScore +
    0.15 * historyLengthScore +
    0.1 * creditMixScore +
    0.1 * recentActivityScore +
    0.1 * incomeStabilityScore;

  // 3. Map to 300-900 range
  const finalScore = Math.round(300 + score0_100 * 6);

  // 4. Determine risk level
  const riskLevel = determineRiskLevel(finalScore);

  // 5. Generate advice and recommendations
  const breakdown = {
    payment_history: Math.round(paymentHistoryScore * 10) / 10,
    credit_utilization: Math.round(creditUtilizationScore * 10) / 10,
    history_length: Math.round(historyLengthScore * 10) / 10,
    credit_mix: Math.round(creditMixScore * 10) / 10,
    recent_activity: Math.round(recentActivityScore * 10) / 10,
    income_stability: Math.round(incomeStabilityScore * 10) / 10,
  };

  const { advice, recommendations } = generateAdviceAndRecommendations(
    data,
    finalScore,
    breakdown
  );

  return {
    score: Math.max(300, Math.min(900, finalScore)), // Clamp between 300-900
    breakdown,
    riskLevel,
    advice,
    recommendations,
  };
}
