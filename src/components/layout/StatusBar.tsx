import React from 'react';
import { clsx } from 'clsx';
import { Activity, Clock, Database, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface StatusBarProps {
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        'bg-slate-900 text-slate-200 px-3 md:px-4 py-1.5 flex flex-wrap items-center justify-between text-2xs font-mono border-b border-slate-800 shadow-xs select-none gap-2',
        className
      )}
    >
      {/* Left: Real-time telemetry */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-slate-400">Real-time Sync:</span>
          <span className="text-white font-bold">12,480 job postings indexed</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>Last crawl:</span>
          <span className="text-slate-200">14 mins ago</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3 h-3" />
          <span className="font-semibold tracking-wider">ALL ML MODELS OPERATIONAL</span>
        </div>
      </div>

      {/* Right: Engine Status Nodes */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1.5">
          <span className="text-slate-400">Labour Market Engine:</span>
          <span className="text-teal-400 font-bold">ONLINE</span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5">
          <span className="text-slate-400">Curriculum Alignment Engine:</span>
          <span className="text-teal-400 font-bold">ONLINE</span>
        </div>

        <Badge variant="amber" size="xs" dot>
          DEMO DATA ACTIVE
        </Badge>
      </div>
    </div>
  );
};
