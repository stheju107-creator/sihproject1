import React from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { DistrictDeficit } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, ArrowRight } from 'lucide-react';

export interface DistrictRowProps {
  district: DistrictDeficit;
  onAction?: (district: DistrictDeficit) => void;
  className?: string;
}

export const DistrictRow: React.FC<DistrictRowProps> = ({ district, onAction, className }) => {
  const navigate = useNavigate();

  const severityStyles = {
    'Critical Gap': 'rose' as const,
    'High Demand': 'amber' as const,
    'Trainer Deficit': 'blue' as const,
    'Frontier Surge': 'teal' as const,
    'Moderate': 'slate' as const,
  };

  return (
    <div
      onClick={() => navigate(`/district/${district.id}`)}
      className={clsx(
        'flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50/50 transition-all cursor-pointer group text-xs',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-[180px]">
        <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors shrink-0">
          <MapPin className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
            {district.name}
          </div>
          <div className="text-2xs font-mono text-slate-400">{district.hub}</div>
        </div>
      </div>

      <div className="hidden md:block flex-1 px-4">
        <span className="text-2xs font-mono text-slate-500 block mb-0.5 uppercase">Primary Deficit Cluster</span>
        <span className="text-xs text-slate-800 font-medium">{district.primaryCluster}</span>
      </div>

      <div className="min-w-[110px] text-right">
        <span className="text-2xs font-mono text-slate-400 block mb-0.5">Capacity Deficit</span>
        <span className="text-xs font-mono font-bold text-rose-600">
          {district.capacityDeficit.toLocaleString()} seats
        </span>
      </div>

      <div className="min-w-[110px] text-center px-2">
        <Badge variant={severityStyles[district.severity]}>
          {district.severity}
        </Badge>
      </div>

      <div className="min-w-[100px] text-right" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => (onAction ? onAction(district) : navigate(`/district/${district.id}`))}
          icon={<ArrowRight className="w-3 h-3" />}
          iconPosition="right"
        >
          {district.action}
        </Button>
      </div>
    </div>
  );
};
