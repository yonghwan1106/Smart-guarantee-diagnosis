import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number): string => {
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

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
}

export const getRiskLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    'A': 'text-green-600 bg-green-50',
    'B': 'text-blue-600 bg-blue-50',
    'C': 'text-yellow-600 bg-yellow-50',
    'D': 'text-orange-600 bg-orange-50',
    'E': 'text-red-600 bg-red-50'
  };
  return colors[level] || colors['E'];
}

export const getApprovalProbabilityColor = (probability: number): string => {
  if (probability >= 85) return 'text-green-600';
  if (probability >= 75) return 'text-blue-600';
  if (probability >= 60) return 'text-yellow-600';
  if (probability >= 45) return 'text-orange-600';
  return 'text-red-600';
}

export const getProgressBarColor = (probability: number): string => {
  if (probability >= 85) return 'bg-green-500';
  if (probability >= 75) return 'bg-blue-500';
  if (probability >= 60) return 'bg-yellow-500';
  if (probability >= 45) return 'bg-orange-500';
  return 'bg-red-500';
}