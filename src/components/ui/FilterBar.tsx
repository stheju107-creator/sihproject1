import React from 'react';
import { clsx } from 'clsx';
import { Filter } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (val: string) => void;
}

export interface FilterBarProps {
  groups?: FilterGroup[];
  pills?: {
    id: string;
    label: string;
    active: boolean;
    onClick: () => void;
    count?: number;
  }[];
  className?: string;
  extraContent?: React.ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  groups,
  pills,
  className,
  extraContent,
}) => {
  return (
    <div className={clsx('flex flex-wrap items-center gap-2 py-1', className)}>
      {pills && pills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {pills.map((pill) => (
            <button
              key={pill.id}
              onClick={pill.onClick}
              className={clsx(
                'px-2.5 py-1 rounded text-xs font-medium transition-colors border',
                pill.active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <span>{pill.label}</span>
              {pill.count !== undefined && (
                <span
                  className={clsx(
                    'ml-1.5 px-1 py-0.2 rounded text-2xs font-mono',
                    pill.active ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                  )}
                >
                  {pill.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {groups && groups.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((group) => (
            <div key={group.id} className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium text-2xs uppercase tracking-wider">{group.label}:</span>
              <select
                value={group.selectedValue}
                onChange={(e) => group.onChange(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-xs"
              >
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} {opt.count !== undefined ? `(${opt.count})` : ''}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {extraContent && <div className="ml-auto">{extraContent}</div>}
    </div>
  );
};
