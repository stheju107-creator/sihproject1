import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { curriculumApi } from '../services/curriculumApi';
import { CurriculumRecommendation } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Send,
} from 'lucide-react';

export const CurriculumDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [rec, setRec] = useState<CurriculumRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    async function loadRec() {
      try {
        setLoading(true);
        const data = await curriculumApi.getRecommendationById(id || 'rec-docker-01');
        if (data) {
          setRec(data);
          setIsApproved(data.status === 'APPROVED');
        } else {
          setError('Curriculum modification record not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to load recommendation');
      } finally {
        setLoading(false);
      }
    }
    loadRec();
  }, [id]);

  const handleApprove = async () => {
    if (!rec) return;
    await curriculumApi.updateRecommendationStatus(rec.id, 'APPROVED');
    setIsApproved(true);
  };

  if (loading) {
    return <LoadingSkeleton type="table" rows={6} />;
  }

  if (error || !rec) {
    return (
      <ErrorState
        title="Curriculum Blueprint Not Found"
        message={error || 'Could not find the requested syllabus proposal.'}
        onRetry={() => navigate('/curriculum-advisor')}
      />
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="xs"
            onClick={() => navigate('/curriculum-advisor')}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to Advisor
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono">
                {rec.title}
              </h1>
              <Badge variant={rec.changeType === 'ADD' ? 'emerald' : 'blue'}>
                {rec.changeType}
              </Badge>
              <Badge variant={isApproved ? 'emerald' : 'amber'}>
                {isApproved ? 'Approved by Board' : 'Pending Quorum'}
              </Badge>
            </div>
            <p className="text-2xs font-mono text-slate-500 mt-0.5">
              ID: {rec.id} • Domain: {rec.domain} • NSQF Level: {rec.nsqfLevel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isApproved && (
            <Button
              variant="teal"
              size="xs"
              onClick={handleApprove}
              icon={<CheckCircle2 className="w-3.5 h-3.5" />}
            >
              Approve Curriculum Amendment
            </Button>
          )}
          <Button
            variant="outline"
            size="xs"
            onClick={() => navigate('/employer-validation')}
            icon={<Send className="w-3.5 h-3.5" />}
          >
            Quorum Votes
          </Button>
        </div>
      </div>

      {/* 4 Quantitative Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Live Market Demand</span>
          <span className="text-lg font-bold font-mono text-teal-700">{rec.marketDemand}%</span>
          <ProgressBar value={rec.marketDemand} variant="teal" size="xs" className="mt-1" />
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Current Syllabus Coverage</span>
          <span className="text-lg font-bold font-mono text-rose-700">{rec.currentCoverage}%</span>
          <ProgressBar value={rec.currentCoverage} variant="rose" size="xs" className="mt-1" />
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Curriculum Omission Gap</span>
          <span className="text-lg font-bold font-mono text-amber-700">+{rec.skillGap}%</span>
          <span className="text-2xs font-mono text-slate-400 block mt-1">High disparity</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Employer Validation Quorum</span>
          <span className="text-lg font-bold font-mono text-emerald-700">{rec.employerValidationPct}%</span>
          <span className="text-2xs font-mono text-slate-500 block mt-1">37 Partner Corporations</span>
        </div>
      </div>

      {/* Evidence and Rationale Panel */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          Explainable AI (XAI) Synthesis & Evidence Grounding
        </h3>
        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed font-sans">
          {rec.evidenceText}
        </p>

        <div className="space-y-1.5 pt-2">
          {rec.rationalePoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Laboratory Syllabus Breakdown */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-slate-700" />
          Proposed Modular Laboratory Syllabus ({rec.suggestedModules.length} Units)
        </h3>

        <div className="space-y-2.5">
          {rec.suggestedModules.map((mod, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="text-2xs font-mono px-2 py-0.5 bg-slate-200 rounded text-slate-800">
                  {mod.week}
                </span>
                <span className="text-xs">{mod.topic}</span>
              </div>
              <p className="text-2xs text-slate-600 pl-1 pt-1 font-sans">
                <strong className="text-slate-800">Hands-on Lab Exercise: </strong>
                {mod.labExercises}
              </p>
              <p className="text-2xs text-teal-800 pl-1 font-mono">
                <strong>Learning Outcome: </strong>
                {mod.learningOutcomes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
