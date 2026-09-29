import React from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { DistrictDeficit } from '../../types';
import { DistrictRow } from '../tables/DistrictRow';
import { Badge } from '../ui/Badge';
import { Map, ArrowRight } from 'lucide-react';

export interface DistrictHeatmapProps {
  districts: DistrictDeficit[];
  onAction?: (district: DistrictDeficit) => void;
  className?: string;
}

export const DistrictHeatmap: React.FC<DistrictHeatmapProps> = ({
  districts,
  onAction,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div className={clsx('bg-white border border-slate-200 rounded-md p-3.5 shadow-card flex flex-col justify-between space-y-2.5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              DISTRICT PRIORITY HEATMAP
            </h3>
            <Badge variant="rose">REGIONAL BOTTLENECKS</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Spatial vocational infrastructure and technical seat shortage density across state hubs
          </p>
        </div>
        <button
          onClick={() => navigate('/district-planning')}
          className="text-2xs font-mono text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-0.5"
        >
          Open GIS Planner →
        </button>
      </div>

      {/* District rows list */}
      <div className="space-y-2">
        {districts.slice(0, 4).map((dist) => (
          <DistrictRow key={dist.id} district={dist} onAction={onAction} />
        ))}
      </div>
    </div>
  );
};
