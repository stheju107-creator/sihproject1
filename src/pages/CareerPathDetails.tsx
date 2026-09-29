import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { careerApi } from '../services/careerApi';
import { CareerPathway } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import {
  ArrowLeft,
  Compass,
  CheckCircle2,
  Clock,
  Circle,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
} from 'lucide-react';

export const CareerPathDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pathway, setPathway] = useState<CareerPathway | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<number>(3); // default highlight core skills

  useEffect(() => {
    async function loadPathway() {
      try {
        setLoading(true);
        const data = await careerApi.getCareerPathwayById(id || 'path-backend-dev');
        if (data) {
          setPathway(data);
        } else {
          setError('Career pathway roadmap not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch pathway details');
      } finally {
        setLoading(false);
      }
    }
    loadPathway();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton type="table" rows={6} />;
  }

  if (error || !pathway) {
    return (
      <ErrorState
        title="Pathway Not Found"
        message={error || 'Could not locate the requested career pathway.'}
        onRetry={() => navigate('/career-guidance')}
      />
    );
  }

  const activeStep = pathway.steps.find((s) => s.stageNumber === selectedStage) || pathway.steps[0];

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="xs"
            onClick={() => navigate('/career-guidance')}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Guidance
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono">
                {pathway.title}
              </h1>
              <Badge variant="teal">{pathway.domain}</Badge>
              <Badge variant="emerald">{pathway.matchPct}% Competency Match</Badge>
            </div>
            <p className="text-2xs font-mono text-slate-500 mt-0.5">
              Roadmap ID: {pathway.id} • Target Level: {pathway.nsqfTarget} • {pathway.avgSalary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="xs"
            onClick={() => navigate('/curriculum-advisor')}
            icon={<BookOpen className="w-3.5 h-3.5" />}
          >
            Bridge Curriculum Syllabi
          </Button>
        </div>
      </div>

      {/* Visual 7-Step Progression Stepper Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            7-STAGE DYNAMIC PROGRESSION ROADMAP
          </h3>
          <span className="text-2xs font-mono text-slate-400">Click any stage to view modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {pathway.steps.map((step) => {
            const isSelected = step.stageNumber === selectedStage;
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';

            return (
              <div
                key={step.stageNumber}
                onClick={() => setSelectedStage(step.stageNumber)}
                className={`p-2.5 rounded border transition-all cursor-pointer text-xs flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-500 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-mono font-bold text-slate-500">
                    STAGE 0{step.stageNumber}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isInProgress ? (
                    <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </div>

                <div className="font-bold text-slate-900 text-xs truncate">
                  {step.stageName}
                </div>

                <div className="text-2xs font-mono text-slate-500 truncate">
                  {step.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-2xs font-mono uppercase text-slate-400 font-bold">
                STAGE 0{activeStep.stageNumber} • {activeStep.stageName} ({activeStep.duration})
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">{activeStep.title}</h3>
            </div>
            <Badge
              variant={
                activeStep.status === 'completed'
                  ? 'emerald'
                  : activeStep.status === 'in_progress'
                  ? 'blue'
                  : 'slate'
              }
            >
              {activeStep.status.toUpperCase()}
            </Badge>
          </div>

          <p className="text-xs text-slate-700 font-sans leading-relaxed">
            {activeStep.description}
          </p>

          <div>
            <span className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1.5">
              Skills Acquired in this Stage:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeStep.skillsAcquired.map((sk) => (
                <span
                  key={sk}
                  className="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-900 rounded text-xs font-mono font-medium"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1.5">
              Hands-on Laboratory Capstone Projects:
            </span>
            <div className="space-y-1.5">
              {activeStep.labProjects.map((p, idx) => (
                <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Target Roles Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-md p-4 shadow-card flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              Stage Certification & Credentials
            </h3>
            <div className="space-y-2 mt-2">
              {activeStep.certifications.map((c, idx) => (
                <div key={idx} className="p-2.5 bg-emerald-50/50 border border-emerald-200 rounded text-xs text-emerald-950 font-medium">
                  {c}
                </div>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono pt-3 pb-2 border-b border-slate-100 mt-4 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              Target Occupational Roles
            </h3>
            <div className="space-y-1.5 mt-2">
              {pathway.targetRoles.map((r) => (
                <div key={r} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 font-mono">
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Button
              variant="teal"
              size="xs"
              className="w-full justify-center"
              onClick={() => {
                if (selectedStage < 7) setSelectedStage(selectedStage + 1);
              }}
              disabled={selectedStage === 7}
              icon={<ChevronRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Next Roadmap Stage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
