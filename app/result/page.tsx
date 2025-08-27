'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { generateDiagnosisResult } from '@/lib/calculate'
import { formatCurrency, getRiskLevelColor, getApprovalProbabilityColor, getProgressBarColor } from '@/lib/utils'
import industriesData from '@/data/industries.json'
import recommendationsData from '@/data/recommendations.json'

interface DiagnosisResult {
  approvalProbability: number
  guaranteeLimit: number
  guaranteeFeeRate: number
  riskLevel: string
  recommendationType: 'high_approval' | 'medium_approval' | 'low_approval'
  input: any
}

function ResultContent() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const params = {
      industry: parseInt(searchParams.get('industry') || '1'),
      revenue: parseInt(searchParams.get('revenue') || '10000000'),
      businessPeriod: parseFloat(searchParams.get('businessPeriod') || '1'),
      creditRating: parseInt(searchParams.get('creditRating') || '5'),
      existingDebt: parseInt(searchParams.get('existingDebt') || '0'),
      hasCollateral: searchParams.get('hasCollateral') === 'true',
      requestedAmount: parseInt(searchParams.get('requestedAmount') || '30000000')
    }

    // 시뮬레이션: 계산 시간
    setTimeout(() => {
      const diagnosisResult = generateDiagnosisResult(params)
      setResult(diagnosisResult)
      setIsLoading(false)
    }, 2000)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-8"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI가 분석 중입니다...</h2>
            <p className="text-gray-600 mb-8">
              15개 업종 데이터와 신용평가 모델을 기반으로<br />
              정밀한 보증 승인 확률을 계산하고 있습니다.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">✓ 업종별 특성 분석 완료</div>
              <div className="text-sm text-gray-500">✓ 신용평가 모델 적용 중</div>
              <div className="text-sm text-blue-600">✓ 맞춤형 개선방안 생성 중...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) return null

  const industry = industriesData.industries.find(i => i.id === result.input.industry)
  const recommendation = recommendationsData.recommendations[result.recommendationType]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            진단 결과
          </h1>
          <p className="text-gray-600">
            AI 분석 결과를 바탕으로 맞춤형 보증 진단을 제공합니다.
          </p>
        </div>

        {/* Main Result */}
        <Card className="mb-8 border-0 shadow-xl bg-white">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="mb-4">
                <div className={`text-6xl font-bold mb-2 ${getApprovalProbabilityColor(result.approvalProbability)}`}>
                  {result.approvalProbability}%
                </div>
                <div className="text-xl text-gray-600 mb-4">보증 승인 확률</div>
              </div>
              
              <div className="mb-6">
                <Progress 
                  value={result.approvalProbability} 
                  className="h-4 mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(result.guaranteeLimit)}</div>
                  <div className="text-sm text-gray-500">예상 보증한도</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.guaranteeFeeRate}%</div>
                  <div className="text-sm text-gray-500">적용 보증료율</div>
                </div>
                <div className="text-center">
                  <Badge className={`text-lg px-4 py-1 ${getRiskLevelColor(result.riskLevel)}`}>
                    {result.riskLevel} 등급
                  </Badge>
                  <div className="text-sm text-gray-500 mt-1">위험도 등급</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Input Summary */}
          <Card>
            <CardHeader>
              <CardTitle>입력 정보 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">업종</span>
                <span className="font-medium">{industry?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">월 평균 매출</span>
                <span className="font-medium">{formatCurrency(result.input.revenue / 10000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">사업 기간</span>
                <span className="font-medium">{result.input.businessPeriod}년</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">신용등급</span>
                <span className="font-medium">{result.input.creditRating}등급</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">기존 대출</span>
                <span className="font-medium">{formatCurrency(result.input.existingDebt / 10000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">담보</span>
                <span className="font-medium">{result.input.hasCollateral ? '있음' : '없음'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">신청 희망금액</span>
                <span className="font-medium">{formatCurrency(result.input.requestedAmount / 10000)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Industry Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>업종 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{industry?.name}</span>
                  <Badge className={getRiskLevelColor(industry?.riskLevel || 'C')}>
                    {industry?.riskLevel} 등급
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{industry?.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">업종 평균 승인률</span>
                  <span className="font-medium">{industry?.avgApprovalRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">귀하의 승인률</span>
                  <span className={`font-medium ${getApprovalProbabilityColor(result.approvalProbability)}`}>
                    {result.approvalProbability}%
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  {result.approvalProbability > (industry?.avgApprovalRate || 70) 
                    ? `업종 평균보다 ${result.approvalProbability - (industry?.avgApprovalRate || 70)}%p 높습니다!` 
                    : `업종 평균보다 ${(industry?.avgApprovalRate || 70) - result.approvalProbability}%p 낮습니다.`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{recommendation.title}</CardTitle>
            <CardDescription className="text-base">
              {recommendation.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">추천 행동사항</h4>
                <ul className="space-y-2">
                  {recommendation.actions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">개선 팁</h4>
                <ul className="space-y-2">
                  {recommendation.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">💡</span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {recommendation.alternatives && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">대안 금융상품</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {recommendation.alternatives.map((alt, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-1">{alt.name}</h5>
                      <p className="text-sm text-gray-600 mb-2">{alt.description}</p>
                      <div className="text-sm">
                        <span className="text-green-600">{alt.rate}</span>
                        <span className="text-gray-500 ml-2">최대 {alt.maxAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnosis">
              <Button size="lg" variant="outline" className="px-8">
                다시 진단하기
              </Button>
            </Link>
            <Link href="/stats">
              <Button size="lg" variant="outline" className="px-8">
                통계 보기
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            이 결과는 참고용이며, 실제 심사 결과와 다를 수 있습니다.
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 text-center">
          <div className="inline-block p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-2">
              스마트 보증진단으로 3분 만에 확인해보세요!
            </p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              👆 서비스 바로가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}