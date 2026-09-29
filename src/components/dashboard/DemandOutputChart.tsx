import React, { useState } from 'react';
import { clsx } from 'clsx';
import { DemandOutputDataPoint } from '../../types';
import { LineChart } from '../charts/LineChart';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles, TrendingUp, Info } from 'lucide-react';

export interface DemandOutputChartProps {
  data: DemandOutputDataPoint[];
  selectedSector: string;
  onSectorChange: (sector: string) => void;
  onOpenModelProjections: () => void;
  className?: string;
}

export const DemandOutputChart: React.FC<DemandOutputChartProps> = ({
  data,
  selectedSector,
  onSectorChange,
  onOpenModelProjections,
  className,
}) => {
  const sectors = ['All Sectors', 'IT & Cloud', 'Advanced Manufacturing'];
  const latest = data[data.length - 1] || { marketVacancies: 12480, certifiedTrainees: 8210, gap: 4270 };

  return (
    <div className={clsx('bg-white border border-slate-200 rounded-md p-3.5 shadow-card flex flex-col justify-between', className)}>
      {/* Header with Title, Badge, and Sector Filter Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              DEMAND VS. TRAINING OUTPUT
            </h3>
            <Badge variant="rose">34% Widening Deficit</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Monthly aggregated state vacancies parsed vs certified polytechnic graduates
          </p>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => onSectorChange(sec)}
              className={clsx(
                'px-2 py-0.5 rounded text-2xs font-mono font-medium transition-colors',
                selectedSector === sec
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Snapshot Counters */}
      <div className="grid grid-cols-3 gap-2 py-2 text-2xs font-mono border-b border-slate-100 bg-slate-50/50 px-2 rounded mt-2">
        <div>
          <span className="text-slate-500 block">Market Vacancies</span>
          <span className="text-xs font-bold text-teal-700">
            {latest.marketVacancies.toLocaleString()}/month
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Certified Trainees</span>
          <span className="text-xs font-bold text-blue-700">
            {latest.certifiedTrainees.toLocaleString()}/month
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">State Supply Gap</span>
          <span className="text-xs font-bold text-rose-600">
            {latest.gap.toLocaleString()} graduates
          </span>
        </div>
      </div>

      {/* Recharts Composed Area / Line Chart */}
      <div className="pt-2">
        <LineChart
          data={data}
          xKey="month"
          height={210}
          showDeficitArea={true}
          series={[
            {
              key: 'marketVacancies',
              label: 'Market Vacancies Index',
              color: '#0d9488',
              strokeWidth: 2.5,
            },
            {
              key: 'certifiedTrainees',
              label: 'Certified Trainees',
              color: '#2563eb',
              strokeWidth: 2,
              strokeDasharray: '4 4',
            },
          ]}
        />
      </div>

      {/* Bottom Algorithmic Projection Banner */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-teal-50/40 p-2 rounded border border-teal-200/60">
        <div className="flex items-center gap-1.5 text-2xs text-teal-950 font-sans">
          <Sparkles className="w-3.5 h-3.5 text-teal-700 shrink-0" />
          <span>
            <strong className="font-semibold text-teal-900">Algorithmic Projection:</strong> Adding 48 vocational batches in Tier-2 districts neutralizes gap by Q3 2026.
          </span>
        </div>
        <Button
          variant="teal"
          size="xs"
          onClick={onOpenModelProjections}
          icon={<ArrowRight className="w-3 h-3" />}
          iconPosition="right"
        >
          Model Projections →
        </Button>
      </div>
    </div>
  );
};
