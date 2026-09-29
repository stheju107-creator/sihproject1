import React from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { AcceleratingSkill } from '../../types';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { TrendingUp, ArrowUpRight, Zap } from 'lucide-react';

export interface FastestSkillsProps {
  skills: AcceleratingSkill[];
  className?: string;
}

export const FastestSkills: React.FC<FastestSkillsProps> = ({ skills, className }) => {
  const navigate = useNavigate();

  return (
    <div className={clsx('bg-white border border-slate-200 rounded-md p-3.5 shadow-card flex flex-col justify-between space-y-2.5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              FASTEST ACCELERATING SKILLS
            </h3>
            <Badge variant="teal">30D MOMENTUM</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Real-time delta from analyzed job requirements across active enterprise postings
          </p>
        </div>
        <button
          onClick={() => navigate('/skills')}
          className="text-2xs font-mono text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-0.5"
        >
          View All 632 →
        </button>
      </div>

      {/* List of Skills */}
      <div className="space-y-2.5">
        {skills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => navigate(`/skills/${skill.id}`)}
            className="p-2.5 rounded bg-slate-50/60 border border-slate-200 hover:bg-teal-50/30 hover:border-teal-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition-colors">
                  {skill.name}
                </span>
                <span className="text-2xs font-mono text-slate-400">({skill.category})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 text-2xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {skill.momentum}
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-2xs font-mono mb-1 text-slate-500">
              <div>
                <span>Demand Index: </span>
                <strong className="text-teal-700 font-bold">{skill.demandPct}%</strong>
              </div>
              <div>
                <span>Curriculum: </span>
                <strong className="text-blue-700 font-bold">{skill.coveragePct}% Covered</strong>
              </div>
              <div className="text-right">
                <span>Deficit Gap: </span>
                <strong className="text-rose-600 font-bold">{skill.gapPct}%</strong>
              </div>
            </div>

            <ProgressBar value={skill.coveragePct} variant={skill.gapPct > 30 ? 'rose' : 'teal'} size="xs" />
          </div>
        ))}
      </div>
    </div>
  );
};
