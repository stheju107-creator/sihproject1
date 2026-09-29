import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle, RefreshCw, FolderSearch } from 'lucide-react';
import { Button } from './Button';

export interface LoadingSkeletonProps {
  rows?: number;
  type?: 'card' | 'table' | 'kpi' | 'chart';
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  rows = 4,
  type = 'table',
  className,
}) => {
  if (type === 'kpi') {
    return (
      <div className={clsx('grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2', className)}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-md p-3 animate-pulse">
            <div className="h-2.5 bg-slate-200 rounded w-2/3 mb-2" />
            <div className="h-5 bg-slate-200 rounded w-1/2 mb-2" />
            <div className="h-2 bg-slate-100 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-md p-4 animate-pulse space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-100 rounded w-16" />
            </div>
            <div className="h-3 bg-slate-100 rounded w-full" />
            <div className="h-3 bg-slate-100 rounded w-4/5" />
            <div className="pt-2 flex gap-2">
              <div className="h-6 bg-slate-200 rounded w-20" />
              <div className="h-6 bg-slate-100 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={clsx('bg-white border border-slate-200 rounded-md p-4 space-y-3 animate-pulse', className)}>
      <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-3.5 bg-slate-200 rounded w-1/5" />
          <div className="h-3.5 bg-slate-100 rounded w-2/5" />
          <div className="h-3.5 bg-slate-100 rounded w-1/5" />
          <div className="h-3.5 bg-slate-200 rounded w-1/10" />
        </div>
      ))}
    </div>
  );
};

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'Try adjusting your search criteria or resetting applied filters.',
  icon,
  action,
  className,
}) => {
  return (
    <div className={clsx('bg-white border border-slate-200 rounded-md p-8 text-center flex flex-col items-center justify-center', className)}>
      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-3">
        {icon || <FolderSearch className="w-5 h-5" />}
      </div>
      <h4 className="text-sm font-semibold text-slate-800 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mb-4">{description}</p>
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Data Pipeline Sync Interrupted',
  message = 'An error occurred while fetching real-time telemetry from the labour intelligence engine.',
  onRetry,
  className,
}) => {
  return (
    <div className={clsx('bg-rose-50/60 border border-rose-200 rounded-md p-6 text-center flex flex-col items-center justify-center', className)}>
      <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-rose-900 mb-1">{title}</h4>
      <p className="text-xs text-rose-700 max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={onRetry}>
          Retry Query
        </Button>
      )}
    </div>
  );
};
