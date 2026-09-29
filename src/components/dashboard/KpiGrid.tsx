import React from 'react';
import { clsx } from 'clsx';
import { KPICardData } from '../../types';
import { KpiCard } from '../cards/KpiCard';

export interface KpiGridProps {
  kpis: KPICardData[];
  className?: string;
}

export const KpiGrid: React.FC<KpiGridProps> = ({ kpis, className }) => {
  return (
    <div className={clsx('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2', className)}>
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} data={kpi} />
      ))}
    </div>
  );
};
