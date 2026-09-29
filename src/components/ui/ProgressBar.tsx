import React from 'react';
import { clsx } from 'clsx';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  variant?: 'teal' | 'blue' | 'amber' | 'rose' | 'emerald' | 'gradient';
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  labelPosition?: 'right' | 'top';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'teal',
  size = 'xs',
  showLabel = false,
  labelPosition = 'right',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variantBarStyles = {
    teal: 'bg-teal-600',
    blue: 'bg-blue-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    emerald: 'bg-emerald-600',
    gradient: 'bg-gradient-to-r from-teal-500 to-blue-600',
  };

  const heightStyles = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-2.5',
  };

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between items-center text-xs font-mono text-slate-600 mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className={clsx('w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50', heightStyles[size])}>
          <div
            className={clsx('h-full transition-all duration-300 rounded-full', variantBarStyles[variant])}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {showLabel && labelPosition === 'right' && (
          <span className="text-2xs font-mono font-medium text-slate-700 min-w-[32px] text-right">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};
