'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft, ArrowRight, Shield, Sparkles } from 'lucide-react'
import industriesData from '@/data/industries.json'

interface DiagnosisInput {
  industry: number | null
  revenue: number[]
  businessPeriod: number
  creditRating: number | null
  existingDebt: number[]
  hasCollateral: boolean | null
  requestedAmount: number[]
}

export default function DiagnosisPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<DiagnosisInput>({
    industry: null,
    revenue: [1000], // 만원 단위
    businessPeriod: 1,
    creditRating: null,
    existingDebt: [0], // 만원 단위
    hasCollateral: null,
    requestedAmount: [3000] // 만원 단위
  })

  const totalSteps = 7
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // 진단 완료, 결과 페이지로 이동
      const queryParams = new URLSearchParams({
        industry: formData.industry?.toString() || '',
        revenue: (formData.revenue[0] * 10000).toString(), // 원 단위로 변환
        businessPeriod: formData.businessPeriod.toString(),
        creditRating: formData.creditRating?.toString() || '',
        existingDebt: (formData.existingDebt[0] * 10000).toString(), // 원 단위로 변환
        hasCollateral: formData.hasCollateral?.toString() || '',
        requestedAmount: (formData.requestedAmount[0] * 10000).toString() // 원 단위로 변환
      })
      router.push(`/result?${queryParams}`)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.industry !== null
      case 2: return formData.revenue[0] > 0
      case 3: return formData.businessPeriod > 0
      case 4: return formData.creditRating !== null
      case 5: return formData.existingDebt[0] >= 0
      case 6: return formData.hasCollateral !== null
      case 7: return formData.requestedAmount[0] > 0
      default: return false
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000) {
      return `${(amount / 10000).toFixed(1)}억원`
    }
    return `${amount.toLocaleString()}만원`
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="glass-effect border border-white/20 card-hover">
            <CardHeader>
              <CardTitle className="text-2xl text-white">업종을 선택해주세요</CardTitle>
              <CardDescription className="text-white/80 text-base leading-relaxed">
                사업하고 계신 업종을 선택하시면, 업종별 특성을 반영한 정확한 분석이 가능합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select 
                value={formData.industry?.toString() || ""} 
                onValueChange={(value) => setFormData({...formData, industry: parseInt(value)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="업종을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {industriesData.industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id.toString()}>
                      <div className="flex justify-between items-center w-full">
                        <span>{industry.name}</span>
                        <Badge variant="outline" className="ml-2">
                          평균 {industry.avgApprovalRate}%
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.industry && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {industriesData.industries.find(i => i.id === formData.industry)?.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>월 평균 매출액을 입력해주세요</CardTitle>
              <CardDescription>
                최근 6개월 평균 매출액을 기준으로 입력해주세요. 정확할수록 더 정밀한 분석이 가능합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>월 평균 매출액: {formatCurrency(formData.revenue[0])}</Label>
                <div className="mt-4">
                  <Slider
                    value={formData.revenue}
                    onValueChange={(value) => setFormData({...formData, revenue: value})}
                    max={10000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>100만원</span>
                  <span>1억원</span>
                </div>
              </div>
              <div>
                <Label htmlFor="revenueInput">직접 입력 (만원)</Label>
                <Input
                  id="revenueInput"
                  type="number"
                  value={formData.revenue[0]}
                  onChange={(e) => setFormData({...formData, revenue: [parseInt(e.target.value) || 0]})}
                  placeholder="매출액을 만원 단위로 입력"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>사업 기간을 선택해주세요</CardTitle>
              <CardDescription>
                현재 업종으로 사업을 시작한 시점부터 계산해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.businessPeriod.toString()} 
                onValueChange={(value) => setFormData({...formData, businessPeriod: parseFloat(value)})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">6개월 미만</SelectItem>
                  <SelectItem value="1">1년 미만</SelectItem>
                  <SelectItem value="2">1년 이상 2년 미만</SelectItem>
                  <SelectItem value="3">2년 이상 3년 미만</SelectItem>
                  <SelectItem value="5">3년 이상 5년 미만</SelectItem>
                  <SelectItem value="7">5년 이상 7년 미만</SelectItem>
                  <SelectItem value="10">7년 이상 10년 미만</SelectItem>
                  <SelectItem value="15">10년 이상</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>신용등급을 선택해주세요</CardTitle>
              <CardDescription>
                개인 또는 대표자의 신용등급을 선택해주세요. 정확하지 않다면 추정 등급을 선택하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({length: 10}, (_, i) => i + 1).map((grade) => (
                  <Button
                    key={grade}
                    variant={formData.creditRating === grade ? "default" : "outline"}
                    onClick={() => setFormData({...formData, creditRating: grade})}
                    className="h-12"
                  >
                    <div className="text-center">
                      <div className="font-semibold">{grade}등급</div>
                      <div className="text-xs opacity-75">
                        {grade <= 3 ? '우수' : grade <= 6 ? '보통' : '주의'}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>기존 대출금액을 입력해주세요</CardTitle>
              <CardDescription>
                현재 상환 중인 모든 대출(사업자대출, 개인대출 포함)의 총 잔액을 입력해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>기존 대출금액: {formatCurrency(formData.existingDebt[0])}</Label>
                <div className="mt-4">
                  <Slider
                    value={formData.existingDebt}
                    onValueChange={(value) => setFormData({...formData, existingDebt: value})}
                    max={20000}
                    min={0}
                    step={500}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0원</span>
                  <span>2억원</span>
                </div>
              </div>
              <div>
                <Label htmlFor="debtInput">직접 입력 (만원)</Label>
                <Input
                  id="debtInput"
                  type="number"
                  value={formData.existingDebt[0]}
                  onChange={(e) => setFormData({...formData, existingDebt: [parseInt(e.target.value) || 0]})}
                  placeholder="기존 대출금액을 만원 단위로 입력"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>담보를 보유하고 계신가요?</CardTitle>
              <CardDescription>
                부동산, 예금, 보험 등 담보로 제공 가능한 자산이 있으신지 선택해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={formData.hasCollateral === true ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasCollateral: true})}
                  className="h-20"
                >
                  <div>
                    <div className="font-semibold">네, 있습니다</div>
                    <div className="text-sm opacity-75">담보 제공 가능</div>
                  </div>
                </Button>
                <Button
                  variant={formData.hasCollateral === false ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasCollateral: false})}
                  className="h-20"
                >
                  <div>
                    <div className="font-semibold">아니요, 없습니다</div>
                    <div className="text-sm opacity-75">신용보증만</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle>보증 신청 희망금액을 입력해주세요</CardTitle>
              <CardDescription>
                필요하신 자금 규모를 입력해주세요. 적정 금액을 신청하시면 승인 가능성이 높아집니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>신청 희망금액: {formatCurrency(formData.requestedAmount[0])}</Label>
                <div className="mt-4">
                  <Slider
                    value={formData.requestedAmount}
                    onValueChange={(value) => setFormData({...formData, requestedAmount: value})}
                    max={30000}
                    min={100}
                    step={500}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>100만원</span>
                  <span>3억원</span>
                </div>
              </div>
              <div>
                <Label htmlFor="amountInput">직접 입력 (만원)</Label>
                <Input
                  id="amountInput"
                  type="number"
                  value={formData.requestedAmount[0]}
                  onChange={(e) => setFormData({...formData, requestedAmount: [parseInt(e.target.value) || 0]})}
                  placeholder="신청금액을 만원 단위로 입력"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 py-8 max-w-3xl">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <Shield className="w-6 h-6" />
            <span className="font-semibold">스마트 보증진단</span>
          </Link>
          <ThemeToggle />
        </nav>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 glass-effect text-white border-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI 기반 진단
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            보증 가능성 진단
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            7단계 간단한 정보만 입력하시면 <span className="text-gradient font-semibold">3분 내에</span> 
            AI가 분석한 결과를 확인하실 수 있습니다.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12 animate-slide-up">
          <div className="glass-effect border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between text-sm text-white/80 mb-4">
              <span className="font-medium">진행률</span>
              <span className="font-bold">{currentStep} / {totalSteps}</span>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <div className="text-center">
              <Badge variant="secondary" className="glass-effect text-white border-white/20">
                {currentStep}단계
              </Badge>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-12 animate-bounce-in">
          {getStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center animate-slide-up">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="glass-effect border-white/30 text-white hover:bg-white/10 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            이전
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="glass-effect border-white/20 hover:bg-white/20 text-white px-8 py-3 font-semibold group transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {currentStep === totalSteps ? '결과 확인' : '다음'}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({length: totalSteps}, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}