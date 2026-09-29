import React from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { JobRole } from '../../types';
import { Badge } from '../ui/Badge';
import { Briefcase, MapPin, TrendingUp, ChevronRight } from 'lucide-react';

export interface RoleCardProps {
  role: JobRole;
  className?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, className }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/job-roles/${role.id}`)}
      className={clsx(
        'bg-white border border-slate-200 rounded-md p-3.5 shadow-card hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Badge variant="blue">{role.category}</Badge>
          <span className="inline-flex items-center gap-0.5 text-2xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            <TrendingUp className="w-2.5 h-2.5" />
            {role.growth}
          </span>
        </div>

        <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between">
          <span>{role.title}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
        </h4>

        <div className="flex items-center gap-3 mt-1.5 text-2xs font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-400" />
            {role.activePostings.toLocaleString()} Openings
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            {role.locations[0]} +{role.locations.length - 1}
          </span>
        </div>

        <p className="text-2xs text-slate-600 mt-2 line-clamp-2">{role.description}</p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100">
        <span className="text-2xs font-mono text-slate-400 uppercase block mb-1.5">Top Required Skills</span>
        <div className="flex flex-wrap gap-1">
          {role.topSkills.map((sk) => (
            <span
              key={sk}
              className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-2xs font-mono text-slate-700"
            >
              {sk}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-2xs font-mono pt-2 mt-2 border-t border-slate-100/70 text-slate-500">
          <span>Salary: <span className="text-slate-800 font-semibold">{role.salaryRange}</span></span>
          <span className="text-teal-700 font-medium">Matrix ({role.skillMatrix.length}) →</span>
        </div>
      </div>
    </div>
  );
};
