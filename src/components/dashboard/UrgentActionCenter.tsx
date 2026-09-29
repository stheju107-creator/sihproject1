import React from 'react';
import { clsx } from 'clsx';
import { UrgentAction } from '../../types';
import { Badge } from '../ui/Badge';
import { ActionAlert } from '../cards/ActionAlert';
import { AlertCircle } from 'lucide-react';

export interface UrgentActionCenterProps {
  actions: UrgentAction[];
  onActionClick: (action: UrgentAction) => void;
  className?: string;
}

export const UrgentActionCenter: React.FC<UrgentActionCenterProps> = ({
  actions,
  onActionClick,
  className,
}) => {
  return (
    <div className={clsx('bg-white border border-slate-200 rounded-md p-3.5 shadow-card flex flex-col justify-between space-y-2.5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
            URGENT ACTION CENTER
          </h3>
        </div>
        <Badge variant="rose">3 UNRESOLVED</Badge>
      </div>

      {/* 3 Alert Cards */}
      <div className="space-y-2.5 flex-1 flex flex-col justify-between">
        {actions.map((act) => (
          <ActionAlert key={act.id} action={act} onActionClick={onActionClick} />
        ))}
      </div>
    </div>
  );
};
