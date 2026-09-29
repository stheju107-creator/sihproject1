import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { labourMarketApi } from '../services/labourMarketApi';
import { DistrictDeficit } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import {
  ArrowLeft,
  Building,
  DollarSign,
} from 'lucide-react';
import { AllocateBudgetModal } from '../components/dashboard/AllocateBudgetModal';

export const DistrictDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [district, setDistrict] = useState<DistrictDeficit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  useEffect(() => {
    async function loadDistrict() {
      try {
        setLoading(true);
        const data = await labourMarketApi.getDistrictById(id || 'dist-cbe');
        if (data) {
          setDistrict(data);
        } else {
          setError('District record not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch district data');
      } finally {
        setLoading(false);
      }
    }
    loadDistrict();
  }, [id]);

  // Demo institutions inside this district
  const institutions = [
    { name: 'Government Polytechnic College (Central)', type: 'State Polytechnic', seats: 640, deficit: -240, status: 'Severe Shortage' },
    { name: 'CIT Vocational Training Institute', type: 'Govt-Aided', seats: 480, deficit: -180, status: 'Lab Upgrade Required' },
    { name: 'Women’s Industrial Training Institute (ITI)', type: 'State ITI', seats: 360, deficit: -120, status: 'Trainer Vacancy' },
    { name: 'PSG Polytechnic Institute (Autonomous)', type: 'Autonomous', seats: 720, deficit: -110, status: 'Aligned' },
    { name: 'Regional Technical Training Centre', type: 'Vocational Hub', seats: 400, deficit: -210, status: 'Severe Shortage' },
  ];

  if (loading) {
    return <LoadingSkeleton type="table" rows={6} />;
  }

  if (error || !district) {
    return (
      <ErrorState
        title="District Profile Not Found"
        message={error || 'Could not locate the requested district planning dossier.'}
        onRetry={() => navigate('/district-planning')}
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
            onClick={() => navigate('/district-planning')}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back to GIS Planner
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono">
                {district.name} District Dossier
              </h1>
              <Badge variant="rose">{district.severity}</Badge>
            </div>
            <p className="text-2xs font-mono text-slate-500 mt-0.5">
              Hub: {district.hub} • Cluster: {district.primaryCluster}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="teal"
            size="xs"
            onClick={() => setIsBudgetOpen(true)}
            icon={<DollarSign className="w-3.5 h-3.5" />}
          >
            Allocate District Budget ({district.budgetRequired})
          </Button>
        </div>
      </div>

      {/* 4 Quantitative Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Local Industry Demand</span>
          <span className="text-lg font-bold font-mono text-slate-900">{district.demandedSeats.toLocaleString()} seats</span>
          <span className="text-2xs font-mono text-teal-700 block mt-0.5">Across {district.primaryCluster}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Installed Capacity</span>
          <span className="text-lg font-bold font-mono text-slate-900">{district.totalSeats.toLocaleString()} seats</span>
          <span className="text-2xs font-mono text-blue-700 block mt-0.5">{district.polytechnicsCount} Poly + {district.itiCount} ITIs</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Capacity Deficit</span>
          <span className="text-lg font-bold font-mono text-rose-600">{district.capacityDeficit.toLocaleString()} seats</span>
          <ProgressBar value={Math.round((district.totalSeats / district.demandedSeats) * 100)} variant="rose" size="xs" className="mt-1" />
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card">
          <span className="text-2xs font-mono uppercase text-slate-400 block mb-1">Infrastructure Shortage</span>
          <span className="text-lg font-bold font-mono text-amber-700">{district.trainerDeficit} Trainers</span>
          <span className="text-2xs font-mono text-slate-500 block mt-0.5">{district.equipmentDeficit} Modernized Labs Needed</span>
        </div>
      </div>

      {/* Institutions Table */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-700" />
            Affiliated Technical Institutions in {district.name} ({institutions.length})
          </h3>
          <Badge variant="teal">DIRECTORATE OF TECHNICAL EDUCATION</Badge>
        </div>

        <div className="space-y-2">
          {institutions.map((inst, i) => (
            <div
              key={i}
              className="p-3 bg-slate-50/70 border border-slate-200 rounded flex flex-wrap items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-bold text-slate-900">{inst.name}</span>
                <span className="text-2xs font-mono text-slate-400 ml-2">({inst.type})</span>
              </div>
              <div className="flex items-center gap-4 text-2xs font-mono">
                <span className="text-slate-600">Capacity: <strong>{inst.seats} seats</strong></span>
                <span className="text-rose-600 font-bold">{inst.deficit} deficit</span>
                <Badge variant={inst.status === 'Severe Shortage' ? 'rose' : inst.status === 'Aligned' ? 'emerald' : 'amber'}>
                  {inst.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Allocate Budget Modal */}
      <AllocateBudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        districtName={district.name}
        requiredBudget={district.budgetRequired}
      />
    </div>
  );
};
