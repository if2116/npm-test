'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories, industries, arenas } from '@/lib/data';
import { Github, Trophy, ArrowRight, Building, ShoppingCart, GraduationCap, Stethoscope, Bolt, Wrench, Users, Code2, Sparkles, Play, Shield, Rocket, BarChart3, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const locale = useLocale();
  const isChina = locale === 'zh';

  const getIndustryIcon = (id: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      finance: Building,
      retail: ShoppingCart,
      education: GraduationCap,
      healthcare: Stethoscope,
      energy: Bolt,
      manufacturing: Wrench,
    };
    return icons[id] || Building;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section - Premium, Clean */}
        <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 lg:py-40">
          {/* Subtle gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-700/20 rounded-full blur-3xl"></div>
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/50 px-4 py-2 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">
                  {isChina ? '开源 • 厂商无关 • 经过验证' : 'Open Source • Vendor Agnostic • Verified'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 leading-tight">
                {isChina ? '哪个AI方案真正有效？' : 'Which AI Solution Actually Works?'}
              </h1>

              <p className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-8">
                {isChina ? '我们测试过，只推荐最好的' : 'We Test Them. Recommend Only the Best.'}
              </p>

              {/* Description */}
              <p className="max-w-3xl text-lg leading-relaxed text-slate-400 mb-10">
                {isChina
                  ? '在真实业务场景中测试AI解决方案，经过验证后推荐唯一最佳实践。开源、可直接部署、生产级质量。'
                  : 'Test AI solutions in real business scenarios. Verify what works. Recommend only the best-proven blueprint. Open source, ready to deploy, production-grade.'
                }
              </p>

              {/* Key Metrics */}
              <div className="flex flex-wrap items-center gap-8 mb-10">
                {[
                  { value: '50+', label: isChina ? '经过验证方案' : 'Verified Blueprints' },
                  { value: '12', label: isChina ? '个行业' : 'Industries' },
                  { value: '95%+', label: isChina ? '平均准确率' : 'Avg. Accuracy' },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  <Link href={`/${locale}/arena`}>
                    {isChina ? '寻找AI方案' : 'Find AI Solutions'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-900 hover:text-white">
                  <a href="https://github.com/howang/rwai-website" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    {isChina ? '加入开发' : 'Join as Developer'}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blueprints - Prominent Navigation */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {isChina ? '热门AI蓝图' : 'Featured AI Blueprints'}
                </h2>
                <p className="text-slate-600">
                  {isChina ? '浏览经过验证的企业级AI解决方案' : 'Browse verified enterprise AI solutions'}
                </p>
              </div>
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-white hidden sm:flex">
                <Link href={`/${locale}/arena`}>
                  {isChina ? '查看全部' : 'View All'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {arenas.slice(0, 6).map((arena, idx) => {
                const Icon = arena.industry === 'finance' ? Building :
                            arena.industry === 'retail' ? ShoppingCart :
                            arena.industry === 'education' ? GraduationCap :
                            arena.industry === 'healthcare' ? Stethoscope :
                            arena.industry === 'energy' ? Bolt : Wrench;
                return (
                  <Link
                    key={arena.id}
                    href={`/${locale}/blueprint/${arena.blueprintId}`}
                    className="group bg-white rounded-xl border border-slate-200 hover:border-blue-600 hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-blue-600">
                              {String(arena.category).toUpperCase()}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                              {arena.title[locale as 'en' | 'zh']}
                            </h3>
                          </div>
                        </div>
                        {arena.status === 'verified' && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 border border-amber-200">
                            <Trophy className="h-3 w-3 text-amber-600" />
                            <span className="text-xs font-semibold text-amber-700">SOTA</span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                        {arena.description?.[locale as 'en' | 'zh'] || (isChina ? '暂无描述' : 'No description')}
                      </p>

                      {/* 4 Pillars */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-500">{isChina ? '质量' : 'Q'}</span>
                          <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${arena.metrics.quality}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{arena.metrics.quality}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-500">{isChina ? '效率' : 'E'}</span>
                          <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${arena.metrics.efficiency}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{arena.metrics.efficiency}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5" />
                            <span>{arena.github?.stars || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>{arena.github?.forks || 0}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 w-full">
                <Link href={`/${locale}/arena`}>
                  {isChina ? '查看全部' : 'View All'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Browse by Industry - More Prominent */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                {isChina ? '按行业探索' : 'Explore by Industry'}
              </h2>
              <p className="text-lg text-slate-600">
                {isChina ? `覆盖${industries.length}个行业，${arenas.length}+个经过验证的AI方案` : `Covering ${industries.length} industries, ${arenas.length}+ verified AI solutions`}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, idx) => {
                const count = arenas.filter(a => a.industry === industry.id).length;
                const Icon = getIndustryIcon(industry.id);
                return (
                  <Link
                    key={industry.id}
                    href={`/${locale}/arena?industry=${industry.id}`}
                    className="group flex items-center gap-4 p-6 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-white hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-white border border-slate-300 text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {industry.name[locale as 'en' | 'zh']}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {count} {isChina ? '个方案' : 'blueprints'}
                      </p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-white border-slate-300 text-slate-700">
                <Rocket className="mr-2 h-4 w-4" />
                {isChina ? '我们的方案' : 'Our Approach'}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {isChina ? '真实场景 • 公平竞技 • 唯一最佳' : 'Real Scenarios • Fair Competition • Single Best'}
              </h2>
              <p className="text-xl text-slate-600">
                {isChina
                  ? '通过"擂台"机制，在真实业务场景中公平测试AI方案，只推荐经过验证的最佳实践'
                  : 'Through the "Arena" mechanism, we fairly test AI solutions in real business scenarios and recommend only verified best practices'}
              </p>
            </div>

            <div className="mx-auto max-w-5xl space-y-6">
              {[
                {
                  step: '01',
                  title: isChina ? '定义真实场景' : 'Define Real Scenarios',
                  desc: isChina
                    ? '选择具体的业务问题，建立明确的成功标准和评估体系'
                    : 'Select specific business problems and establish clear success criteria and evaluation frameworks',
                  detail: isChina ? '例如：银行财报自动生成、智能客服问答系统' : 'Example: Automated financial reporting, intelligent customer service Q&A',
                },
                {
                  step: '02',
                  title: isChina ? '多方方案竞技' : 'Solutions Compete',
                  desc: isChina
                    ? '多个技术方案在相同场景下，使用真实数据和统一标准进行测试'
                    : 'Multiple solutions tested under identical conditions using real data and unified standards',
                  detail: isChina ? '确保测试的公平性和结果的可比性' : 'Ensuring fair testing and comparable results',
                },
                {
                  step: '03',
                  title: isChina ? '验证并推荐最佳' : 'Verify and Recommend Best',
                  desc: isChina
                    ? '基于测试结果选择最优方案，提供完整代码和部署指南'
                    : 'Select the optimal solution based on test results, provide complete code and deployment guides',
                  detail: isChina ? '包含性能报告、成本分析和技术支持' : 'Including performance reports, cost analysis, and technical support',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-900 text-white text-2xl font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                      <div className="inline-block px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {isChina ? '每个方案都包含' : 'Every Blueprint Includes'}
              </h2>
              <p className="text-xl text-slate-600">
                {isChina ? '完整的生产级解决方案，可直接部署使用' : 'Complete production-ready solutions, ready for immediate deployment'}
              </p>
            </div>

            <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Play,
                  title: isChina ? '在线演示' : 'Live Demo',
                  desc: isChina ? '可在线体验实际效果，验证是否符合业务需求' : 'Experience actual results online to verify business fit',
                },
                {
                  icon: Code2,
                  title: isChina ? '完整源代码' : 'Complete Source Code',
                  desc: isChina ? '开源代码，可审查、可定制、支持私有化部署' : 'Open source code, auditable, customizable, supports private deployment',
                },
                {
                  icon: Shield,
                  title: isChina ? '部署指南' : 'Deployment Guide',
                  desc: isChina ? '详细的实施文档和架构说明，1-3天完成部署' : 'Detailed implementation docs and architecture guides, deploy in 1-3 days',
                },
                {
                  icon: BarChart3,
                  title: isChina ? '性能报告' : 'Performance Report',
                  desc: isChina ? '真实测试数据，包括准确率、响应时间、资源消耗等指标' : 'Real test data including accuracy, response time, resource usage',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white border border-slate-200 text-slate-700">
                      <item.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-slate-100 border-slate-300 text-slate-700">
                <Trophy className="mr-2 h-4 w-4" />
                {isChina ? '真实案例' : 'Case Studies'}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {isChina ? '真实企业，真实效果' : 'Real Companies, Real Results'}
              </h2>
            </div>

            <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  company: isChina ? '某大型银行' : 'Major Bank',
                  case: isChina ? 'NL2SQL财报生成' : 'NL2SQL Financial Reports',
                  before: isChina ? '人工处理需要2小时' : 'Manual: 2 hours',
                  after: isChina ? 'AI生成只需5分钟' : 'AI: 5 minutes',
                  metric: '24x',
                  label: isChina ? '效率提升' : 'Efficiency',
                  accuracy: isChina ? '准确率95%' : '95% Accuracy',
                },
                {
                  company: isChina ? '知名咨询公司' : 'Consulting Firm',
                  case: isChina ? '智能问答系统' : 'Intelligent QA System',
                  before: isChina ? '客服人力成本高' : 'High service costs',
                  after: isChina ? '自动回答70%问题' : '70% auto-answered',
                  metric: '70%',
                  label: isChina ? '成本降低' : 'Cost Savings',
                  accuracy: isChina ? '满意度+40%' : 'Satisfaction +40%',
                },
              ].map((study, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-blue-600">{study.case}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">{study.company}</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-slate-400 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">{isChina ? '之前' : 'Before'}</p>
                        <p className="text-slate-700">{study.before}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">{isChina ? '之后' : 'After'}</p>
                        <p className="text-slate-700">{study.after}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                    <div>
                      <div className="text-4xl font-bold text-slate-900">{study.metric}</div>
                      <div className="text-sm text-slate-600">{study.label}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-blue-600">{study.accuracy}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {isChina ? '为什么信任RWAI' : 'Why Trust RWAI'}
              </h2>
            </div>

            <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: isChina ? '真实验证' : 'Verified',
                  desc: isChina
                    ? '所有方案都经过真实场景测试，数据可追溯'
                    : 'All solutions tested in real scenarios with traceable data',
                },
                {
                  icon: Users,
                  title: isChina ? '专家团队' : 'Expert Team',
                  desc: isChina
                    ? '来自清华、MIT等顶级院校的AI专家'
                    : 'AI experts from Tsinghua, MIT and top institutions',
                },
                {
                  icon: Code2,
                  title: isChina ? '完全开源' : 'Open Source',
                  desc: isChina
                    ? '代码可审查，支持私有化部署'
                    : 'Code is auditable, supports private deployment',
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white border border-slate-200 text-slate-700 mb-4">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {isChina ? '准备好找到适合你的AI方案了吗？' : 'Ready to Find Your AI Solution?'}
            </h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              {isChina
                ? '浏览经过验证的AI蓝图，或加入开发者社区一起贡献'
                : 'Browse verified AI blueprints, or join the developer community to contribute'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Link href={`/${locale}/arena`}>
                  {isChina ? '浏览方案' : 'Browse Blueprints'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100">
                <a href="https://github.com/howang/rwai-website" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Beta Notice */}
        <section className="py-12 bg-slate-100 border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <p className="text-slate-700 font-medium">
              {isChina ? '目前项目为内测版本，欢迎大家试用和反馈意见' : 'Currently in beta testing, we welcome your feedback and suggestions'}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
