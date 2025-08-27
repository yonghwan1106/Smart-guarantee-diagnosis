interface DiagnosisInput {
  industry: number;
  revenue: number;
  businessPeriod: number;
  creditRating: number;
  existingDebt: number;
  hasCollateral: boolean;
  requestedAmount: number;
}

export const calculateApprovalProbability = (input: DiagnosisInput): number => {
  const weights = {
    creditRating: 0.3,    // 신용등급 (30%)
    revenue: 0.25,        // 매출액 (25%)  
    businessPeriod: 0.2,  // 사업기간 (20%)
    existingDebt: 0.15,   // 기존부채 (15%)
    collateral: 0.1       // 담보 (10%)
  }
  
  // 각 항목별 점수 계산 (0~100점)
  const creditScore = (11 - input.creditRating) * 10; // 1등급=100점
  const revenueScore = Math.min(input.revenue / 50000 * 100, 100);
  const periodScore = Math.min(input.businessPeriod * 20, 100);
  const debtScore = Math.max(100 - (input.existingDebt / input.revenue * 100), 0);
  const collateralScore = input.hasCollateral ? 100 : 50;
  
  // 가중평균 계산
  const totalScore = 
    creditScore * weights.creditRating +
    revenueScore * weights.revenue +
    periodScore * weights.businessPeriod +
    debtScore * weights.existingDebt +
    collateralScore * weights.collateral;
    
  return Math.round(totalScore);
}

export const calculateGuaranteeLimit = (input: DiagnosisInput, approvalProbability: number): number => {
  const baseLimit = input.revenue * 12 * 0.5; // 연매출의 50%
  const creditMultiplier = (11 - input.creditRating) * 0.1; // 신용등급별 배수
  const probabilityMultiplier = approvalProbability / 100;
  
  const estimatedLimit = baseLimit * creditMultiplier * probabilityMultiplier;
  
  // 최대 5억원 제한
  return Math.min(Math.round(estimatedLimit / 1000000) * 1000000, 500000000);
}

export const calculateGuaranteeFeeRate = (input: DiagnosisInput): number => {
  const baseRate = 1.5; // 기본 보증료율 1.5%
  const creditAdjustment = (input.creditRating - 1) * 0.1; // 신용등급별 조정
  const industryRiskAdjustment = getRiskAdjustment(input.industry);
  const amountAdjustment = input.requestedAmount > 100000000 ? 0.2 : 0; // 1억 초과 시 0.2% 추가
  
  const finalRate = baseRate + creditAdjustment + industryRiskAdjustment + amountAdjustment;
  
  return Math.round(finalRate * 10) / 10; // 소수점 첫째자리까지
}

export const getRiskLevel = (approvalProbability: number): string => {
  if (approvalProbability >= 85) return 'A';
  if (approvalProbability >= 75) return 'B';
  if (approvalProbability >= 60) return 'C';
  if (approvalProbability >= 45) return 'D';
  return 'E';
}

export const getRecommendationType = (approvalProbability: number): 'high_approval' | 'medium_approval' | 'low_approval' => {
  if (approvalProbability >= 75) return 'high_approval';
  if (approvalProbability >= 50) return 'medium_approval';
  return 'low_approval';
}

const getRiskAdjustment = (industryId: number): number => {
  const riskAdjustments: Record<number, number> = {
    1: 0.1,   // 음식업
    2: 0.2,   // 소매업
    3: -0.1,  // 제조업
    4: 0.4,   // 건설업
    5: 0.1,   // 서비스업
    6: 0.2,   // 도매업
    7: 0.3,   // 운수업
    8: 0.2,   // 숙박업
    9: -0.1,  // 교육서비스업
    10: -0.2, // 의료업
    11: 0.2,  // 농업
    12: -0.1, // IT서비스업
    13: 0.4,  // 부동산업
    14: 0.3,  // 문화예술업
    15: -0.1  // 금융보험업
  };
  
  return riskAdjustments[industryId] || 0.2;
}

export const generateDiagnosisResult = (input: DiagnosisInput) => {
  const approvalProbability = calculateApprovalProbability(input);
  const guaranteeLimit = calculateGuaranteeLimit(input, approvalProbability);
  const guaranteeFeeRate = calculateGuaranteeFeeRate(input);
  const riskLevel = getRiskLevel(approvalProbability);
  const recommendationType = getRecommendationType(approvalProbability);
  
  return {
    approvalProbability,
    guaranteeLimit,
    guaranteeFeeRate,
    riskLevel,
    recommendationType,
    input
  };
}