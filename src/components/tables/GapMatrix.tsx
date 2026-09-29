import React from 'react';
import { clsx } from 'clsx';
import { SkillMatrixRow } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { useNavigate } from 'react-router-dom';

export interface GapMatrixProps {
  rows: SkillMatrixRow[];
  onSkillClick?: (skillId: string) => void;
  className?: string;
}

export const GapMatrix: React.FC<GapMatrixProps> = ({ rows, onSkillClick, className }) => {
  const navigate = useNavigate();

  return (
    <div className={clsx('w-full border border-slate-200 rounded-md bg-white shadow-card overflow-hidden', className)}>
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200 font-mono text-2xs uppercase text-slate-500">
          <tr>
            <th className="px-3 py-2.5 font-bold">Skill Competency</th>
            <th className="px-3 py-2.5 font-bold w-40">Market Demand</th>
            <th className="px-3 py-2.5 font-bold w-40">Curriculum Coverage</th>
            <th className="px-3 py-2.5 font-bold text-center w-28">Severity Gap</th>
            <th className="px-3 py-2.5 font-bold text-center w-36">Employer Validation</th>
            <th className="px-3 py-2.5 font-bold text-right w-24">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-sans">
          {rows.map((row) => (
            <tr
              key={row.skillId}
              onClick={() => (onSkillClick ? onSkillClick(row.skillId) : navigate(`/skills/${row.skillId}`))}
              className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
            >
              <td className="px-3 py-2.5 font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                {row.skillName}
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <ProgressBar value={row.marketDemand} variant="teal" size="xs" />
                  <span className="text-2xs font-mono font-medium text-slate-700 min-w-[28px]">
                    {row.marketDemand}%
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <ProgressBar value={row.curriculumCoverage} variant="rose" size="xs" />
                  <span className="text-2xs font-mono font-medium text-slate-700 min-w-[28px]">
                    {row.curriculumCoverage}%
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5 text-center font-mono font-bold text-rose-600">
                {row.gap > 0 ? `+${row.gap}%` : `${row.gap}%`}
              </td>
              <td className="px-3 py-2.5 text-center font-mono font-semibold text-emerald-700">
                {row.employerValidation}% Quorum
              </td>
              <td className="px-3 py-2.5 text-right">
                <Badge
                  variant={
                    row.status === 'Critical'
                      ? 'rose'
                      : row.status === 'Warning'
                      ? 'amber'
                      : 'emerald'
                  }
                >
                  {row.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
