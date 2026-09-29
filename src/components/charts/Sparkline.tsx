import React from 'react';
import { clsx } from 'clsx';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: 'teal' | 'blue' | 'amber' | 'rose' | 'emerald' | 'slate';
  className?: string;
  showFill?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 64,
  height = 20,
  color = 'teal',
  className,
  showFill = true,
}) => {
  if (!data || data.length < 2) return null;

  const colorMap = {
    teal: { stroke: '#0d9488', fill: 'rgba(13, 148, 136, 0.15)' },
    blue: { stroke: '#2563eb', fill: 'rgba(37, 99, 235, 0.15)' },
    amber: { stroke: '#d97706', fill: 'rgba(217, 119, 6, 0.15)' },
    rose: { stroke: '#dc2626', fill: 'rgba(220, 38, 38, 0.15)' },
    emerald: { stroke: '#059669', fill: 'rgba(5, 150, 105, 0.15)' },
    slate: { stroke: '#64748b', fill: 'rgba(100, 116, 139, 0.15)' },
  };

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 4) + 2;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width - 2},${height} L 2,${height} Z`;

  const selectedColor = colorMap[color];

  return (
    <svg
      width={width}
      height={height}
      className={clsx('sparkline-svg overflow-visible shrink-0', className)}
      aria-hidden="true"
    >
      {showFill && (
        <path d={areaD} fill={selectedColor.fill} />
      )}
      <path
        d={pathD}
        fill="none"
        stroke={selectedColor.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End point circle */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].split(',')[0]}
          cy={points[points.length - 1].split(',')[1]}
          r="2"
          fill={selectedColor.stroke}
        />
      )}
    </svg>
  );
};
