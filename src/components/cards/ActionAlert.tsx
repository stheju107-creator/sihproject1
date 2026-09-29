import React from 'react';
import { clsx } from 'clsx';
import { UrgentAction } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AlertCircle, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export interface ActionAlertProps {
  action: UrgentAction;
  onActionClick: (action: UrgentAction) => void;
  className?: string;
}

export const ActionAlert: React.FC<ActionAlertProps> = ({
  action,
  onActionClick,
  className,
}) => {
  const borderStyles = {
    critical: 'border-l-4 border-l-rose-500 border-rose-200/80 bg-white',
    warning: 'border-l-4 border-l-amber-500 border-amber-200/80 bg-white',
    info: 'border-l-4 border-l-blue-500 border-blue-200/80 bg-white',
  };

  const badgeVariants = {
    critical: 'rose' as const,
    warning: 'amber' as const,
    info: 'blue' as const,
  };

  const HeaderIcon =
    action.severity === 'critical'
      ? AlertCircle
      : action.severity === 'warning'
      ? AlertTriangle
      : CheckCircle;

  return (
    <div
      className={clsx(
        'border rounded-md p-3 shadow-card transition-all flex flex-col justify-between space-y-2',
        borderStyles[action.severity],
        className
      )}
    >
      {/* Category + Affected count badge */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1.5">
          <HeaderIcon
            className={clsx(
              'w-3.5 h-3.5',
              action.severity === 'critical'
                ? 'text-rose-600'
                : action.severity === 'warning'
                ? 'text-amber-600'
                : 'text-blue-600'
            )}
          />
          <span className="text-2xs font-mono font-bold tracking-wider uppercase text-slate-700">
            {action.category}
          </span>
        </div>
        <Badge variant={badgeVariants[action.severity]}>
          {action.affectedCount}
        </Badge>
      </div>

      {/* Title */}
      <h4 className="text-xs font-bold text-slate-900 leading-snug">
        {action.title}
      </h4>

      {/* Description */}
      <p className="text-2xs text-slate-600 leading-relaxed font-sans">
        {action.description}
      </p>

      {/* Footer / Action Button */}
      <div className="pt-1 flex items-center justify-between border-t border-slate-100 mt-1">
        <span className="text-2xs font-mono text-slate-400">
          {action.affectedLabel}
        </span>
        <Button
          variant={action.severity === 'critical' ? 'teal' : 'secondary'}
          size="xs"
          onClick={() => onActionClick(action)}
          icon={<ArrowRight className="w-3 h-3" />}
          iconPosition="right"
        >
          {action.actionLabel}
        </Button>
      </div>
    </div>
  );
};
