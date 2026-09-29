import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { labourMarketApi } from '../services/labourMarketApi';
import { JobRole } from '../types';
import { GapMatrix } from '../components/tables/GapMatrix';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { ErrorState } from '../components/ui/ErrorState';
import {
  ArrowLeft,
  Layers,
  BookOpen,
} from 'lucide-react';

export const RoleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [role, setRole] = useState<JobRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRole() {
      try {
        setLoading(true);
        const data = await labourMarketApi.getJobRoleById(id || 'role-backend-dev');
        if (data) {
          setRole(data);
        } else {
          setError('Job Role not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch job role details');
      } finally {
        setLoading(false);
      }
    }
    loadRole();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton type="table" rows={6} />;
  }

  if (error || !role) {
    return (
      <ErrorState
        title="Role Information Not Found"
        message={error || 'Could not locate the requested occupational profile.'}
        onRetry={() => navigate('/job-roles')}
      />
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Back Button + Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="xs"
            onClick={() => navigate('/job-roles')}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Roles
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono">
                {role.title}
              </h1>
              <Badge variant="teal">{role.demandLevel} Demand</Badge>
              <Badge variant="emerald">{role.growth} MoM</Badge>
            </div>
            <p className="text-2xs font-mono text-slate-500 mt-0.5">
              ID: {role.id} • {role.nsqfAlignment}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="teal"
            size="xs"
            onClick={() => navigate('/skill-gap-analysis')}
            icon={<Layers className="w-3.5 h-3.5" />}
          >
            Run 3-Layer Gap Analysis
          </Button>
          <Button
            variant="primary"
            size="xs"
            onClick={() => navigate('/curriculum-advisor')}
            icon={<BookOpen className="w-3.5 h-3.5" />}
          >
            View Curriculum Blueprints
          </Button>
        </div>
      </div>

      {/* Role Metadata Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Active Job Postings</span>
          <span className="text-lg font-bold font-mono text-slate-900">{role.activePostings.toLocaleString()}</span>
          <span className="text-2xs font-mono text-emerald-700 block mt-0.5">Across 18 job portals</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Compensation Range</span>
          <span className="text-lg font-bold font-mono text-slate-900">{role.salaryRange}</span>
          <span className="text-2xs font-mono text-slate-500 block mt-0.5">{role.experienceLevel}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Target Proficiency</span>
          <span className="text-xs font-bold font-mono text-slate-900 block truncate">{role.avgProficiency}</span>
          <span className="text-2xs font-mono text-blue-700 block mt-0.5">Bloom Taxonomy Level 4-6</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Primary Industrial Hubs</span>
          <span className="text-xs font-mono text-slate-800 font-medium block truncate">
            {role.locations.join(', ')}
          </span>
          <span className="text-2xs font-mono text-slate-500 block mt-0.5">{role.industrySectors.join(' • ')}</span>
        </div>
      </div>

      {/* Role Description Card */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
          OCCUPATIONAL SUMMARY & SCOPE
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">{role.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-2xs font-mono uppercase text-slate-400 font-semibold self-center mr-1">
            Top Essential Skills:
          </span>
          {role.topSkills.map((sk) => (
            <span
              key={sk}
              className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-mono font-medium text-slate-800"
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Skill Demand Matrix (Core Deliverable) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              SKILL DEMAND & CURRICULUM ALIGNMENT MATRIX
            </h3>
            <p className="text-2xs text-slate-500">
              Live market requirement share vs. state polytechnic syllabus coverage and employer consensus
            </p>
          </div>
          <Badge variant="teal">{role.skillMatrix.length} COMPETENCIES EVALUATED</Badge>
        </div>

        <GapMatrix rows={role.skillMatrix} />
      </div>
    </div>
  );
};
