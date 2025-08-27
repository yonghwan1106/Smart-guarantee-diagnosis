export const formatCurrency = (amount) => {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(1)}억원`;
  }
  if (amount >= 10000000) {
    return `${(amount / 10000).toFixed(0)}만원`;
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(1)}만원`;
  }
  return `${amount.toLocaleString()}원`;
}

export const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`;
}

export const getRiskLevelColor = (level) => {
  const colors = {
    'A': 'text-green-600 bg-green-50',
    'B': 'text-blue-600 bg-blue-50',
    'C': 'text-yellow-600 bg-yellow-50',
    'D': 'text-orange-600 bg-orange-50',
    'E': 'text-red-600 bg-red-50'
  };
  return colors[level] || colors['E'];
}

export const getApprovalProbabilityColor = (probability) => {
  if (probability >= 85) return 'text-green-600';
  if (probability >= 75) return 'text-blue-600';
  if (probability >= 60) return 'text-yellow-600';
  if (probability >= 45) return 'text-orange-600';
  return 'text-red-600';
}

export const getProgressBarColor = (probability) => {
  if (probability >= 85) return 'bg-green-500';
  if (probability >= 75) return 'bg-blue-500';
  if (probability >= 60) return 'bg-yellow-500';
  if (probability >= 45) return 'bg-orange-500';
  return 'bg-red-500';
}

export const validateDiagnosisInput = (input) => {
  const errors = {};
  
  if (!input.industry || input.industry < 1 || input.industry > 15) {
    errors.industry = '업종을 선택해주세요';
  }
  
  if (!input.revenue || input.revenue < 0) {
    errors.revenue = '월 평균 매출액을 입력해주세요';
  }
  
  if (!input.businessPeriod || input.businessPeriod < 0.5) {
    errors.businessPeriod = '사업 기간을 선택해주세요';
  }
  
  if (!input.creditRating || input.creditRating < 1 || input.creditRating > 10) {
    errors.creditRating = '신용등급을 선택해주세요';
  }
  
  if (input.existingDebt < 0) {
    errors.existingDebt = '기존 대출금액을 올바르게 입력해주세요';
  }
  
  if (!input.requestedAmount || input.requestedAmount < 1000000) {
    errors.requestedAmount = '보증 신청 희망금액을 입력해주세요 (최소 100만원)';
  }
  
  if (input.hasCollateral === undefined || input.hasCollateral === null) {
    errors.hasCollateral = '담보 보유 여부를 선택해주세요';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export const getBusinessPeriodText = (period) => {
  if (period < 1) return '1년 미만';
  if (period < 2) return '1년 이상 2년 미만';
  if (period < 3) return '2년 이상 3년 미만';
  if (period < 5) return '3년 이상 5년 미만';
  if (period < 10) return '5년 이상 10년 미만';
  return '10년 이상';
}

export const getCreditRatingText = (rating) => {
  const texts = {
    1: '1등급 (최우수)',
    2: '2등급 (우수)',
    3: '3등급 (양호)',
    4: '4등급 (일반)',
    5: '5등급 (보통)',
    6: '6등급 (주의)',
    7: '7등급 (경계)',
    8: '8등급 (위험)',
    9: '9등급 (매우위험)',
    10: '10등급 (최고위험)'
  };
  return texts[rating] || `${rating}등급`;
}

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const generateRandomStats = () => {
  const baseCount = Math.floor(Math.random() * 50) + 1200;
  return {
    ...require('../data/statistics.json'),
    totalDiagnosisToday: baseCount,
    recentActivity: {
      lastHourDiagnosis: Math.floor(Math.random() * 20) + 30,
      peakHours: "오전 10시~12시",
      mostActiveDay: "화요일"
    }
  };
}