'use client';

import React from 'react';

interface RadarChartProps {
  metrics: {
    quality: number;
    efficiency: number;
    cost: number;
    trust: number;
  };
  size?: number;
  className?: string;
}

export default function RadarChart({
  metrics,
  size = 80,
  className = ''
}: RadarChartProps) {
  const { quality, efficiency, cost, trust } = metrics;
  const center = size / 2;
  const radius = size / 2 - 4; // Reduced padding

  // Calculate dynamic scale to make differences more visible
  const allValues = [quality, efficiency, cost, trust];
  const minValue = Math.min(...allValues);
  const maxValue = 100;

  // Use a baseline that's 10 points below the minimum, but not below 70
  // This exaggerates differences while keeping the chart readable
  const baseline = Math.max(70, minValue - 10);
  const range = maxValue - baseline;

  // Order: top (quality), right (efficiency), bottom (cost), left (trust)
  const axes = [
    { angle: -90, value: quality, color: '#10B981' },   // Top - green (success)
    { angle: 0, value: efficiency, color: '#3B82F6' },   // Right - blue
    { angle: 90, value: cost, color: '#A855F7' },        // Bottom - purple
    { angle: 180, value: trust, color: '#F59E0B' },      // Left - amber
  ];

  // Convert angle and value to x, y coordinates
  const getCoordinates = (angle: number, value: number) => {
    const radians = (angle * Math.PI) / 180;
    // Normalize value to 0-1 range based on baseline
    const normalizedValue = (value - baseline) / range;
    const distance = normalizedValue * radius;
    return {
      x: center + distance * Math.cos(radians),
      y: center + distance * Math.sin(radians),
    };
  };

  // Background grid points (concentric diamonds) - show 4 levels
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background - light fill */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="rgba(21, 94, 239, 0.03)"
      />

      {/* Grid lines (concentric diamonds) */}
      {gridLevels.map((level) => {
        const points = axes.map(axis => {
          const radians = (axis.angle * Math.PI) / 180;
          const distance = level * radius;
          const x = center + distance * Math.cos(radians);
          const y = center + distance * Math.sin(radians);
          return `${x},${y}`;
        }).join(' ');

        return (
          <polygon
            key={`grid-${level}`}
            points={points}
            fill="none"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Axis lines */}
      {axes.map((axis, index) => {
        const coords = getCoordinates(axis.angle, maxValue);
        return (
          <line
            key={`axis-${index}`}
            x1={center}
            y1={center}
            x2={coords.x}
            y2={coords.y}
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={axes.map(axis => {
          const coords = getCoordinates(axis.angle, axis.value);
          return `${coords.x},${coords.y}`;
        }).join(' ')}
        fill="rgba(21, 94, 239, 0.25)"
        stroke="#155EEF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Data points - color-coded by metric */}
      {axes.map((axis, index) => {
        const coords = getCoordinates(axis.angle, axis.value);
        return (
          <circle
            key={`point-${index}`}
            cx={coords.x}
            cy={coords.y}
            r="3.5"
            fill={axis.color}
            stroke="white"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
