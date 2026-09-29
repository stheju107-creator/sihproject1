import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLabourData } from '../hooks/useLabourData';
import { DistrictRow } from '../components/tables/DistrictRow';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import {
  Download,
  Server,
} from 'lucide-react';
import { AllocateBudgetModal } from '../components/dashboard/AllocateBudgetModal';
import { ExportReportModal } from '../components/modals/ExportReportModal';
import { DistrictDeficit } from '../types';

export const DistrictPlanning: React.FC = () => {
  const navigate = useNavigate();
  const { districts, loading, error, refetch } = useLabourData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedDistrictModal, setSelectedDistrictModal] = useState('Coimbatore');
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const filteredDistricts = districts.filter((d) => {
    const matchSearch =
      !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.hub.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.primaryCluster.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSev = selectedSeverity === 'All' || d.severity === selectedSeverity;
    return matchSearch && matchSev;
  });

  const handleAction = (dist: DistrictDeficit) => {
    setSelectedDistrictModal(dist.name);
    setIsBudgetOpen(true);
  };

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
              DISTRICT-LEVEL SPATIAL PLANNING & GIS HEATMAP
            </h1>
            <Badge variant="teal">38 STATE HUBS INDEXED</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Geographic allocation model matching local industrial corridor hiring with polytechnic course capacity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsExportOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export GIS Master Plan
          </Button>
          <Button
            variant="teal"
            size="xs"
            onClick={() => navigate('/training-capacity')}
            icon={<Server className="w-3.5 h-3.5" />}
          >
            Capacity Deficit Matrix
          </Button>
        </div>
      </div>

      {/* Spatial Map Visual Canvas Simulation */}
      <div className="bg-slate-900 text-white rounded-md p-4 border border-slate-800 shadow-card">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-200">
              STATE INDUSTRIAL CORRIDOR SPATIAL SHORTAGE DENSITY
            </h3>
          </div>
          <div className="flex items-center gap-2 text-2xs font-mono text-slate-400">
            <span>Severe Shortage:</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>High Demand:</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Frontier:</span>
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />
          </div>
        </div>

        {/* Interactive Spatial Grid representing districts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {districts.map((d) => (
            <div
              key={d.id}
              onClick={() => navigate(`/district/${d.id}`)}
              className="bg-slate-800/80 border border-slate-700/80 rounded p-3 hover:border-teal-500 hover:bg-slate-800 transition-all cursor-pointer group text-xs flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-teal-400 transition-colors">
                  {d.name}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    d.severity === 'Critical Gap'
                      ? 'bg-rose-500'
                      : d.severity === 'High Demand'
                      ? 'bg-amber-500'
                      : 'bg-teal-400'
                  }`}
                />
              </div>

              <div className="text-2xs text-slate-300 font-sans line-clamp-1">
                {d.primaryCluster}
              </div>

              <div className="flex justify-between items-center text-2xs font-mono pt-1.5 border-t border-slate-700">
                <span className="text-rose-400 font-bold">{d.capacityDeficit} seats</span>
                <span className="text-slate-400">{d.polytechnicsCount} Polytechnics</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="All">All Severity Levels</option>
            <option value="Critical Gap">Critical Gap</option>
            <option value="High Demand">High Demand</option>
            <option value="Trainer Deficit">Trainer Deficit</option>
            <option value="Frontier Surge">Frontier Surge</option>
            <option value="Moderate">Moderate</option>
          </select>
        </div>

        <div className="w-full sm:w-64">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search districts, hubs, clusters..."
          />
        </div>
      </div>

      {/* Full District Rows List */}
      <div className="space-y-2.5">
        {filteredDistricts.map((d) => (
          <DistrictRow key={d.id} district={d} onAction={handleAction} />
        ))}
      </div>

      {/* Modals */}
      <AllocateBudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        districtName={selectedDistrictModal}
      />

      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportTitle="District-Level Spatial Technical Education Plan"
      />
    </div>
  );
};
