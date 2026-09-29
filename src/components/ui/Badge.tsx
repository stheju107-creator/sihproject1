import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'blue' | 'amber' | 'rose' | 'emerald' | 'slate' | 'navy' | 'outline' | 'purple';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'xs',
  className,
  dot = false,
}) => {
  const variantStyles = {
    teal: 'bg-teal-50 text-teal-800 border-teal-200/70',
    blue: 'bg-blue-50 text-blue-800 border-blue-200/70',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/70',
    rose: 'bg-rose-50 text-rose-800 border-rose-200/70',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    navy: 'bg-slate-900 text-slate-100 border-slate-800',
    purple: 'bg-purple-50 text-purple-800 border-purple-200/70',
    outline: 'bg-transparent text-slate-600 border-slate-300',
  };

  const dotColors = {
    teal: 'bg-teal-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    emerald: 'bg-emerald-500',
    slate: 'bg-slate-400',
    navy: 'bg-slate-200',
    purple: 'bg-purple-500',
    outline: 'bg-slate-400',
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-2xs font-mono font-medium',
    sm: 'px-2 py-0.5 text-xs font-mono font-medium',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded border tracking-tight',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full inline-block', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
