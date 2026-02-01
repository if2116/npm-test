'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailedMetric {
  label: { en: string; zh: string };
  value: number;
}

interface RadarChartHoverProps {
  metrics: {
    quality: number;
    efficiency: number;
    cost: number;
    trust: number;
  };
  detailedMetrics?: {
    [key: string]: DetailedMetric;
  };
  locale: 'en' | 'zh';
}

/**
 * Mini radar chart popup showing scenario-specific metrics on hover
 * Displays 4 main pillar metrics plus any scenario-specific detailed metrics
 */
export default function RadarChartHover({
  metrics,
  detailedMetrics,
  locale,
}: RadarChartHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const allMetrics = [
    { key: 'quality', label: { en: 'Quality', zh: '质量' }, value: metrics.quality, color: 'bg-success' },
    { key: 'efficiency', label: { en: 'Efficiency', zh: '效率' }, value: metrics.efficiency, color: 'bg-blue-500' },
    { key: 'cost', label: { en: 'Cost', zh: '成本' }, value: metrics.cost, color: 'bg-purple-500' },
    { key: 'trust', label: { en: 'Trust', zh: '信任' }, value: metrics.trust, color: 'bg-amber-500' },
    ...(detailedMetrics
      ? Object.entries(detailedMetrics).map(([key, metric]) => ({
          key,
          label: metric.label,
          value: metric.value,
          color: 'bg-primary',
        }))
      : []),
  ];

  // Calculate popup position when hovered
  useEffect(() => {
    if (isHovered && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupWidth = 288; // w-72 = 18rem = 288px
      const popupHeight = 400; // Approximate height
      const padding = 8;

      let left = rect.left;
      let top = rect.bottom + padding;

      // Prevent going off right edge
      if (left + popupWidth > window.innerWidth - padding) {
        left = window.innerWidth - popupWidth - padding;
      }

      // Prevent going off bottom edge
      if (top + popupHeight > window.innerHeight - padding) {
        top = rect.top - popupHeight - padding;
      }

      setPopupPosition({ top, left });
    }
  }, [isHovered]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Trigger area - 4-pillar summary */}
      <div className="flex items-center gap-2 cursor-help">
        <div className="flex gap-1">
          {[
            metrics.quality,
            metrics.efficiency,
            metrics.cost,
            metrics.trust,
          ].map((value, idx) => (
            <div
              key={idx}
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: value >= 90 ? '#10B981' : value >= 80 ? '#3B82F6' : value >= 70 ? '#A855F7' : '#F59E0B',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {locale === 'en' ? 'Hover for details' : '悬浮查看详情'}
        </span>
      </div>

      {/* Popup - Fixed positioning with calculated coordinates */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[9999] w-72 rounded-xl border-2 border-gray-200 bg-white shadow-2xl p-4"
            style={{
              top: popupPosition.top,
              left: popupPosition.left,
            }}
          >
            {/* Header */}
            <div className="mb-3 pb-2 border-b border-gray-100">
              <h4 className="text-sm font-bold text-gray-900">
                {locale === 'en' ? 'Performance Metrics' : '性能指标'}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {locale === 'en' ? 'Scenario-specific evaluation' : '场景化专家评测'}
              </p>
            </div>

            {/* Metrics list */}
            <div className="space-y-2.5">
              {allMetrics.map((metric) => (
                <div key={metric.key} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-700">
                        {metric.label[locale]}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full ${metric.color} transition-all duration-500`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            {detailedMetrics && (
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 italic">
                  {locale === 'en'
                    ? '✓ Includes scenario-specific metrics'
                    : '✓ 包含场景化专项指标'}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
