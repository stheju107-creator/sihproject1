import React from 'react';
import { clsx } from 'clsx';
import { CurriculumRecommendation } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Sparkles, CheckCircle2, Send, Eye, FileText } from 'lucide-react';

export interface RecommendationCardProps {
  recommendation: CurriculumRecommendation;
  onReview: (rec: CurriculumRecommendation) => void;
  onApprove: (id: string) => void;
  onSendValidation: (rec: CurriculumRecommendation) => void;
  className?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onReview,
  onApprove,
  onSendValidation,
  className,
}) => {
  const typeStyles = {
    ADD: 'border-l-4 border-l-emerald-500',
    UPDATE: 'border-l-4 border-l-blue-500',
    EXPAND: 'border-l-4 border-l-amber-500',
    RESTRUCTURE: 'border-l-4 border-l-purple-500',
  };

  const statusBadges = {
    PENDING: { variant: 'amber' as const, label: 'Pending Approval' },
    APPROVED: { variant: 'emerald' as const, label: 'Board Approved' },
    IN_REVIEW: { variant: 'blue' as const, label: 'In Quorum Review' },
    REJECTED: { variant: 'rose' as const, label: 'Revision Required' },
  };

  return (
    <div
      className={clsx(
        'bg-white border border-slate-200 rounded-md p-3.5 shadow-card hover:border-slate-300 transition-all flex flex-col justify-between space-y-3',
        typeStyles[recommendation.changeType],
        className
      )}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className={clsx(
                'px-1.5 py-0.5 rounded text-2xs font-mono font-bold',
                recommendation.changeType === 'ADD'
                  ? 'bg-emerald-100 text-emerald-800'
                  : recommendation.changeType === 'UPDATE'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              )}
            >
              {recommendation.changeType}
            </span>
            <span className="text-2xs font-mono text-slate-500 uppercase">{recommendation.domain}</span>
          </div>
          <Badge variant={statusBadges[recommendation.status].variant}>
            {statusBadges[recommendation.status].label}
          </Badge>
        </div>

        {/* Title */}
        <h4 className="text-xs font-bold text-slate-900 leading-snug">
          {recommendation.title}
        </h4>

        {/* Evidence */}
        <p className="text-2xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mt-2 line-clamp-2">
          {recommendation.evidenceText}
        </p>

        {/* 3-Bar Comparative Snapshot */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-100 text-2xs font-mono">
          <div>
            <div className="flex justify-between text-slate-500 mb-0.5">
              <span>Market Demand</span>
              <span className="font-bold text-slate-800">{recommendation.marketDemand}%</span>
            </div>
            <ProgressBar value={recommendation.marketDemand} variant="teal" size="xs" />
          </div>
          <div>
            <div className="flex justify-between text-slate-500 mb-0.5">
              <span>Current Syllabus</span>
              <span className="font-bold text-rose-700">{recommendation.currentCoverage}%</span>
            </div>
            <ProgressBar value={recommendation.currentCoverage} variant="rose" size="xs" />
          </div>
          <div>
            <div className="flex justify-between text-slate-500 mb-0.5">
              <span>Employer Quorum</span>
              <span className="font-bold text-emerald-700">{recommendation.employerValidationPct}%</span>
            </div>
            <ProgressBar value={recommendation.employerValidationPct} variant="emerald" size="xs" />
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1 text-2xs font-mono text-slate-500">
          <span>Confidence:</span>
          <span className="font-bold text-emerald-700">{recommendation.confidence}</span>
          <span className="text-slate-300">•</span>
          <span>{recommendation.affectedColleges} Colleges</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="xs"
            onClick={() => onReview(recommendation)}
            icon={<Eye className="w-3 h-3" />}
          >
            Review
          </Button>

          {recommendation.status !== 'APPROVED' && (
            <Button
              variant="teal"
              size="xs"
              onClick={() => onApprove(recommendation.id)}
              icon={<CheckCircle2 className="w-3 h-3" />}
            >
              Approve
            </Button>
          )}

          <Button
            variant="outline"
            size="xs"
            onClick={() => onSendValidation(recommendation)}
            icon={<Send className="w-3 h-3" />}
          >
            Send Quorum
          </Button>
        </div>
      </div>
    </div>
  );
};
