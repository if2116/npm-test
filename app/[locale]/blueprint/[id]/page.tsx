'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blueprints, arenas } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Github,
  Trophy,
  Shield,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Calendar,
  Users,
  Code,
  FileText,
  Play,
  TrendingUp,
  Zap,
  DollarSign,
  BarChart3,
  Clock,
  BookOpen,
  Layers,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DemoVideoEmbed from '@/components/blueprints/DemoVideoEmbed';
import RadarChart from '@/components/arena/RadarChart';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

export const dynamic = 'force-dynamic';

export default function BlueprintPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isChina = locale === 'zh';
  const params = useParams();

  const blueprintId = params.id as string;
  const blueprint = blueprints[blueprintId];
  const arena = arenas.find(a => a.id === blueprint?.arenaId);
  const [overviewContent, setOverviewContent] = useState<string>('');
  const [loadingOverview, setLoadingOverview] = useState(true);

  // Load overview content from markdown file
  useEffect(() => {
    async function loadOverview() {
      try {
        // Try locale-specific file first
        let response = await fetch(`/content/blueprints/${blueprintId}/index.${locale}.md`);

        if (!response.ok) {
          // Fall back to general index.md
          response = await fetch(`/content/blueprints/${blueprintId}/index.md`);
        }

        if (response.ok) {
          const text = await response.text();
          setOverviewContent(text);
        }
      } catch (err) {
        console.error('Error loading overview:', err);
      } finally {
        setLoadingOverview(false);
      }
    }
    loadOverview();
  }, [blueprintId, locale]);

  if (!blueprint || !arena) {
    notFound();
  }

  // Show "Coming Soon" if no content exists
  if (!loadingOverview && !overviewContent) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8 sm:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href={`/${locale}/arena`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-6 sm:mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('blueprint.back_to_arena')}
            </Link>

            {/* Coming Soon Placeholder */}
            <div className="rounded-2xl border-2 border-dashed border-primary-300 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-16 text-center">
              <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary-100">
                <Settings className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {isChina ? '蓝图内容准备中' : 'Blueprint Coming Soon'}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
                {isChina
                  ? `我们正在为 "${blueprint.title[locale as 'en' | 'zh'] || blueprint.title.en}" 准备详细的技术文档、实施指南和验证报告。`
                  : `We are preparing detailed technical documentation, implementation guides, and validation reports for "${blueprint.title[locale as 'en' | 'zh'] || blueprint.title.en}".`
                }
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto">
                {isChina
                  ? '敬请期待完整的案例分析、代码示例和部署指南。'
                  : 'Stay tuned for comprehensive case studies, code examples, and deployment guides.'
                }
              </p>

              {/* Blueprint Info Cards */}
              <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto mb-8">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">{isChina ? '状态' : 'Status'}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {blueprint.status === 'verified'
                      ? (isChina ? '已验证' : 'Verified')
                      : (isChina ? '擂台中' : 'In Arena')
                    }
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">{isChina ? '发布时间' : 'Published'}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{blueprint.publishedAt}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">{isChina ? '案例编号' : 'Case ID'}</span>
                  </div>
                  <p className="text-base font-bold text-gray-900">{blueprintId}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${locale}/arena`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {isChina ? '返回竞技场' : 'Back to Arena'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getMetricIcon = (idx: number) => {
    const icons = [TrendingUp, DollarSign, Clock, Zap, BarChart3];
    return icons[idx % icons.length];
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-8 sm:py-12">
        {/* Hero gradient background */}
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
          <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Back Button */}
            <Link
              href={`/${locale}/arena`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-6 sm:mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('blueprint.back_to_arena')}
            </Link>

            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                {blueprint.status === 'verified' ? (
                  <Badge variant="gold" className="gap-1 text-xs sm:text-sm">
                    <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {t('arena.status.verified')}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1 text-xs sm:text-sm">
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {t('arena.status.in_arena')}
                  </Badge>
                )}
                <span className="text-xs sm:text-sm text-gray-500">
                  {blueprint.publishedAt}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-3 sm:mb-4">
                {blueprint.title[locale as 'en' | 'zh']}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
                {blueprint.description[locale as 'en' | 'zh']}
              </p>

              {/* 4-Pillar Summary with Radar Chart */}
              <div className="mt-4 sm:mt-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  {/* Radar Chart */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <RadarChart
                      metrics={arena.metrics}
                      size={80}
                      className="drop-shadow-md"
                    />
                  </div>

                  {/* Metrics List */}
                  <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    {[
                      { key: 'quality', label: t('arena.table.quality'), value: arena.metrics.quality, color: 'bg-success' },
                      {key: 'efficiency', label: t('arena.table.efficiency'), value: arena.metrics.efficiency, color: 'bg-blue-500' },
                      { key: 'cost', label: t('arena.table.cost'), value: arena.metrics.cost, color: 'bg-purple-500' },
                      { key: 'trust', label: t('arena.table.trust'), value: arena.metrics.trust, color: 'bg-amber-500' },
                    ].map((metric) => (
                      <div key={metric.key} className="flex items-center gap-3">
                        <div className="text-sm font-semibold text-gray-700 min-w-[60px]">{metric.label}</div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="h-2 w-full max-w-[120px] overflow-hidden rounded-full bg-gray-200">
                            <div className={`h-full ${metric.color} transition-all duration-500`} style={{ width: `${metric.value}%` }} />
                          </div>
                          <span className="text-sm font-bold text-gray-900 min-w-[30px]">{metric.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-soft">
                  <a href={blueprint.technical.repo} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    {t('blueprint.view_github')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {isChina && (
                  <Button asChild size="lg" variant="outline">
                    <Link href={`/${locale}/contact`}>
                      {t('blueprint.contact_expert')}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Navigation Tabs */}
        <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="flex items-center gap-1 overflow-x-auto py-0" role="tablist">
              {[
                { key: 'implementation', icon: Settings, label: { en: 'Implementation', zh: '实施详情' }, color: 'purple' },
                { key: 'requirements', icon: CheckCircle2, label: { en: 'Requirements', zh: '验证需求' }, color: 'green' },
                { key: 'validation', icon: BarChart3, label: { en: 'Validation', zh: '验证报告' }, color: 'amber' },
                { key: 'project', icon: Users, label: { en: 'Project', zh: '立项报告' }, color: 'red' },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.key}
                    href={`/${locale}/blueprint/${blueprintId}/${tab.key}`}
                    role="tab"
                    className="group relative flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all whitespace-nowrap"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label[locale as 'en' | 'zh']}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Demo Video Embed */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Play className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isChina ? '演示视频' : 'Demo Video'}
                  </h2>
                </div>
                <DemoVideoEmbed
                  videoUrl={blueprint.demo?.url}
                  title={blueprint.title[locale as 'en' | 'zh']}
                />
              </section>

              {/* Overview Content from Markdown */}
              {!loadingOverview && overviewContent && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isChina ? '蓝图概览' : 'Blueprint Overview'}
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-6 first:mt-0" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => <ul className="space-y-2 mb-6 list-disc list-inside text-gray-700" {...props} />,
                        ol: ({ node, ...props }) => <ol className="space-y-2 mb-6 list-decimal list-inside text-gray-700" {...props} />,
                        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                        a: ({ href, children, ...props }) => {
                          // Rewrite relative links to include blueprint ID
                          if (href?.startsWith('./')) {
                            const subpage = href.replace('./', '');
                            return (
                              <Link
                                href={`/${locale}/blueprint/${blueprintId}/${subpage}`}
                                className="text-primary hover:text-primary/70 underline font-medium"
                              >
                                {children}
                              </Link>
                            );
                          }
                          return (
                            <a
                              href={href}
                              className="text-primary hover:text-primary/70 underline font-medium"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          );
                        },
                        strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                        table: ({ node, ...props }) => (
                          <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className="bg-gray-50" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap" {...props} />
                        ),
                      }}
                    >
                      {overviewContent}
                    </ReactMarkdown>
                  </div>
                </section>
              )}

              {/* View Full Documentation CTA */}
              <section className="rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 shadow-card">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {isChina ? '查看完整文档' : 'View Full Documentation'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    {isChina
                      ? '深入了解技术实施细节、验证需求、测试报告和项目规划。'
                      : 'Explore detailed technical implementation, validation requirements, test reports, and project planning.'
                    }
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="shadow-soft">
                      <Link href={`/${locale}/blueprint/${blueprintId}/implementation`}>
                        <Settings className="mr-2 h-5 w-5" />
                        {isChina ? '实施详情' : 'Implementation'}
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href={`/${locale}/blueprint/${blueprintId}/requirements`}>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        {isChina ? '验证需求' : 'Requirements'}
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href={`/${locale}/blueprint/${blueprintId}/validation`}>
                        <BarChart3 className="mr-2 h-5 w-5" />
                        {isChina ? '验证报告' : 'Validation'}
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href={`/${locale}/blueprint/${blueprintId}/project`}>
                        <Users className="mr-2 h-5 w-5" />
                        {isChina ? '立项报告' : 'Project Report'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Business Case */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-6 w-6 text-success" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('blueprint.business_case')}
                  </h2>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-card">
                  <p className="text-xl font-bold text-primary mb-8">
                    {blueprint.businessCase.roi[locale as 'en' | 'zh']}
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {blueprint.businessCase.metrics.map((metric, idx) => {
                      const Icon = getMetricIcon(idx);
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary transition-all group-hover:scale-110 group-hover:from-primary group-hover:to-primary group-hover:text-white">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-600 mb-1">
                                {metric.label[locale as 'en' | 'zh']}
                              </p>
                              <p className="text-3xl font-extrabold text-gray-900">{metric.value}</p>
                              {metric.description && (
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                  {metric.description[locale as 'en' | 'zh']}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* Decorative corner accent */}
                          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary/5 to-transparent transition-all group-hover:from-primary/10" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Implementation Guide */}
              {blueprint.implementation && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isChina ? '实施指南' : 'Implementation Guide'}
                    </h2>
                  </div>

                  {/* Overview */}
                  <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-primary-50/30 to-white p-6 shadow-card mb-6">
                    <p className="text-base text-gray-700 leading-relaxed">
                      {blueprint.implementation.overview[locale as 'en' | 'zh']}
                    </p>
                  </div>

                  {/* Implementation Steps */}
                  <div className="space-y-4 mb-6">
                    {blueprint.implementation.steps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-primary/30"
                      >
                        {/* Step number badge */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-3xl flex items-start justify-end p-3">
                          <span className="text-2xl font-bold text-primary/20 group-hover:text-primary/40 transition-all">
                            {idx + 1}
                          </span>
                        </div>

                        <div className="p-5">
                          <div className="flex items-start gap-4 mb-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 text-primary">
                              <Settings className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-gray-900">
                                  {step.title[locale as 'en' | 'zh']}
                                </h3>
                                {step.duration && (
                                  <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-10 text-primary text-xs font-semibold">
                                    <Clock className="h-3 w-3" />
                                    {step.duration}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {step.description[locale as 'en' | 'zh']}
                              </p>
                            </div>
                          </div>

                          {/* Technical Details */}
                          {step.techDetails && step.techDetails.length > 0 && (
                            <div className="mt-4 pl-14">
                              <div className="flex flex-wrap gap-2">
                                {step.techDetails.map((detail, detailIdx) => (
                                  <span
                                    key={detailIdx}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-gray-700"
                                  >
                                    <Layers className="h-3 w-3 text-primary" />
                                    {detail}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Architecture */}
                  {blueprint.implementation.architecture && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        {isChina ? '系统架构' : 'System Architecture'}
                      </h4>
                      <div className="prose prose-sm max-w-none text-gray-700">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-slate-50 rounded-lg p-4 border border-slate-200">
                          {blueprint.implementation.architecture[locale as 'en' | 'zh']}
                        </pre>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Gap Analysis */}
              <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/50 to-white p-6 shadow-card">
                <div className="flex items-center gap-2 mb-5">
                  <Trophy className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-900">
                    {t('blueprint.gap_analysis.title')}
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Standard Version */}
                  <div className="rounded-lg border border-gray-300 bg-white p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-700">
                        {t('blueprint.gap_analysis.standard')}
                      </p>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                        <XCircle className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-gray-600">{t('blueprint.gap_analysis.features.accuracy')}</span>
                          <span className="text-gray-500">{blueprint.gapAnalysis.standard.accuracy}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full w-1/3 bg-gray-400" />
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="flex items-start gap-2">
                          <Shield className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-600">{t('blueprint.gap_analysis.features.deployment')}: </span>
                            <span className="text-gray-500">{blueprint.gapAnalysis.standard.deployment}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="flex items-start gap-2">
                          <Users className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-600">{t('blueprint.gap_analysis.features.support')}: </span>
                            <span className="text-gray-500">{blueprint.gapAnalysis.standard.support}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expert Version */}
                  <div className="rounded-lg border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-white p-4 relative overflow-hidden">
                    {/* Gold gradient accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-200/50 to-transparent" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-bold text-amber-900">
                          {t('blueprint.gap_analysis.expert')}
                        </p>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-gray-700">{t('blueprint.gap_analysis.features.accuracy')}</span>
                            <span className="font-bold text-success">{blueprint.gapAnalysis.expert.accuracy}</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                            <div className="h-full w-11/12 bg-success shadow-sm" />
                          </div>
                        </div>
                        <div className="text-xs">
                          <div className="flex items-start gap-2">
                            <Shield className="h-3.5 w-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-gray-700">{t('blueprint.gap_analysis.features.deployment')}: </span>
                              <span className="font-bold text-gray-900">{blueprint.gapAnalysis.expert.deployment}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs">
                          <div className="flex items-start gap-2">
                            <Users className="h-3.5 w-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-gray-700">{t('blueprint.gap_analysis.features.support')}: </span>
                              <span className="font-bold text-gray-900">{blueprint.gapAnalysis.expert.support}</span>
                            </div>
                          </div>
                        </div>
                        {blueprint.gapAnalysis.expert.sla && (
                          <div className="text-xs">
                            <div className="flex items-start gap-2">
                              <Clock className="h-3.5 w-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-gray-700">{t('blueprint.gap_analysis.features.sla')}: </span>
                                <span className="font-bold text-gray-900">{blueprint.gapAnalysis.expert.sla}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isChina && (
                  <Button asChild className="mt-5 w-full shadow-soft" size="sm">
                    <Link href={`/${locale}/contact`}>
                      {t('blueprint.contact_expert')}
                    </Link>
                  </Button>
                )}
              </div>

              {/* Technical Details */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="h-5 w-5 text-gray-700" />
                  <h3 className="text-lg font-bold text-gray-900">
                    {t('blueprint.technical_details')}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-10 text-primary">
                        <Code className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-600 mb-1">{isChina ? '技术栈' : 'Tech Stack'}</p>
                        <p className="text-sm text-gray-900">{blueprint.technical.techStack.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/blueprint/${blueprintId}/implementation`}
                    className="block rounded-lg bg-slate-50 p-3 transition-all hover:bg-primary-50 hover:shadow-sm group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-primary group-hover:underline">
                          {isChina ? '查看文档' : 'View Documentation'}
                        </p>
                      </div>
                    </div>
                  </Link>
                  {blueprint.technical.team && (
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-10 text-accent">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-600 mb-1">{isChina ? '团队' : 'Team'}</p>
                          <p className="text-sm text-gray-900">{blueprint.technical.team}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-600 mb-1">{isChina ? '更新时间' : 'Last Updated'}</p>
                        <p className="text-sm text-gray-900">{blueprint.updatedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
