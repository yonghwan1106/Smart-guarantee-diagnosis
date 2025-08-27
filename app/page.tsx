import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, Zap, BarChart3, Lightbulb, Users, TrendingUp, Clock, Shield } from "lucide-react";
import statisticsData from "@/data/statistics.json";

export default function Home() {
  const stats = statisticsData;

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">스마트 보증진단</span>
          </div>
          <ThemeToggle />
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-20 animate-fade-in">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-6 glass-effect text-white border-white/20 hover:bg-white/20 transition-colors">
              <Zap className="w-4 h-4 mr-2" />
              신용보증재단 AI 서비스
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-bounce-in">
              스마트 보증진단
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              <span className="text-gradient">AI 기술</span>로 30초 만에 보증 가능성을 확인하고<br />
              <span className="font-semibold">맞춤형 개선방안</span>을 받아보세요
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Link href="/diagnosis">
              <Button size="lg" className="glass-effect border-white/20 hover:bg-white/20 text-white px-10 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105">
                무료 진단 시작하기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/stats">
              <Button variant="outline" size="lg" className="glass-effect border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg font-semibold">
                <BarChart3 className="mr-2 w-5 h-5" />
                통계 보기
              </Button>
            </Link>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="glass-effect p-6 rounded-2xl border border-white/20 card-hover">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stats.totalDiagnosisToday.toLocaleString()}</div>
              <div className="text-white/70 font-medium">오늘 진단 수</div>
              <div className="text-emerald-400 text-sm mt-1">전일 대비 +12%</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl border border-white/20 card-hover">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stats.recentActivity.lastHourDiagnosis}</div>
              <div className="text-white/70 font-medium">실시간 이용자</div>
              <div className="text-blue-400 text-sm mt-1">활발한 이용 중</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl border border-white/20 card-hover">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stats.averageApprovalTime}</div>
              <div className="text-white/70 font-medium">평균 처리기간</div>
              <div className="text-purple-400 text-sm mt-1">작년 대비 -2.1일</div>
            </div>
          </div>
        </header>

        {/* Features */}
        <section className="mb-20 animate-slide-up">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            왜 스마트 보증진단을 선택해야 할까요?
          </h2>
          <p className="text-center text-white/70 mb-16 text-lg max-w-2xl mx-auto">
            AI 기술과 데이터 과학을 결합한 혁신적인 보증 진단 서비스
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass-effect border border-white/20 text-center card-hover group">
              <CardHeader>
                <div className="w-20 h-20 glass-effect rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl text-white mb-4">3분 내 빠른 진단</CardTitle>
                <CardDescription className="text-white/80 text-base leading-relaxed">
                  복잡한 서류 없이 간단한 정보만으로<br />
                  <span className="text-yellow-400 font-semibold">즉시 보증 가능성을 확인</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect border border-white/20 text-center card-hover group">
              <CardHeader>
                <div className="w-20 h-20 glass-effect rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-10 h-10 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl text-white mb-4">정확한 AI 분석</CardTitle>
                <CardDescription className="text-white/80 text-base leading-relaxed">
                  15개 업종별 특성을 반영한<br />
                  <span className="text-emerald-400 font-semibold">정밀한 보증 승인 확률 예측</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect border border-white/20 text-center card-hover group">
              <CardHeader>
                <div className="w-20 h-20 glass-effect rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-10 h-10 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white mb-4">맞춤형 개선방안</CardTitle>
                <CardDescription className="text-white/80 text-base leading-relaxed">
                  승인률 향상을 위한<br />
                  <span className="text-blue-400 font-semibold">구체적이고 실행 가능한 개선 방법 제시</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Popular Industries */}
        <section className="mb-20 animate-slide-up">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            업종별 평균 승인률
          </h2>
          <p className="text-center text-white/70 mb-16 text-lg max-w-2xl mx-auto">
            실시간 데이터로 확인하는 업종별 보증 승인 현황
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stats.approvalRateByIndustry.slice(0, 6).map((industry, index) => (
              <Card key={index} className="glass-effect border border-white/20 card-hover group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white text-lg mb-2">{industry.industry}</div>
                      <div className="text-sm text-white/60">{industry.count}건</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-emerald-400 group-hover:scale-110 transition-transform">
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
              <Button variant="outline" className="glass-effect border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
                <BarChart3 className="mr-2 w-5 h-5" />
                전체 통계 보기
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center glass-effect border border-white/20 rounded-3xl p-16 animate-bounce-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-white">
              지금 바로 무료로 진단받아보세요
            </h2>
            <p className="text-xl mb-12 text-white/80 leading-relaxed">
              간단한 정보만 입력하면 <span className="text-gradient font-semibold">3분 내에</span> 
              AI가 분석한 정확한 결과를 확인할 수 있습니다
            </p>
            <Link href="/diagnosis">
              <Button size="lg" className="glass-effect border-white/20 hover:bg-white/20 text-white px-12 py-6 text-xl font-semibold group transition-all duration-300 hover:scale-105">
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
