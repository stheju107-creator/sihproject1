import React from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { FeedbackLoopItem } from '../../types';
import { Badge } from '../ui/Badge';
import { ChevronRight, ArrowRight, Activity } from 'lucide-react';

export interface FeedbackLoopProps {
  items: FeedbackLoopItem[];
  className?: string;
}

export const FeedbackLoop: React.FC<FeedbackLoopProps> = ({ items, className }) => {
  const navigate = useNavigate();

  return (
    <div className={clsx('bg-white border border-slate-200 rounded-md p-3 shadow-card', className)}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              CORE INTELLIGENCE FEEDBACK LOOP
            </h2>
            <Badge variant="teal">CLOSED-LOOP</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Closed-Loop Algorithmic Orchestration • Live Synchronized Feedback Pipeline
          </p>
        </div>

        <div className="flex items-center gap-2 text-2xs font-mono">
          <Badge variant="slate" dot>DEMO DATA ACTIVE</Badge>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            Loop Latency: <span className="text-teal-700 font-bold">1.4s</span>
          </span>
        </div>
      </div>

      {/* 8 Compact Horizontal Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {items.map((item, index) => {
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.targetPath)}
              className="bg-slate-50/70 border border-slate-200 rounded p-2.5 hover:bg-teal-50/30 hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between min-h-[92px] relative"
            >
              <div>
                <div className="flex items-center justify-between text-2xs font-mono text-slate-400 mb-1">
                  <span className="font-bold text-slate-500 group-hover:text-teal-700">{item.stepNumber}</span>
                  <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 group-hover:text-teal-600 transition-opacity" />
                </div>
                <div className="text-2xs font-semibold text-slate-800 truncate mb-1">
                  {item.title}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold font-mono text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                  {item.metric}
                </div>
                <div className="mt-1">
                  <Badge variant={item.badgeVariant} size="xs" className="w-full justify-center">
                    {item.badge}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
