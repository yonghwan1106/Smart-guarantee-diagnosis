import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import statisticsData from '@/data/statistics.json'
import industriesData from '@/data/industries.json'

export default function StatsPage() {
  const stats = statisticsData
  const industries = industriesData.industries

  const getTopIndustries = () => {
    return stats.approvalRateByIndustry
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 5)
  }

  const getWorstIndustries = () => {
    return stats.approvalRateByIndustry
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 5)
  }

  const getTotalApplications = () => {
    return stats.approvalRateByIndustry.reduce((sum, industry) => sum + industry.count, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← 홈으로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
            보증 승인 통계
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            실시간 데이터를 기반으로 한 업종별, 금액별 보증 승인 현황을 확인해보세요.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalDiagnosisToday.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">오늘 진단 수</div>
              <div className="text-xs text-green-600 mt-1">
                전일 대비 +12%
              </div>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.totalApplicationsThisMonth.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">이달 신청 건수</div>
              <div className="text-xs text-blue-600 mt-1">
                월 평균 28,450건
              </div>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.averageApprovalTime}
              </div>
              <div className="text-sm text-gray-600">평균 처리기간</div>
              <div className="text-xs text-orange-600 mt-1">
                작년 대비 -2.1일
              </div>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {stats.averageApprovalAmount}
              </div>
              <div className="text-sm text-gray-600">평균 승인금액</div>
              <div className="text-xs text-purple-600 mt-1">
                {stats.mostRequestedAmount} 최다 신청
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity */}
        <Card className="mb-12 border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              실시간 이용 현황
            </CardTitle>
            <CardDescription>
              현재 시간 기준 실시간 서비스 이용 현황입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">지난 1시간 진단</span>
                  <span className="text-lg font-bold text-green-600">
                    {stats.recentActivity.lastHourDiagnosis}건
                  </span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">피크 시간대</span>
                  <span className="text-lg font-bold text-blue-600">
                    {stats.recentActivity.peakHours}
                  </span>
                </div>
                <div className="text-xs text-gray-500">평균 시간당 65건</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">최다 이용일</span>
                  <span className="text-lg font-bold text-purple-600">
                    {stats.recentActivity.mostActiveDay}
                  </span>
                </div>
                <div className="text-xs text-gray-500">주간 평균 대비 +18%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Industry Rankings */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle>업종별 승인률 순위</CardTitle>
              <CardDescription>
                승인률이 높은 상위 5개 업종과 하위 5개 업종입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    승인률 TOP 5
                  </h4>
                  <div className="space-y-3">
                    {getTopIndustries().map((industry, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2 bg-green-100 text-green-800">
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{industry.industry}</span>
                          <span className="text-sm text-gray-500 ml-2">({industry.count}건)</span>
                        </div>
                        <span className="font-bold text-green-600">{industry.rate}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    개선 필요 업종 TOP 5
                  </h4>
                  <div className="space-y-3">
                    {getWorstIndustries().map((industry, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2 bg-red-100 text-red-800">
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{industry.industry}</span>
                          <span className="text-sm text-gray-500 ml-2">({industry.count}건)</span>
                        </div>
                        <span className="font-bold text-red-600">{industry.rate}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Distribution */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle>신청금액별 성공률</CardTitle>
              <CardDescription>
                신청금액 구간별 보증 승인 현황을 확인할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.successRateByAmount.map((range, index) => {
                  const color = range.rate >= 80 ? 'bg-green-500' : 
                               range.rate >= 70 ? 'bg-blue-500' : 
                               range.rate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{range.range}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{range.count}건</span>
                          <span className="font-bold">{range.rate}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${color}`}
                          style={{ width: `${range.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 분석 인사이트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 3천만원 이하 신청 시 승인률이 높습니다</li>
                  <li>• 적정 신청금액은 월매출의 6-12개월치입니다</li>
                  <li>• 1억원 초과 시 추가 심사가 진행됩니다</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Industries Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>전체 업종 현황</CardTitle>
            <CardDescription>
              15개 전체 업종의 상세한 승인률과 신청 건수를 확인할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.approvalRateByIndustry.map((industry, index) => {
                const industryInfo = industries.find(i => i.name === industry.industry)
                return (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{industry.industry}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {industryInfo?.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={`ml-2 ${
                          industry.rate >= 85 ? 'bg-green-100 text-green-800' :
                          industry.rate >= 75 ? 'bg-blue-100 text-blue-800' :
                          industry.rate >= 65 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {industryInfo?.riskLevel} 등급
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {industry.rate}%
                      </span>
                      <span className="text-sm text-gray-500">
                        {industry.count}건
                      </span>
                    </div>
                    
                    <Progress value={industry.rate} className="mt-2 h-1" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-8 bg-blue-600 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-4">
              나의 보증 가능성도 확인해보세요!
            </h2>
            <p className="mb-6 text-blue-100">
              3분 만에 AI가 분석해드리는 맞춤형 보증 진단
            </p>
            <div className="space-x-4">
              <Link href="/diagnosis">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                  무료 진단 시작
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}