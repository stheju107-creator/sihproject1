import React from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Sparkline } from '../charts/Sparkline';
import { KPICardData } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface KpiCardProps {
  data: KPICardData;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ data, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (data.targetPath) {
      navigate(data.targetPath);
    }
  };

  const changeColors = {
    increase: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
    decrease: 'text-rose-700 bg-rose-50 border-rose-200/80',
    neutral: 'text-slate-700 bg-slate-50 border-slate-200',
  };

  const ChangeIcon = data.changeType === 'increase' ? TrendingUp : data.changeType === 'decrease' ? TrendingDown : Minus;

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'bg-white border border-slate-200 rounded-md p-2.5 shadow-card hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group select-none min-w-[130px]',
        className
      )}
    >
      {/* Top Label */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-2xs font-mono font-medium text-slate-500 uppercase tracking-wider truncate">
          {data.label}
        </span>
        <span
          className={clsx(
            'inline-flex items-center gap-0.5 text-2xs font-mono font-semibold px-1 py-0.2 rounded border',
            changeColors[data.changeType]
          )}
        >
          <ChangeIcon className="w-2.5 h-2.5" />
          {data.change}
        </span>
      </div>

      {/* Middle Value + Sparkline */}
      <div className="flex items-baseline justify-between gap-1 my-0.5">
        <span className="text-base font-bold font-mono text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
          {data.value}
        </span>
        <Sparkline
          data={data.sparklineData}
          width={54}
          height={18}
          color={data.color}
        />
      </div>

      {/* Bottom Sublabel */}
      <div className="text-2xs font-mono text-slate-400 truncate mt-0.5">
        {data.sublabel}
      </div>
    </div>
  );
};
