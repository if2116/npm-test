'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, ExternalLink, Youtube,
  FileText, Settings, CheckCircle2, BarChart3, Users,
  BookOpen, Code, TrendingUp, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import 'highlight.js/styles/github-dark.css';

type ContentType = 'implementation' | 'requirements' | 'validation' | 'project';

// Blueprint subpage content renderer - handles markdown documentation display

const contentInfo: Record<ContentType, {
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  icon: any;
  color: string;
  gradient: string;
}> = {
  implementation: {
    title: { en: 'Implementation Details', zh: '实施详情' },
    description: { en: 'Technical implementation guide', zh: '技术实施指南' },
    icon: Settings,
    color: 'text-purple-600',
    gradient: 'from-purple-50 to-purple-100',
  },
  requirements: {
    title: { en: 'Validation Requirements', zh: '验证需求' },
    description: { en: 'Business and technical requirements', zh: '业务和技术需求' },
    icon: CheckCircle2,
    color: 'text-green-600',
    gradient: 'from-green-50 to-green-100',
  },
  validation: {
    title: { en: 'Validation Report', zh: '验证报告' },
    description: { en: 'Test results and analysis', zh: '测试结果与分析' },
    icon: BarChart3,
    color: 'text-amber-600',
    gradient: 'from-amber-50 to-amber-100',
  },
  project: {
    title: { en: 'Project Report', zh: '立项报告' },
    description: { en: 'Business case and ROI analysis', zh: '商业案例与ROI分析' },
    icon: Users,
    color: 'text-red-600',
    gradient: 'from-red-50 to-red-100',
  },
};

