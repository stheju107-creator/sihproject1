import React, { useState } from 'react';
import { useLabourData } from '../hooks/useLabourData';
import { useSkills } from '../hooks/useSkills';
import { useCurriculum } from '../hooks/useCurriculum';
import { FeedbackLoop } from '../components/dashboard/FeedbackLoop';
import { KpiGrid } from '../components/dashboard/KpiGrid';
import { DemandOutputChart } from '../components/dashboard/DemandOutputChart';
import { UrgentActionCenter } from '../components/dashboard/UrgentActionCenter';
import { FastestSkills } from '../components/dashboard/FastestSkills';
import { DistrictHeatmap } from '../components/dashboard/DistrictHeatmap';
import { ExplainabilityDrawer } from '../components/modals/ExplainabilityDrawer';
import { ValidationNoteDrawer } from '../components/modals/ValidationNoteDrawer';
import { ModelProjectionsModal } from '../components/dashboard/ModelProjectionsModal';
import { AllocateBudgetModal } from '../components/dashboard/AllocateBudgetModal';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import { UrgentAction, CurriculumRecommendation } from '../types';
import { CURRICULUM_RECOMMENDATIONS } from '../data/demoData';

export const Dashboard: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const { feedbackLoop, kpis, timeSeries, urgentActions, districts, loading, error, refetch } = useLabourData(selectedSector);
  const { fastestSkills } = useSkills();
  const { updateStatus } = useCurriculum();

  // Modals & Drawers State
  const [selectedRecommendation, setSelectedRecommendation] = useState<CurriculumRecommendation | null>(null);
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [selectedValidationId, setSelectedValidationId] = useState('val-tcs-01');
  const [isProjectionsOpen, setIsProjectionsOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [selectedDistrictName, setSelectedDistrictName] = useState('Coimbatore');

  const handleUrgentAction = (action: UrgentAction) => {
    if (action.actionType === 'modal_advisor') {
      const rec = CURRICULUM_RECOMMENDATIONS.find((r) => r.id === action.metadata?.recommendationId) || CURRICULUM_RECOMMENDATIONS[0];
      setSelectedRecommendation(rec);
      setIsExplainOpen(true);
    } else if (action.actionType === 'modal_budget') {
      setSelectedDistrictName(action.metadata?.districtName || 'Coimbatore');
      setIsBudgetOpen(true);
    } else if (action.actionType === 'drawer_notes') {
      setSelectedValidationId(action.metadata?.requestId || 'val-tcs-01');
      setIsNotesOpen(true);
    }
  };

  const handleDistrictAction = (dist: any) => {
    setSelectedDistrictName(dist.name);
    setIsBudgetOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton type="kpi" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <LoadingSkeleton type="table" rows={6} className="lg:col-span-2" />
          <LoadingSkeleton type="card" rows={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-3.5 pb-6">
      {/* 1. Core Intelligence Feedback Loop */}
      <section aria-label="Core Intelligence Feedback Loop">
        <FeedbackLoop items={feedbackLoop} />
      </section>

      {/* 2. KPI Grid (7 compact cards) */}
      <section aria-label="Key Performance Indicators">
        <KpiGrid kpis={kpis} />
      </section>

      {/* 3. Middle Section: Demand vs Training Output + Urgent Action Center */}
      <section aria-label="Labour Demand and Urgent Actions" className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <div className="lg:col-span-8">
          <DemandOutputChart
            data={timeSeries}
            selectedSector={selectedSector}
            onSectorChange={setSelectedSector}
            onOpenModelProjections={() => setIsProjectionsOpen(true)}
            className="h-full"
          />
        </div>
        <div className="lg:col-span-4">
          <UrgentActionCenter
            actions={urgentActions}
            onActionClick={handleUrgentAction}
            className="h-full"
          />
        </div>
      </section>

      {/* 4. Bottom Section: Fastest Accelerating Skills + District Priority Heatmap */}
      <section aria-label="Accelerating Skills and District Heatmap" className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <div className="lg:col-span-6">
          <FastestSkills skills={fastestSkills} className="h-full" />
        </div>
        <div className="lg:col-span-6">
          <DistrictHeatmap
            districts={districts}
            onAction={handleDistrictAction}
            className="h-full"
          />
        </div>
      </section>

      {/* Modals & Drawers */}
      <ExplainabilityDrawer
        recommendation={selectedRecommendation}
        isOpen={isExplainOpen}
        onClose={() => setIsExplainOpen(false)}
        onApprove={(id) => updateStatus(id, 'APPROVED')}
        onReject={(id) => updateStatus(id, 'REJECTED')}
      />

      <ValidationNoteDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        requestId={selectedValidationId}
      />

      <ModelProjectionsModal
        isOpen={isProjectionsOpen}
        onClose={() => setIsProjectionsOpen(false)}
      />

      <AllocateBudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        districtName={selectedDistrictName}
      />
    </div>
  );
};
