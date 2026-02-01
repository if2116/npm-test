'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { arenas, categories, industries, type Arena, type Category, type Industry } from '@/lib/data';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Star, GitFork, Shield, Trophy, ArrowRight, Filter, Building, ShoppingCart, GraduationCap, Stethoscope, Bolt, Wrench, TrendingUp, BarChart3, Code2, CheckCircle2, X, MessageSquare, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import RadarChartHover from '@/components/arena/RadarChartHover';
import RadarChart from '@/components/arena/RadarChart';

export const dynamic = 'force-dynamic';

export default function ArenaPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isChina = locale === 'zh';

  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<'quality' | 'efficiency' | 'cost' | 'trust' | 'stars'>('stars');

  const filteredArenas = useMemo(() => {
    let filtered = arenas;

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(a => a.industry === selectedIndustry);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'stars') {
        return (b.github?.stars || 0) - (a.github?.stars || 0);
      }
      return b.metrics[sortBy] - a.metrics[sortBy];
    });

    return filtered;
  }, [selectedIndustry, selectedCategory, sortBy]);

  const getCategoryIcon = (id: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      service: Code2,
      management: TrendingUp,
      marketing: BarChart3,
      'risk-control': Shield,
      operations: CheckCircle2,
    };
    return icons[id] || Code2;
  };

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

      <main className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary">
                <Trophy className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  {t('arena.title')}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {t('arena.subtitle')}
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: isChina ? '总方案' : 'Total', value: arenas.length, icon: Code2 },
                { label: isChina ? '已验证' : 'Verified', value: arenas.filter(a => a.status === 'verified').length, icon: CheckCircle2 },
                { label: 'GitHub', value: `${Math.round(arenas.reduce((acc, a) => acc + (a.github?.stars || 0), 0) / 1000)}K`, icon: Star },
                { label: isChina ? '平均分' : 'Avg Score', value: '88', icon: BarChart3 },
              ].map((stat, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4 shadow-card">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <stat.icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Dimensional Filter Layout */}
          <div className="space-y-6">
            {/* Horizontal Category Tabs - Primary Filter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-gray-900">
                  {isChina ? '按类别筛选' : 'Filter by Category'}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary/30'
                  }`}
                >
                  {isChina ? '全部类别' : 'All Categories'}
                </button>
                {categories.map((category) => {
                  const Icon = getCategoryIcon(category.id);
                  const count = arenas.filter(a => a.category === category.id).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary/30'
                      }`}
                    >
                      <Icon className="h-4 w-4 inline mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{category.name[locale as 'en' | 'zh']}</span>
                      <span className="sm:hidden">{category.name[locale as 'en' | 'zh'].split(' ')[0]}</span>
                      <span className="ml-1 sm:ml-2 text-xs opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Horizontal Industry Filter - Secondary Filter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-gray-900">
                  {isChina ? '按行业筛选' : 'Filter by Industry'}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedIndustry('all')}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    selectedIndustry === 'all'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isChina ? '全部行业' : 'All Industries'}
                </button>
                {industries.map((industry) => {
                  const Icon = getIndustryIcon(industry.id);
                  const count = arenas.filter(a => a.industry === industry.id).length;
                  return (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 ${
                        selectedIndustry === industry.id
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">{industry.name[locale as 'en' | 'zh']}</span>
                      <span className="sm:hidden">{industry.name[locale as 'en' | 'zh'].split(' ')[0]}</span>
                      <span className="opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Arena Content */}
            <div>
              {/* Sort Options */}
              <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-card">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  {isChina ? '排序：' : 'Sort by:'}
                </span>
                {(['quality', 'efficiency', 'cost', 'trust', 'stars'] as const).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
                      sortBy === sort
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {sort === 'stars'
                      ? isChina
                        ? 'GitHub'
                        : 'GitHub Stars'
                      : t(`arena.table.${sort}` as any)}
                  </button>
                ))}
              </div>

              {/* Arena Cards */}
              <div className="space-y-4">
                {filteredArenas.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-16 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                      <Code2 className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {isChina ? '暂无此组合的方案' : 'No Solutions for This Combination'}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {isChina
                        ? '该行业与类别的组合正在开发中。您可以查看其他方案，或联系我们提交您的竞技场方案。'
                        : 'This industry and category combination is coming soon. Explore other solutions or contact us to submit your arena.'
                      }
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Button
                        onClick={() => { setSelectedIndustry('all'); setSelectedCategory('all'); }}
                        variant="outline"
                        className="group"
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        {isChina ? '清除筛选' : 'Clear Filters'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button asChild variant="default" className="group">
                        <Link href={`/${locale}/contact`}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {isChina ? '联系我们提交' : 'Submit Your Arena'}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  filteredArenas.map((arena, index) => (
                    <motion.div
                      key={arena.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group relative overflow-hidden rounded-2xl border-2 transition-all hover:shadow-xl ${
                        arena.status === 'verified'
                          ? 'border-amber-300 bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-white shadow-amber-100/50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {/* Enhanced status styling for verified */}
                      {arena.status === 'verified' && (
                        <>
                          {/* Golden gradient stripe */}
                          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500" />
                          {/* Subtle golden shimmer overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-transparent to-transparent pointer-events-none" />
                        </>
                      )}

                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                          <div className="flex-1 min-w-0">
                            {/* Status badge & metadata */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {arena.status === 'verified' ? (
                                <Badge variant="gold" className="gap-1.5 px-2.5 py-1 text-xs sm:text-sm">
                                  <Trophy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  {t('arena.status.verified')}
                                  {arena.status === 'verified' && (
                                    <span className="ml-1 text-xs opacity-70 sm:opacity-80 hidden xs:inline">
                                      {isChina ? '· 实地验证' : '· Ground Truth Verified'}
                                    </span>
                                  )}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="gap-1.5 px-2.5 py-1 text-xs sm:text-sm">
                                  <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  {t('arena.status.in_arena')}
                                </Badge>
                              )}
                              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                                {getCategoryIcon(arena.category) && React.createElement(getCategoryIcon(arena.category), { className: "h-2.5 w-2.5 sm:h-3 sm:w-3" })}
                                <span className="hidden sm:inline">{categories.find(c => c.id === arena.category)?.name[locale as 'en' | 'zh']}</span>
                                <span className="sm:hidden">{categories.find(c => c.id === arena.category)?.name[locale as 'en' | 'zh'].split(' ')[0]}</span>
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                                {getIndustryIcon(arena.industry) && React.createElement(getIndustryIcon(arena.industry), { className: "h-2.5 w-2.5 sm:h-3 sm:w-3" })}
                                <span className="hidden sm:inline">{industries.find(i => i.id === arena.industry)?.name[locale as 'en' | 'zh']}</span>
                                <span className="sm:hidden">{industries.find(i => i.id === arena.industry)?.name[locale as 'en' | 'zh'].split(' ')[0]}</span>
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                              {arena.title[locale as 'en' | 'zh']}
                            </h3>

                            {/* Story Achievement Tag */}
                            {arena.storyAchievement && (
                              <div className="mb-3 sm:mb-4 flex items-start gap-2">
                                <Award className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                                <p className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">
                                  {arena.storyAchievement[locale as 'en' | 'zh']}
                                </p>
                              </div>
                            )}

                            {arena.description && (
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4">
                                {arena.description[locale as 'en' | 'zh']}
                              </p>
                            )}

                            {/* 4-Pillar Metrics with Radar Chart and Hover */}
                            <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-3 sm:p-4">
                              <div className="flex items-center justify-between mb-2 sm:mb-3">
                                <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                  {isChina ? '四维指标' : '4-Pillar Metrics'}
                                </span>
                                <RadarChartHover
                                  metrics={arena.metrics}
                                  detailedMetrics={arena.detailedMetrics}
                                  locale={locale as 'en' | 'zh'}
                                />
                              </div>
                              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                {/* Radar Chart - Centered on mobile, left on desktop */}
                                <div className="flex-shrink-0 mx-auto sm:mx-0">
                                  <RadarChart
                                    metrics={arena.metrics}
                                    size={80}
                                    className="drop-shadow-sm"
                                  />
                                </div>

                                {/* Progress Bars - 2 columns on all screens */}
                                <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-3 w-full">
                                  {[
                                    { key: 'quality', label: t('arena.table.quality'), value: arena.metrics.quality, color: 'bg-success' },
                                    { key: 'efficiency', label: t('arena.table.efficiency'), value: arena.metrics.efficiency, color: 'bg-blue-500' },
                                    { key: 'cost', label: t('arena.table.cost'), value: arena.metrics.cost, color: 'bg-purple-500' },
                                    { key: 'trust', label: t('arena.table.trust'), value: arena.metrics.trust, color: 'bg-amber-500' },
                                  ].map((metric) => (
                                    <div key={metric.key} className="rounded-lg bg-white p-2 sm:p-3 border border-gray-100 shadow-sm">
                                      <div className="mb-1.5 sm:mb-2 flex items-center justify-between gap-1">
                                        <span className="text-[10px] sm:text-xs font-semibold text-gray-600 truncate">{metric.label}</span>
                                        <span className="text-xs sm:text-sm font-bold text-gray-700">{metric.value}</span>
                                      </div>
                                      <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                        <div
                                          className={`h-full ${metric.color} transition-all duration-500`}
                                          style={{ width: `${metric.value}%` }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* GitHub Stats & CTA */}
                          <div className="flex flex-row lg:flex-col lg:items-end gap-3 lg:gap-4 items-center justify-between lg:justify-start">
                            {arena.github && (
                              <div className="flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-200 bg-white px-3 py-2 sm:px-4 sm:py-2 shadow-sm">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                                  <span className="text-sm sm:text-base font-bold text-gray-900">{arena.github.stars.toLocaleString()}</span>
                                </div>
                                <div className="h-5 w-px bg-gray-200"></div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <GitFork className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                                  <span className="text-sm sm:text-base font-semibold text-gray-700">{arena.github.forks}</span>
                                </div>
                              </div>
                            )}
                            {arena.blueprintId ? (
                              <Button asChild className="w-full lg:w-auto shadow-soft text-sm sm:text-base">
                                <Link href={`/${locale}/blueprint/${arena.blueprintId}`}>
                                  {t('arena.table.view_blueprint')}
                                  <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Link>
                              </Button>
                            ) : (
                              <Button asChild variant="outline" className="w-full lg:w-auto text-sm sm:text-base">
                                <a href={arena.github?.url} target="_blank" rel="noopener noreferrer">
                                  {t('arena.table.test_it')}
                                  <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
