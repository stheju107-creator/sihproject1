import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurriculum } from '../hooks/useCurriculum';
import { RecommendationCard } from '../components/cards/RecommendationCard';
import { MetricCard } from '../components/cards/MetricCard';
import { ExplainabilityDrawer } from '../components/modals/ExplainabilityDrawer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Layers,
  FileCheck,
} from 'lucide-react';
import { CurriculumRecommendation } from '../types';

export const CurriculumAdvisor: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { recommendations, loading, error, refetch, updateStatus } = useCurriculum({
    status: selectedStatus,
    domain: selectedDomain,
    search: searchQuery,
  });

  const [selectedRec, setSelectedRec] = useState<CurriculumRecommendation | null>(null);
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const handleReview = (rec: CurriculumRecommendation) => {
    setSelectedRec(rec);
    setIsExplainOpen(true);
  };

  const handleApprove = async (id: string) => {
    await updateStatus(id, 'APPROVED');
    setBannerMessage(`Recommendation #${id} successfully marked as Board Approved.`);
    setTimeout(() => setBannerMessage(null), 3000);
  };

  const handleSendValidation = (rec: CurriculumRecommendation) => {
    navigate('/employer-validation');
  };

  if (loading) {
    return <LoadingSkeleton type="card" rows={6} />;
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
              AI CURRICULUM ADVISOR & SYLLABUS ENGINE
            </h1>
            <Badge variant="teal">EXPLAINABLE AI (XAI)</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Automated syllabus modernization proposals generated from real-time labour gap telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="teal"
            size="xs"
            onClick={() => navigate('/employer-validation')}
            icon={<UserCheck className="w-3.5 h-3.5" />}
          >
            Open Quorum Validations (37 Boards)
          </Button>
        </div>
      </div>

      {/* Temporary Success Toast Banner */}
      {bannerMessage && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 font-medium flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{bannerMessage}</span>
          </div>
          <button onClick={() => setBannerMessage(null)} className="text-emerald-700 hover:text-emerald-900 text-2xs font-mono">
            Dismiss
          </button>
        </div>
      )}

      {/* Curriculum Health Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        <MetricCard
          title="Curriculum Health"
          value="92.4%"
          subvalue="+4.1% Aligned"
          badge={{ text: 'State Index', variant: 'teal' }}
          icon={<FileCheck className="w-4 h-4 text-teal-600" />}
          description="Percentage of polytechnic courses meeting NSQF 2026 standards."
        />
        <MetricCard
          title="Courses Analyzed"
          value="84"
          subvalue="32 Polytechnics"
          badge={{ text: 'NSQF 4-7', variant: 'slate' }}
          icon={<BookOpen className="w-4 h-4 text-slate-600" />}
          description="Total diploma & vocational schemes continuously audited."
        />
        <MetricCard
          title="Needing Updates"
          value="8 Schemes"
          subvalue="28 Module Recs"
          badge={{ text: 'Action Required', variant: 'amber' }}
          icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}
          description="Courses with >35% divergence from industry requirements."
        />
        <MetricCard
          title="Critical Gaps"
          value="42 Roles"
          subvalue="28 Severe"
          badge={{ text: 'Top Priority', variant: 'rose' }}
          icon={<Layers className="w-4 h-4 text-rose-600" />}
          description="Missing competencies creating immediate employment bottlenecks."
        />
        <MetricCard
          title="Employer Consensus"
          value="89.4%"
          subvalue="37 Industry Boards"
          badge={{ text: 'Quorum Passed', variant: 'emerald' }}
          icon={<UserCheck className="w-4 h-4 text-emerald-600" />}
          description="Quorum voting score achieved across partnered tech employers."
        />
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="PENDING">Pending Review</option>
            <option value="APPROVED">Board Approved</option>
            <option value="IN_REVIEW">In Quorum Review</option>
          </select>

          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="All">All Curriculum Domains</option>
            <option value="Cloud & Systems Engineering">Cloud & Systems</option>
            <option value="Artificial Intelligence & Data">AI & Data Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Automotive & Electrical">Automotive & EV</option>
          </select>
        </div>

        <div className="w-full sm:w-64">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search recommendations..."
          />
        </div>
      </div>

      {/* Recommendation Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {recommendations.map((rec) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            onReview={handleReview}
            onApprove={handleApprove}
            onSendValidation={handleSendValidation}
          />
        ))}
      </div>

      {/* Explainability Drawer */}
      <ExplainabilityDrawer
        recommendation={selectedRec}
        isOpen={isExplainOpen}
        onClose={() => setIsExplainOpen(false)}
        onApprove={handleApprove}
        onReject={async (id) => {
          await updateStatus(id, 'REJECTED');
          setBannerMessage(`Recommendation #${id} marked for syllabus committee revision.`);
        }}
      />
    </div>
  );
};
