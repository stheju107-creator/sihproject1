import React from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Skill } from '../../types';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, className }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/skills/${skill.id}`)}
      className={clsx(
        'bg-white border border-slate-200 rounded-md p-3.5 shadow-card hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Badge variant="teal">{skill.category}</Badge>
          <span className="inline-flex items-center gap-0.5 text-2xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            <TrendingUp className="w-2.5 h-2.5" />
            {skill.growth}
          </span>
        </div>

        <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between">
          <span>{skill.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h4>

        <p className="text-2xs text-slate-500 mt-1 line-clamp-2">{skill.description}</p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
        <div>
          <div className="flex justify-between text-2xs font-mono mb-1">
            <span className="text-slate-500">Industry Demand</span>
            <span className="font-bold text-slate-800">{skill.demandPct}%</span>
          </div>
          <ProgressBar value={skill.demandPct} variant="teal" size="xs" />
        </div>

        <div>
          <div className="flex justify-between text-2xs font-mono mb-1">
            <span className="text-slate-500">Curriculum Coverage</span>
            <span className="font-bold text-rose-700">{skill.curriculumCoveragePct}%</span>
          </div>
          <ProgressBar value={skill.curriculumCoveragePct} variant="rose" size="xs" />
        </div>

        <div className="flex justify-between items-center text-2xs font-mono pt-1 text-slate-400">
          <span>{skill.relatedRoles.length} Targeted Roles</span>
          <span className="text-amber-700 font-semibold">{skill.gapPct}% Divergence</span>
        </div>
      </div>
    </div>
  );
};