export default function BlueprintContentPage({ type, blueprintId }: { type: ContentType; blueprintId?: string }) {
  const params = useParams();
  const locale = useLocale();
  const isChina = locale === 'zh';
  // Use blueprintId from prop if available, otherwise fall back to useParams
  const actualBlueprintId = blueprintId || (params.id as string);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const info = contentInfo[type];
  const Icon = info.icon;

  useEffect(() => {
    // Guard against undefined blueprintId
    if (!actualBlueprintId) {
      console.error('[BlueprintContent] blueprintId is undefined');
      setError(isChina ? '蓝图ID缺失' : 'Blueprint ID is missing');
      setLoading(false);
      return;
    }

    async function loadContent() {
      try {
        setLoading(true);
        const fileName = type === 'validation' ? 'validation-report' :
                        type === 'project' ? 'project-report' : type;

        // Try locale-specific file first, then fall back to general file
        const localeFileName = `${fileName}.${locale}.md`;
        let response = await fetch(`/content/blueprints/${actualBlueprintId}/${localeFileName}`);

        if (!response.ok) {
          // Fall back to non-locale-specific file
          response = await fetch(`/content/blueprints/${actualBlueprintId}/${fileName}.md`);
        }

        if (!response.ok) {
          throw new Error(`Content not found: ${actualBlueprintId}/${fileName}`);
        }

        const text = await response.text();

        // Log for debugging
        console.log(`[BlueprintContent] Loaded ${actualBlueprintId}/${type} (${locale}):`, text.substring(0, 100));

        setContent(text);
        setError(null);
      } catch (err) {
        console.error('[BlueprintContent] Error loading content:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(isChina ? `内容加载失败: ${errorMessage}` : `Failed to load content: ${errorMessage}`);
        setContent('');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [actualBlueprintId, type, locale, isChina]);

  // Track active section on scroll
  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id || entry.target.textContent?.slice(0, 50);
          if (id) setActiveSection(id);
        }
      });
    }, { threshold: 0.2, rootMargin: '-100px 0px -70% 0px' });

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-12">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="space-y-2 mt-8">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-12">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <BookOpen className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {isChina ? '内容准备中' : 'Content Coming Soon'}
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {error || (isChina
                  ? '该蓝图的此部分文档正在整理中，敬请期待。'
                  : 'This section is being prepared and will be available soon.')
                }
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {isChina ? '返回' : 'Back'}
                </Button>
                <Button asChild>
                  <Link href={`/${locale}/blueprint/${blueprintId}`}>
                    {isChina ? '查看蓝图详情' : 'View Blueprint'}
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${info.gradient} border-b`}>
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link
              href={`/${locale}/arena`}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isChina ? '竞技场' : 'Arena'}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href={`/${locale}/blueprint/${blueprintId}`}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isChina ? '蓝图详情' : 'Blueprint'}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className={`font-medium ${info.color}`}>
              {info.title[locale as 'en' | 'zh']}
            </span>
          </div>

          {/* Title */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-white shadow-sm`}>
                  <Icon className={`h-8 w-8 ${info.color}`} />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                    {info.title[locale as 'en' | 'zh']}
                  </h1>
                  <p className="text-base text-gray-700 mt-1">
                    {info.description[locale as 'en' | 'zh']}
                  </p>
                </div>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="shrink-0 border-2 hover:bg-white transition-all"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isChina ? '返回蓝图' : 'Back to Blueprint'}
            </Button>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 max-w-3xl">
            {isChina
              ? '详细的技术文档、验证报告和项目规划。了解完整的实施指南、需求规格、测试结果和商业分析。'
              : 'Detailed technical documentation, validation reports, and project planning. Learn about complete implementation guides, requirement specifications, test results, and business analysis.'
            }
          </p>
        </div>
      </div>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-0" role="tablist">
            {(Object.keys(contentInfo) as ContentType[]).map((contentType) => {
              const itemInfo = contentInfo[contentType];
              const ItemIcon = itemInfo.icon;
              const isActive = contentType === type;

              // Map content types to their specific border colors
              const getActiveClasses = (contentType: ContentType) => {
                switch(contentType) {
                  case 'implementation':
                    return 'border-purple-600 bg-gradient-to-b from-purple-50 to-purple-100 text-purple-600';
                  case 'requirements':
                    return 'border-green-600 bg-gradient-to-b from-green-50 to-green-100 text-green-600';
                  case 'validation':
                    return 'border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 text-amber-600';
                  case 'project':
                    return 'border-red-600 bg-gradient-to-b from-red-50 to-red-100 text-red-600';
                  default:
                    return 'border-blue-600 bg-gradient-to-b from-blue-50 to-blue-100 text-blue-600';
                }
              };

              return (
                <Link
                  key={contentType}
                  href={`/${locale}/blueprint/${blueprintId}/${contentType}`}
                  role="tab"
                  aria-selected={isActive}
                  className={`
                    group relative flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all
                    ${isActive
                      ? getActiveClasses(contentType)
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <ItemIcon className="h-4 w-4" />
                  <span>{itemInfo.title[locale as 'en' | 'zh']}</span>

                  {/* Active indicator - animated underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Table of Contents Sidebar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
              style={{
                fontSize: '16px',
                lineHeight: '1.75',
              }}
            >
              <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ node, ...props }) => <h1 className="text-4xl font-extrabold text-gray-900 mb-6 mt-12 first:mt-0" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-8" {...props} />,
                    h4: ({ node, ...props }) => <h4 className="text-xl font-bold text-gray-900 mb-2 mt-6" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="space-y-2 mb-6 list-disc list-inside text-gray-700" {...props} />,
                    ol: ({ node, ...props }) => <ol className="space-y-2 mb-6 list-decimal list-inside text-gray-700" {...props} />,
                    li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                    a: ({ node, ...props }) => (
                      <a
                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                    code: ({ node, inline, ...props }: any) => (
                      <code
                        className={inline
                          ? "bg-gray-100 text-red-600 px-2 py-0.5 rounded text-sm font-mono"
                          : "block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono"
                        }
                        {...props}
                      />
                    ),
                    pre: ({ node, ...props }) => <pre className="mb-6 overflow-x-auto" {...props} />,
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-blue-400 pl-4 py-2 my-6 bg-blue-50 italic text-gray-700"
                        {...props}
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
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
                    tr: ({ node, ...props }) => (
                      <tr className="hover:bg-gray-50 transition-colors" {...props} />
                    ),
                    hr: ({ node, ...props }) => <hr className="my-8 border-gray-200" {...props} />,
                  }}
              >
                {content}
              </ReactMarkdown>
            </motion.div>
          </main>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {isChina ? '目录' : 'On This Page'}
              </h3>
              <nav className="space-y-2">
                {(() => {
                  try {
                    const headings = content.split(/^##\s+(.+)$/gm).filter(Boolean);
                    return headings.slice(0, 15).map((heading, idx) => {
                      const text = heading.replace(/^##\s+/, '').trim();
                      if (!text) return null;
                      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '');
                      const isActive = activeSection === id;

                      return (
                        <a
                          key={idx}
                          href={`#${id}`}
                          className={`
                            block py-2 px-3 text-sm rounded-lg transition-all
                            ${isActive
                              ? 'bg-blue-600 text-white font-semibold shadow-sm'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }
                          `}
                        >
                          {text}
                        </a>
                      );
                    });
                  } catch (e) {
                    return null;
                  }
                })()}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Documentation */}
      <div className="bg-white border-t">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            {isChina ? '相关文档' : 'Related Documentation'}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(contentInfo) as ContentType[]).filter(contentType => contentType !== type).map((contentType) => {
              const itemInfo = contentInfo[contentType];
              const ItemIcon = itemInfo.icon;
              return (
                <Link
                  key={contentType}
                  href={`/${locale}/blueprint/${blueprintId}/${contentType}`}
                  className={`
                    group relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                    ${type === contentType
                      ? 'border-gray-300 bg-gray-50 cursor-default'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                    }
                  `}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${itemInfo.gradient} ${itemInfo.color}`}>
                    <ItemIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${type === contentType ? 'text-gray-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
                      {itemInfo.title[locale as 'en' | 'zh']}
                    </p>
                    <p className={`text-xs truncate ${type === contentType ? 'text-gray-400' : 'text-gray-500'}`}>
                      {itemInfo.description[locale as 'en' | 'zh']}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 border-t">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Button
              asChild
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isChina ? '返回蓝图详情' : 'Back to Blueprint Details'}
            </Button>

            <Button asChild size="lg" className="shadow-soft">
              <Link href={`/${locale}/arena`}>
                {isChina ? '浏览所有蓝图' : 'Browse All Blueprints'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
