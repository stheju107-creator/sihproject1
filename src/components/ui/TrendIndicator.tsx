import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface TrendIndicatorProps {
  value: string | number;
  type?: 'increase' | 'decrease' | 'neutral';
  prefix?: string;
  suffix?: string;
  size?: 'xs' | 'sm';
  className?: string;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  value,
  type = 'increase',
  prefix = '',
  suffix = '',
  size = 'xs',
  className,
}) => {
  const styles = {
    increase: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
    decrease: 'text-rose-700 bg-rose-50 border-rose-200/80',
    neutral: 'text-slate-700 bg-slate-50 border-slate-200',
  };

  const Icon = type === 'increase' ? TrendingUp : type === 'decrease' ? TrendingDown : Minus;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-0.5 font-mono font-medium rounded border px-1.5 py-0.5',
        size === 'xs' ? 'text-2xs' : 'text-xs',
        styles[type],
        className
      )}
    >
      <Icon className={clsx(size === 'xs' ? 'w-2.5 h-2.5' : 'w-3 h-3', 'stroke-[2.5]')} />
      <span>
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
};
