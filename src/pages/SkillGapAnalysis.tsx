import React, { useState, useMemo } from 'react';
import { useSkills } from '../hooks/useSkills';
import { useLabourData } from '../hooks/useLabourData';
import { RadarChart } from '../components/charts/RadarChart';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { ErrorState } from '../components/ui/ErrorState';
import {
  Download,
  Sparkles,
} from 'lucide-react';
import { ExportReportModal } from '../components/modals/ExportReportModal';

export const SkillGapAnalysis: React.FC = () => {
  const { roles } = useLabourData();
  const { skillGaps, loading, error, refetch } = useSkills();

  const [selectedRole, setSelectedRole] = useState('role-backend-dev');
  const [selectedInstitute, setSelectedInstitute] = useState('All State Polytechnics');
  const [selectedCourse, setSelectedCourse] = useState('Diploma in Computer Engg (DCE)');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const filteredGaps = useMemo(() => {
    return skillGaps.filter(
      (item) => selectedRole === 'All' || item.roleId === selectedRole
    );
  }, [skillGaps, selectedRole]);

  // Transform gap items into radar chart format
  const radarData = useMemo(() => {
    return filteredGaps.slice(0, 6).map((g) => ({
      subject: g.skillName.split(' ')[0],
      industry: g.industryPct,
      curriculum: g.curriculumPct,
      trainee: g.traineePct,
    }));
  }, [filteredGaps]);

  if (loading) {
    return <LoadingSkeleton type="table" rows={6} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              3-LAYER SKILL GAP ANALYSIS
            </h1>
            <Badge variant="rose">TRI-AXIAL BENCHMARK</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Algorithmic comparison benchmarking Live Industry Demand vs State Curricula vs Trainee Exit Competence
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsExportOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Gap Matrix
          </Button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            1. Target Occupational Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs text-slate-900 font-medium"
          >
            <option value="All">All Occupational Roles (Aggregated)</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.category})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            2. Vocational Institution Type
          </label>
          <select
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs text-slate-900 font-medium"
          >
            <option value="All State Polytechnics">All State Polytechnics (DoTE Affiliated)</option>
            <option value="Industrial Training Institutes">Industrial Training Institutes (ITI - DGT)</option>
            <option value="Autonomous Engineering">Autonomous Polytechnic & Tech Colleges</option>
          </select>
        </div>

        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            3. Registered Syllabus Scheme
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs text-slate-900 font-medium"
          >
            <option value="Diploma in Computer Engg (DCE)">Diploma in Computer Engineering (DCE-2023 Rev)</option>
            <option value="Diploma in AI & ML">Diploma in AI & Machine Learning (DAI-401)</option>
            <option value="Diploma in Information Tech">Diploma in Information Technology (DIT)</option>
            <option value="Diploma in Electrical & Electronics">Diploma in Electrical & Electronics (DEEE)</option>
          </select>
        </div>
      </div>

      {/* 3-Layer Visual Concept Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        <div className="bg-teal-50/50 border border-teal-200 rounded p-3 text-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-teal-600 text-white flex items-center justify-center font-bold shrink-0 font-mono">
            L1
          </div>
          <div>
            <div className="font-bold text-teal-950">Layer 1: Industry Demand %</div>
            <div className="text-2xs text-teal-800">Frequency across 12,480 parsed job openings</div>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-200 rounded p-3 text-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 font-mono">
            L2
          </div>
          <div>
            <div className="font-bold text-blue-950">Layer 2: Syllabus Coverage %</div>
            <div className="text-2xs text-blue-800">NSQF curricular topic & lab credit weights</div>
          </div>
        </div>

        <div className="bg-amber-50/50 border border-amber-200 rounded p-3 text-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-amber-600 text-white flex items-center justify-center font-bold shrink-0 font-mono">
            L3
          </div>
          <div>
            <div className="font-bold text-amber-950">Layer 3: Trainee Competence %</div>
            <div className="text-2xs text-amber-800">Exit practical exam & project passing score</div>
          </div>
        </div>
      </div>

      {/* Main 3-Layer Comparison Matrix + Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Table of 3-Layer Gap Rows */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-md p-3.5 shadow-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              TRI-AXIAL DIVERGENCE SCORECARD
            </h3>
            <Badge variant="rose">AVERAGE 41.2% GAP</Badge>
          </div>

          <div className="space-y-2.5">
            {filteredGaps.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200 rounded p-3 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-xs">{item.skillName}</span>
                    <span className="text-2xs font-mono text-slate-400 ml-2">({item.roleName})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.severity === 'Critical' ? 'rose' : item.severity === 'Severe' ? 'amber' : 'blue'}>
                      {item.severity} Gap
                    </Badge>
                    <span className="text-xs font-mono font-bold text-rose-600">
                      {item.gapPct}% Divergence
                    </span>
                  </div>
                </div>

                {/* 3 Progress Bars */}
                <div className="grid grid-cols-3 gap-3 text-2xs font-mono pt-1">
                  <div>
                    <div className="flex justify-between text-slate-500 mb-0.5">
                      <span>Industry Demand</span>
                      <span className="font-bold text-teal-700">{item.industryPct}%</span>
                    </div>
                    <ProgressBar value={item.industryPct} variant="teal" size="xs" />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-500 mb-0.5">
                      <span>State Syllabus</span>
                      <span className="font-bold text-blue-700">{item.curriculumPct}%</span>
                    </div>
                    <ProgressBar value={item.curriculumPct} variant="blue" size="xs" />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-500 mb-0.5">
                      <span>Trainee Exit Practical</span>
                      <span className="font-bold text-amber-700">{item.traineePct}%</span>
                    </div>
                    <ProgressBar value={item.traineePct} variant="amber" size="xs" />
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="text-2xs text-slate-600 bg-white p-2 rounded border border-slate-200 flex items-start gap-1.5 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 font-semibold">Recommended Intervention: </strong>
                    {item.recommendedAction} ({item.collegesAffected} colleges affected)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Visualization */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-md p-3.5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                RADAR GAP OVERLAY
              </h3>
              <Badge variant="teal">3-AXIS</Badge>
            </div>
            <p className="text-2xs text-slate-500 mt-1">
              Visual polygon footprint comparison across key competencies
            </p>

            <div className="pt-2">
              <RadarChart data={radarData} height={290} />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Button
              variant="teal"
              size="xs"
              onClick={() => setIsExportOpen(true)}
              className="w-full justify-center"
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Export Complete Gap Audit
            </Button>
          </div>
        </div>
      </div>

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportTitle="3-Layer Tri-Axial Skill Gap Analysis Dossier"
      />
    </div>
  );
};
