'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useLocale } from 'next-intl';
import 'highlight.js/styles/github-dark.css';

type ContentType = 'implementation' | 'requirements' | 'validation' | 'project';

const tabs: { type: ContentType; label: string }[] = [
  { type: 'implementation', label: 'Implementation' },
  { type: 'requirements', label: 'Requirements' },
  { type: 'validation', label: 'Validation' },
  { type: 'project', label: 'Project' },
];

export default function BlueprintContentPage({ type, blueprintId }: { type: ContentType; blueprintId: string }) {
  const locale = useLocale();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);

        const fileName = type === 'validation' ? 'validation-report' :
                        type === 'project' ? 'project-report' : type;

        const localeFileName = `${fileName}.${locale}.md`;
        const response = await fetch(`/content/blueprints/${blueprintId}/${localeFileName}`);

        if (!response.ok) {
          const fallbackResponse = await fetch(`/content/blueprints/${blueprintId}/${fileName}.md`);
          if (!fallbackResponse.ok) {
            throw new Error(`Content not found: ${blueprintId}/${fileName}`);
          }
          const text = await fallbackResponse.text();
          setContent(text);
        } else {
          const text = await response.text();
          setContent(text);
        }

        setError(null);
      } catch (err) {
        console.error('[BlueprintContentPage] Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [blueprintId, type, locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-48 mb-8"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6 mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Content</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <div className="py-4">
            <a
              href={`/${locale}/blueprint/${blueprintId}`}
              className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blueprint
            </a>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 -mb-px overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = tab.type === type;
              return (
                <a
                  key={tab.type}
                  href={`/${locale}/blueprint/${blueprintId}/${tab.type}`}
                  className={`
                    px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                    ${isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }
                  `}
                >
                  {tab.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-slate-900 mt-12 mb-6 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-slate-700 leading-relaxed mb-4">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 hover:text-blue-700 underline transition-colors"
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-6 space-y-2 text-slate-700">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-6 space-y-2 text-slate-700">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-6 bg-slate-50 text-slate-700 italic">
                {children}
              </blockquote>
            ),
            code: ({ inline, className, children }: any) => {
              if (inline) {
                return (
                  <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              }
              return (
                <code className={className}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-slate-900 rounded-lg p-4 mb-6 overflow-x-auto">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-slate-200 border border-slate-200">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-slate-50">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="bg-white divide-y divide-slate-200">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-slate-50 transition-colors">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 text-sm text-slate-700">
                {children}
              </td>
            ),
            hr: () => (
              <hr className="my-8 border-t border-slate-200" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
