import React, { useState, useMemo } from 'react';
import { useLabourData } from '../hooks/useLabourData';
import { MetricCard } from '../components/cards/MetricCard';
import { LineChart } from '../components/charts/LineChart';
import { BarChart } from '../components/charts/BarChart';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import {
  Briefcase,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Download,
  Filter,
} from 'lucide-react';
import { ExportReportModal } from '../components/modals/ExportReportModal';

export const LabourIntelligence: React.FC = () => {
  const { roles, loading, error, refetch } = useLabourData();

  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 6 Months');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Time-series trend data
  const demandTrendData = [
    { month: 'Oct 2025', software: 4200, cloud: 2800, ai: 1100, hardware: 1900 },
    { month: 'Nov 2025', software: 4500, cloud: 3100, ai: 1350, hardware: 2050 },
    { month: 'Dec 2025', software: 4650, cloud: 3300, ai: 1520, hardware: 2150 },
    { month: 'Jan 2026', software: 4900, cloud: 3500, ai: 1680, hardware: 2280 },
    { month: 'Feb 2026', software: 5100, cloud: 3750, ai: 1810, hardware: 2340 },
    { month: 'Mar 2026', software: 5350, cloud: 3950, ai: 1980, hardware: 2420 },
  ];

  // Top Roles Data
  const topRolesData = [
    { name: 'Backend Dev', postings: 4120 },
    { name: 'Full Stack Dev', postings: 3860 },
    { name: 'Cloud & DevOps', postings: 3240 },
    { name: 'Data Engineer', postings: 2150 },
    { name: 'GenAI Specialist', postings: 1890 },
    { name: 'Cyber SOC', postings: 1750 },
    { name: 'EV Powertrain', postings: 1420 },
  ];

  // Top Skills Data
  const topSkillsData = [
    { name: 'Python', demand: 98 },
    { name: 'Git & GitHub', demand: 92 },
    { name: 'REST API Specs', demand: 85 },
    { name: 'Node.js', demand: 82 },
    { name: 'Docker / Containers', demand: 65 },
    { name: 'PyTorch Deep Learning', demand: 58 },
    { name: 'Kubernetes', demand: 54 },
  ];

  // Location Distribution
  const locationData = [
    { name: 'Chennai Metro', share: 36 },
    { name: 'Bengaluru Urban', share: 28 },
    { name: 'Coimbatore Hub', share: 18 },
    { name: 'Hyderabad Cyber', share: 11 },
    { name: 'Pune Cluster', share: 7 },
  ];

  if (loading) {
    return <LoadingSkeleton type="card" rows={6} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              LABOUR MARKET INTELLIGENCE
            </h1>
            <Badge variant="teal">LIVE DATA INGESTION</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Real-time crawler telemetry indexing 12,480 job postings across 18 public and enterprise portals
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsExportOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export LMI Dossier
          </Button>
        </div>
      </div>

      {/* 4 Core KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <MetricCard
          title="Jobs Analyzed"
          value="12,480"
          subvalue="+18.4% MoM"
          badge={{ text: '18 Sources', variant: 'teal' }}
          icon={<Briefcase className="w-4 h-4 text-teal-600" />}
          description="Total active requisitions validated via deduplication NLP pipeline."
        />
        <MetricCard
          title="Active Occupational Roles"
          value="148"
          subvalue="+12 Newly Mapped"
          badge={{ text: 'NSQF Aligned', variant: 'blue' }}
          icon={<Layers className="w-4 h-4 text-blue-600" />}
          description="Normalized standardized job titles with mapped competency frameworks."
        />
        <MetricCard
          title="Demand Growth"
          value="+24.2%"
          subvalue="Tech & EV Leading"
          badge={{ text: 'MoM Velocity', variant: 'emerald' }}
          icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
          description="Fastest expansion recorded in Cloud, Generative AI, and EV Powertrains."
        />
        <MetricCard
          title="Emerging Skills Detected"
          value="94"
          subvalue="632 Total Taxonomy"
          badge={{ text: 'GenAI Surging', variant: 'rose' }}
          icon={<Cpu className="w-4 h-4 text-rose-600" />}
          description="Skills with >30% growth rate requiring immediate curriculum alignment."
        />
      </div>

      {/* AI Market Insight Box */}
      <div className="bg-slate-900 text-slate-100 rounded-md p-3.5 border border-slate-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                AI LABOUR MARKET SYNTHESIS
              </span>
              <Badge variant="teal">CONFIDENCE 96.2%</Badge>
            </div>
            <p className="text-2xs text-slate-300 mt-1 leading-relaxed">
              Job requisitions requiring containerization (Docker/Kubernetes) and LLM-assisted coding workflows have jumped by <strong>+38.5%</strong> in Q1 2026. Conversely, bare-metal server configuration requisitions have declined by <strong>-42%</strong>. State polytechnics should reallocate 24 lab hours from legacy LAMP stack hosting to container deployment pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-2xs font-mono uppercase text-slate-500 font-bold">FILTERS:</span>
          </div>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="All">All Locations</option>
            <option value="Chennai">Chennai Metro</option>
            <option value="Bengaluru">Bengaluru Urban</option>
            <option value="Coimbatore">Coimbatore Hub</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune Region</option>
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="All">All Industry Sectors</option>
            <option value="SaaS">SaaS & FinTech</option>
            <option value="Cloud">Cloud & Infrastructure</option>
            <option value="Automotive">EV & Automotive</option>
            <option value="AI">AI & Data</option>
          </select>

          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Full Year 2025-26">Full Year 2025-26</option>
          </select>
        </div>

        <div className="w-full sm:w-64">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search roles, skills, postings..."
          />
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Demand Trend Over Time */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-md p-3.5 shadow-card">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 font-mono uppercase">
                HIRING VOLUME BY SECTOR DOMAIN
              </h3>
              <p className="text-2xs text-slate-500">Monthly parsed job openings across tech sectors</p>
            </div>
            <Badge variant="teal">6-MONTH TREND</Badge>
          </div>
          <LineChart
            data={demandTrendData}
            xKey="month"
            height={220}
            series={[
              { key: 'software', label: 'Software & Web', color: '#0f172a' },
              { key: 'cloud', label: 'Cloud & DevOps', color: '#0d9488' },
              { key: 'hardware', label: 'EV & Hardware', color: '#2563eb' },
              { key: 'ai', label: 'AI & Data Science', color: '#d97706' },
            ]}
          />
        </div>

        {/* Demand by Location */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-md p-3.5 shadow-card">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 font-mono uppercase">
                GEOGRAPHIC DEMAND SHARE
              </h3>
              <p className="text-2xs text-slate-500">Percentage distribution by region</p>
            </div>
            <Badge variant="blue">SPATIAL</Badge>
          </div>
          <BarChart
            data={locationData}
            xKey="name"
            layout="vertical"
            height={220}
            series={[{ key: 'share', label: 'Regional Demand %', color: '#0d9488' }]}
          />
        </div>
      </div>

      {/* Secondary Charts: Top Roles & Top Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Top Active Roles */}
        <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 font-mono uppercase">
              TOP 7 OCCUPATIONAL ROLES BY VACANCIES
            </h3>
            <Badge variant="slate">4,120 PEAK</Badge>
          </div>
          <BarChart
            data={topRolesData}
            xKey="name"
            height={200}
            valueFormatter={(v) => v.toLocaleString()}
            series={[{ key: 'postings', label: 'Active Postings', color: '#2563eb' }]}
          />
        </div>

        {/* Top In-Demand Skills */}
        <div className="bg-white border border-slate-200 rounded-md p-3.5 shadow-card">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 font-mono uppercase">
              TOP IN-DEMAND COMPETENCY INDEX
            </h3>
            <Badge variant="teal">98% PEAK</Badge>
          </div>
          <BarChart
            data={topSkillsData}
            xKey="name"
            height={200}
            series={[{ key: 'demand', label: 'Industry Demand Index %', color: '#0d9488' }]}
          />
        </div>
      </div>

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportTitle="State Labour Market Intelligence Dossier Q1 2026"
      />
    </div>
  );
};
