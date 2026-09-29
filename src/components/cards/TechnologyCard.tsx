import React from 'react';
import { clsx } from 'clsx';
import { EmergingTechItem } from '../../types';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Radio, Zap, Lightbulb } from 'lucide-react';

export interface TechnologyCardProps {
  tech: EmergingTechItem;
  isSelected?: boolean;
  onSelect: (tech: EmergingTechItem) => void;
  className?: string;
}

export const TechnologyCard: React.FC<TechnologyCardProps> = ({
  tech,
  isSelected = false,
  onSelect,
  className,
}) => {
  const quadrantColors = {
    Adoption: 'emerald' as const,
    Trial: 'blue' as const,
    Assess: 'amber' as const,
    Hold: 'slate' as const,
  };

  return (
    <div
      onClick={() => onSelect(tech)}
      className={clsx(
        'bg-white border rounded-md p-3.5 shadow-card transition-all cursor-pointer flex flex-col justify-between group',
        isSelected ? 'border-teal-600 ring-1 ring-teal-500 bg-teal-50/10' : 'border-slate-200 hover:border-slate-300',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <Badge variant={quadrantColors[tech.radarQuadrant]}>
            {tech.radarQuadrant} Stage
          </Badge>
          <span className="text-2xs font-mono text-slate-500">{tech.horizon}</span>
        </div>

        <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between">
          <span>{tech.name}</span>
          <span className="text-2xs font-mono font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
            {tech.growthSignal}
          </span>
        </h4>

        <p className="text-2xs text-slate-500 mt-1.5 line-clamp-2">{tech.description}</p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
        <div>
          <div className="flex justify-between text-2xs font-mono mb-1">
            <span className="text-slate-500">State Institutional Readiness</span>
            <span className="font-bold text-slate-800">{tech.readinessInState}%</span>
          </div>
          <ProgressBar value={tech.readinessInState} variant="gradient" size="xs" />
        </div>

        <div className="flex flex-wrap gap-1 pt-1">
          {tech.requiredSkills.slice(0, 3).map((sk) => (
            <span key={sk} className="px-1.5 py-0.2 bg-slate-50 border border-slate-200 rounded text-2xs font-mono text-slate-600">
              {sk}
            </span>
          ))}
          {tech.requiredSkills.length > 3 && (
            <span className="text-2xs font-mono text-slate-400 self-center">
              +{tech.requiredSkills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
