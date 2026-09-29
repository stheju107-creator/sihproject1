import React from 'react';
import { clsx } from 'clsx';
import { Badge } from '../ui/Badge';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subvalue?: string;
  badge?: {
    text: string;
    variant?: 'teal' | 'blue' | 'amber' | 'rose' | 'emerald' | 'slate';
  };
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subvalue,
  badge,
  icon,
  description,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white border border-slate-200 rounded-md p-3 shadow-card transition-all flex flex-col justify-between',
        onClick && 'cursor-pointer hover:border-slate-300 hover:shadow-xs',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          {icon && <span className="text-slate-500">{icon}</span>}
          <span className="text-2xs font-mono font-medium uppercase text-slate-500">{title}</span>
        </div>
        {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
      </div>

      <div className="flex items-baseline gap-2 my-1">
        <span className="text-xl font-bold font-mono text-slate-900 tracking-tight">{value}</span>
        {subvalue && <span className="text-2xs font-mono text-slate-500">{subvalue}</span>}
      </div>

      {description && <p className="text-2xs text-slate-500 mt-1 line-clamp-2">{description}</p>}
    </div>
  );
};
