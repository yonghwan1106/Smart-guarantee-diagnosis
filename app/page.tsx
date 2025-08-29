import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, BarChart3, Lightbulb, Users, TrendingUp, Clock, Shield } from "lucide-react";
import statisticsData from "@/data/statistics.json";

export default function Home() {
  const stats = statisticsData;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">스마트 보증진단</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-20 animate-fade-in">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 transition-colors">
              <Zap className="w-4 h-4 mr-2" />
              신용보증재단 AI 서비스
            </Badge>
            <div className="mb-6">
              <Badge variant="outline" className="mb-2 bg-amber-50 text-amber-700 border-amber-200">
                신용보증재단중앙회 특별업무제안 공모전 출품작
              </Badge>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 animate-bounce-in">
              스마트 보증진단
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="text-blue-600 font-semibold">AI 기술</span>로 30초 만에 보증 가능성을 확인하고<br />
              <span className="font-semibold">맞춤형 개선방안</span>을 받아보세요
            </p>
            <p className="text-sm text-gray-500 mb-12 max-w-2xl mx-auto">
              ※ 본 서비스는 시연을 위한 가상 데이터를 사용하고 있으며, 실제 보증심사와는 다를 수 있습니다.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Link href="/diagnosis">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105">
                무료 진단 시작하기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/stats">
              <Button variant="outline" size="lg" className="border-blue-300 text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg font-semibold">
                <BarChart3 className="mr-2 w-5 h-5" />
                통계 보기
              </Button>
            </Link>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.totalDiagnosisToday.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">오늘 진단 수</div>
              <div className="text-emerald-600 text-sm mt-1">전일 대비 +12%</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.recentActivity.lastHourDiagnosis}</div>
              <div className="text-gray-600 font-medium">실시간 이용자</div>
              <div className="text-blue-600 text-sm mt-1">활발한 이용 중</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.averageApprovalTime}</div>
              <div className="text-gray-600 font-medium">평균 처리기간</div>
              <div className="text-purple-600 text-sm mt-1">작년 대비 -2.1일</div>
            </div>
          </div>
        </header>

        {/* Features */}
        <section className="mb-20 animate-slide-up">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            왜 스마트 보증진단을 선택해야 할까요?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            AI 기술과 데이터 과학을 결합한 혁신적인 보증 진단 서비스
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white border border-gray-200 shadow-lg text-center hover:shadow-xl transition-shadow group">
              <CardHeader>
                <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-yellow-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">3분 내 빠른 진단</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  복잡한 서류 없이 간단한 정보만으로<br />
                  <span className="text-yellow-600 font-semibold">즉시 보증 가능성을 확인</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg text-center hover:shadow-xl transition-shadow group">
              <CardHeader>
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-10 h-10 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">정확한 AI 분석</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  15개 업종별 특성을 반영한<br />
                  <span className="text-emerald-600 font-semibold">정밀한 보증 승인 확률 예측</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg text-center hover:shadow-xl transition-shadow group">
              <CardHeader>
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-10 h-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">맞춤형 개선방안</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  승인률 향상을 위한<br />
                  <span className="text-blue-600 font-semibold">구체적이고 실행 가능한 개선 방법 제시</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Popular Industries */}
        <section className="mb-20 animate-slide-up">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            업종별 평균 승인률
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            실시간 데이터로 확인하는 업종별 보증 승인 현황
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stats.approvalRateByIndustry.slice(0, 6).map((industry, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900 text-lg mb-2">{industry.industry}</div>
                      <div className="text-sm text-gray-600">{industry.count}건</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-emerald-600 group-hover:scale-110 transition-transform">
                        {industry.rate}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/stats">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                <BarChart3 className="mr-2 w-5 h-5" />
                전체 통계 보기
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-3xl p-16 shadow-lg animate-bounce-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              지금 바로 무료로 진단받아보세요
            </h2>
            <p className="text-xl mb-12 text-gray-700 leading-relaxed">
              간단한 정보만 입력하면 <span className="text-blue-600 font-semibold">3분 내에</span> 
              AI가 분석한 정확한 결과를 확인할 수 있습니다
            </p>
            <Link href="/diagnosis">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-semibold group transition-all duration-300 hover:scale-105">
                무료 진단 시작하기
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
