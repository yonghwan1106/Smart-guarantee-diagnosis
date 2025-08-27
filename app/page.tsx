import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import statisticsData from "@/data/statistics.json";

export default function Home() {
  const stats = statisticsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              신용보증재단 AI 서비스
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              스마트 보증진단
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              30초 만에 보증 가능성을 확인하고<br />
              맞춤형 개선방안을 받아보세요
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/diagnosis">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                무료 진단 시작하기
              </Button>
            </Link>
            <Link href="/stats">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                통계 보기
              </Button>
            </Link>
          </div>

          {/* Live Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats.totalDiagnosisToday.toLocaleString()}</div>
              <div className="text-sm text-gray-500">오늘 진단 수</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.recentActivity.lastHourDiagnosis}</div>
              <div className="text-sm text-gray-500">실시간 이용자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{stats.averageApprovalTime}</div>
              <div className="text-sm text-gray-500">평균 처리기간</div>
            </div>
          </div>
        </header>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            왜 스마트 보증진단을 선택해야 할까요?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-xl">3분 내 빠른 진단</CardTitle>
                <CardDescription>
                  복잡한 서류 없이 간단한 정보만으로 즉시 보증 가능성을 확인
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle className="text-xl">정확한 AI 분석</CardTitle>
                <CardDescription>
                  15개 업종별 특성을 반영한 정밀한 보증 승인 확률 예측
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <CardTitle className="text-xl">맞춤형 개선방안</CardTitle>
                <CardDescription>
                  승인률 향상을 위한 구체적이고 실행 가능한 개선 방법 제시
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Popular Industries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            업종별 평균 승인률
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.approvalRateByIndustry.slice(0, 6).map((industry, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{industry.industry}</div>
                      <div className="text-sm text-gray-500">{industry.count}건</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{industry.rate}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/stats">
              <Button variant="outline">
                전체 통계 보기
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 무료로 진단받아보세요
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            간단한 정보만 입력하면 3분 내에 결과를 확인할 수 있습니다
          </p>
          <Link href="/diagnosis">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg">
              무료 진단 시작하기
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
