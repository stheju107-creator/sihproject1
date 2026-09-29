import React from 'react';
import { Drawer } from './Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { CurriculumRecommendation } from '../../types';
import { Sparkles, CheckCircle2, ShieldCheck, AlertTriangle, Layers, BookOpen, Clock, Building } from 'lucide-react';

export interface ExplainabilityDrawerProps {
  recommendation: CurriculumRecommendation | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const ExplainabilityDrawer: React.FC<ExplainabilityDrawerProps> = ({
  recommendation,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!recommendation) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="WHY THIS RECOMMENDATION?"
      subtitle={`Explainable AI (XAI) Synthesis • ID: ${recommendation.id}`}
      badge={<Badge variant="teal" dot>XAI Engine v4.2</Badge>}
      width="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5 text-2xs text-slate-500 font-mono">
            <span>NSQF Alignment:</span>
            <span className="font-semibold text-slate-700">{recommendation.nsqfLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() => {
                if (onReject) onReject(recommendation.id);
                onClose();
              }}
            >
              Request Revision
            </Button>
            <Button
              variant="teal"
              size="xs"
              icon={<CheckCircle2 className="w-3.5 h-3.5" />}
              onClick={() => {
                if (onApprove) onApprove(recommendation.id);
                onClose();
              }}
            >
              Approve Curriculum Change
            </Button>
          </div>
        </div>
      }
    >
      {/* Title & Core Meta */}
      <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant={recommendation.changeType === 'ADD' ? 'emerald' : 'blue'}>
            {recommendation.changeType} MODULE
          </Badge>
          <span className="text-2xs font-mono text-slate-500 uppercase">{recommendation.domain}</span>
        </div>
        <h4 className="text-sm font-bold text-slate-900">{recommendation.title}</h4>
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/80 text-2xs font-mono text-slate-600">
          <div>
            <span className="text-slate-400 block text-2xs">Estimated Hours</span>
            <span className="font-semibold text-slate-800">{recommendation.estimatedHours} hrs ({recommendation.credits} Credits)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-2xs">Affected Colleges</span>
            <span className="font-semibold text-slate-800">{recommendation.affectedColleges} Institutions</span>
          </div>
          <div>
            <span className="text-slate-400 block text-2xs">AI Confidence</span>
            <span className="font-semibold text-emerald-700">{recommendation.confidence} (0.94 score)</span>
          </div>
        </div>
      </div>

      {/* 4-Pillar Algorithmic Metric Breakdown */}
      <div>
        <h5 className="text-2xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          4-Pillar Alignment Matrix
        </h5>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white border border-slate-200 rounded p-2.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xs text-slate-600 font-medium">Market Demand</span>
              <span className="text-xs font-mono font-bold text-teal-700">{recommendation.marketDemand}%</span>
            </div>
            <ProgressBar value={recommendation.marketDemand} variant="teal" size="xs" />
            <span className="text-2xs text-slate-400 block mt-1">4,120 active job postings</span>
          </div>

          <div className="bg-white border border-slate-200 rounded p-2.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xs text-slate-600 font-medium">Curriculum Coverage</span>
              <span className="text-xs font-mono font-bold text-rose-700">{recommendation.currentCoverage}%</span>
            </div>
            <ProgressBar value={recommendation.currentCoverage} variant="rose" size="xs" />
            <span className="text-2xs text-slate-400 block mt-1">82% syllabus deficit gap</span>
          </div>

          <div className="bg-white border border-slate-200 rounded p-2.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xs text-slate-600 font-medium">Severity / Skill Gap</span>
              <span className="text-xs font-mono font-bold text-amber-700">{recommendation.skillGap}%</span>
            </div>
            <ProgressBar value={recommendation.skillGap} variant="amber" size="xs" />
            <span className="text-2xs text-slate-400 block mt-1">Exit practical disconnect</span>
          </div>

          <div className="bg-white border border-slate-200 rounded p-2.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xs text-slate-600 font-medium">Employer Consensus</span>
              <span className="text-xs font-mono font-bold text-emerald-700">{recommendation.employerValidationPct}%</span>
            </div>
            <ProgressBar value={recommendation.employerValidationPct} variant="emerald" size="xs" />
            <span className="text-2xs text-slate-400 block mt-1">37 industry boards verified</span>
          </div>
        </div>
      </div>

      {/* Algorithmic Evidence & Rationale */}
      <div>
        <h5 className="text-2xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          Evidence Grounding & Rationale
        </h5>
        <div className="bg-teal-50/40 border border-teal-200/70 rounded p-3 mb-2 text-xs text-slate-800 leading-relaxed font-sans">
          {recommendation.evidenceText}
        </div>
        <ul className="space-y-1.5 pl-1">
          {recommendation.rationalePoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Week-by-Week Modular Syllabus */}
      <div>
        <h5 className="text-2xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-slate-700" />
          Proposed Laboratory Syllabus Units
        </h5>
        <div className="space-y-2">
          {recommendation.suggestedModules.map((mod, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded p-2.5 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                <span className="text-2xs font-mono px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">{mod.week}</span>
                <span className="text-xs text-slate-800">{mod.topic}</span>
              </div>
              <div className="text-2xs text-slate-600 pl-1 mt-1">
                <span className="font-semibold text-slate-700">Lab Exercise: </span>
                {mod.labExercises}
              </div>
              <div className="text-2xs text-teal-800 pl-1 mt-0.5 font-mono">
                <span className="font-semibold">Outcome: </span>
                {mod.learningOutcomes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Review Quorum Notes */}
      <div>
        <h5 className="text-2xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-emerald-600" />
          Industry Board Review Quorum ({recommendation.validationNotes.length} Reviews)
        </h5>
        <div className="space-y-2">
          {recommendation.validationNotes.map((note, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded p-2.5 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900">{note.board}</span>
                <Badge variant={note.decision === 'Endorsed' ? 'emerald' : 'amber'}>
                  {note.decision}
                </Badge>
              </div>
              <p className="text-2xs text-slate-600 italic">"{note.notes}"</p>
              <div className="flex justify-between items-center text-2xs font-mono text-slate-400 mt-1">
                <span>{note.reviewer}</span>
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
