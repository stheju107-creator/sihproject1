import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLabourData } from '../hooks/useLabourData';
import { MetricCard } from '../components/cards/MetricCard';
import { BarChart } from '../components/charts/BarChart';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { ErrorState } from '../components/ui/ErrorState';
import {
  Server,
  Users,
  Building,
  AlertTriangle,
  Download,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { AllocateBudgetModal } from '../components/dashboard/AllocateBudgetModal';
import { ExportReportModal } from '../components/modals/ExportReportModal';

export const TrainingCapacity: React.FC = () => {
  const navigate = useNavigate();
  const { districts, loading, error, refetch } = useLabourData();

  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('Coimbatore');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Chart data: Seat Demand vs Installed Seats per district
  const districtSeatData = districts.map((d) => ({
    name: d.name.split(' ')[0],
    demanded: d.demandedSeats,
    installed: d.totalSeats,
    deficit: Math.abs(d.capacityDeficit),
  }));

  // Trainer Deficit by Domain
  const trainerData = [
    { name: 'Cloud & DevOps', required: 84, available: 42, deficit: 42 },
    { name: 'GenAI & Python', required: 68, available: 32, deficit: 36 },
    { name: 'EV & CAN Bus', required: 52, available: 24, deficit: 28 },
    { name: 'Cybersecurity SOC', required: 44, available: 21, deficit: 23 },
    { name: 'Robotics ROS', required: 36, available: 17, deficit: 19 },
  ];

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
              STATE VOCATIONAL TRAINING CAPACITY & DEFICITS
            </h1>
            <Badge variant="rose">SUPPLY BOTTLENECKS</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Institutional infrastructure mapping across 38 regional districts and 140+ polytechnics/ITIs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsExportOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Capacity Sheet
          </Button>
          <Button
            variant="teal"
            size="xs"
            onClick={() => {
              setSelectedDistrict('Coimbatore');
              setIsBudgetOpen(true);
            }}
            icon={<Server className="w-3.5 h-3.5" />}
          >
            Allocate Emergency Grant
          </Button>
        </div>
      </div>

      {/* 5 Core Capacity KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        <MetricCard
          title="Industry Demand"
          value="12,480"
          subvalue="Trainees / Month"
          badge={{ text: 'Required', variant: 'teal' }}
          icon={<Users className="w-4 h-4 text-teal-600" />}
          description="Total monthly certified graduates required by active state hiring demand."
        />
        <MetricCard
          title="Installed Capacity"
          value="8,210"
          subvalue="Trainees / Month"
          badge={{ text: 'State Total', variant: 'blue' }}
          icon={<Building className="w-4 h-4 text-blue-600" />}
          description="Combined seats across state polytechnics, ITIs, and vocational centres."
        />
        <MetricCard
          title="Net Seat Deficit"
          value="-4,270"
          subvalue="34.2% Shortage"
          badge={{ text: 'Deficit Gap', variant: 'rose' }}
          icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}
          description="Immediate shortage of vocational seats across technical disciplines."
        />
        <MetricCard
          title="Trainer Shortage"
          value="-139"
          subvalue="Specialist Trainers"
          badge={{ text: 'Recruitment Req', variant: 'amber' }}
          icon={<Users className="w-4 h-4 text-amber-600" />}
          description="Instructor vacancies in emerging domains (Cloud, GenAI, EV, SOC)."
        />
        <MetricCard
          title="Lab Kits Deficit"
          value="-79 Labs"
          subvalue="Modernized Workstations"
          badge={{ text: '₹14.8 Cr CapEx', variant: 'rose' }}
          icon={<Server className="w-4 h-4 text-rose-600" />}
          description="Physical hardware and cloud sandbox deficit requiring state capital grant."
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* District Seat Comparison */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-md p-3.5 shadow-card">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                REGIONAL SEAT DEMAND VS INSTALLED CAPACITY
              </h3>
              <p className="text-2xs text-slate-500">Monthly graduates needed vs institution seats</p>
            </div>
            <Badge variant="rose">DEFICIT SPREAD</Badge>
          </div>
          <BarChart
            data={districtSeatData}
            xKey="name"
            height={230}
            valueFormatter={(v) => v.toLocaleString()}
            series={[
              { key: 'demanded', label: 'Demanded Seats', color: '#0f172a' },
              { key: 'installed', label: 'Installed Seats', color: '#0d9488' },
            ]}
          />
        </div>

        {/* Trainer Deficit by Tech Domain */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-md p-3.5 shadow-card">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                TRAINER DEFICIT BY DOMAIN
              </h3>
              <p className="text-2xs text-slate-500">Instructor vacancies in emerging tech</p>
            </div>
            <Badge variant="amber">-139 TOTAL</Badge>
          </div>
          <div className="space-y-2.5 pt-1">
            {trainerData.map((item) => (
              <div key={item.name} className="text-xs space-y-1">
                <div className="flex justify-between font-semibold text-slate-900 text-2xs font-mono">
                  <span>{item.name}</span>
                  <span className="text-rose-600 font-bold">-{item.deficit} Trainers</span>
                </div>
                <ProgressBar
                  value={Math.round((item.available / item.required) * 100)}
                  variant="rose"
                  size="xs"
                />
                <div className="flex justify-between text-2xs font-mono text-slate-400">
                  <span>Available: {item.available}</span>
                  <span>Required: {item.required}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District Deficit Table with Direct Action Buttons */}
      <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              REGIONAL TECHNICAL CLUSTERS & EMERGENCY CAPITAL REQUIREMENTS
            </h3>
            <p className="text-2xs text-slate-500">Priority ranking calculated via Monte Carlo capacity shortfall model</p>
          </div>
          <Button
            variant="secondary"
            size="xs"
            onClick={() => navigate('/district-planning')}
            icon={<MapPin className="w-3 h-3" />}
          >
            Spatial GIS Planner View →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {districts.map((d) => (
            <div
              key={d.id}
              onClick={() => navigate(`/district/${d.id}`)}
              className="bg-slate-50/70 border border-slate-200 rounded p-3 hover:border-slate-300 hover:bg-slate-100/50 transition-all cursor-pointer flex flex-col justify-between space-y-2 text-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs">{d.name}</span>
                  <Badge variant={d.severity === 'Critical Gap' ? 'rose' : 'amber'}>
                    {d.severity}
                  </Badge>
                </div>
                <p className="text-2xs font-mono text-slate-500">{d.hub}</p>
                <div className="mt-1 text-2xs text-slate-700 font-medium bg-white p-1.5 rounded border border-slate-200">
                  Primary Deficit: <strong className="text-slate-900">{d.primaryCluster}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-2xs font-mono">
                <div>
                  <span className="text-slate-400 block">Seat Shortage</span>
                  <span className="font-bold text-rose-600">{d.capacityDeficit} seats</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Budget Required</span>
                  <span className="font-bold text-slate-900">{d.budgetRequired}</span>
                </div>
              </div>

              <div className="pt-1 flex justify-end" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="teal"
                  size="xs"
                  onClick={() => {
                    setSelectedDistrict(d.name);
                    setIsBudgetOpen(true);
                  }}
                  icon={<ArrowRight className="w-3 h-3" />}
                  iconPosition="right"
                >
                  Allocate Grant
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Allocate Budget Modal */}
      <AllocateBudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        districtName={selectedDistrict}
      />

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportTitle="State Vocational Infrastructure & Capacity Deficit Map 2026"
      />
    </div>
  );
};
