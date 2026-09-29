import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLabourData } from '../hooks/useLabourData';
import { DataTable } from '../components/tables/DataTable';
import { Badge } from '../components/ui/Badge';
import { SearchBar } from '../components/ui/SearchBar';
import { Button } from '../components/ui/Button';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import { RoleCard } from '../components/cards/RoleCard';
import { Grid, List, Download } from 'lucide-react';
import { ExportReportModal } from '../components/modals/ExportReportModal';
import { JobRole } from '../types';

export const JobRoles: React.FC = () => {
  const navigate = useNavigate();
  const { roles, loading, error, refetch } = useLabourData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDemand, setSelectedDemand] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(roles.map((r) => r.category));
    return ['All', ...Array.from(set)];
  }, [roles]);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchSearch =
        !searchQuery ||
        role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.topSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        role.locations.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat = selectedCategory === 'All' || role.category === selectedCategory;
      const matchDem = selectedDemand === 'All' || role.demandLevel === selectedDemand;

      return matchSearch && matchCat && matchDem;
    });
  }, [roles, searchQuery, selectedCategory, selectedDemand]);

  const columns = [
    {
      key: 'title',
      header: 'Role Title & Category',
      sortable: true,
      render: (row: JobRole) => (
        <div>
          <div className="font-bold text-slate-900 hover:text-teal-700 transition-colors">
            {row.title}
          </div>
          <div className="text-2xs font-mono text-slate-400">{row.category}</div>
        </div>
      ),
    },
    {
      key: 'demandLevel',
      header: 'Demand Level',
      sortable: true,
      render: (row: JobRole) => (
        <Badge
          variant={
            row.demandLevel === 'Surging'
              ? 'rose'
              : row.demandLevel === 'High'
              ? 'teal'
              : 'blue'
          }
        >
          {row.demandLevel}
        </Badge>
      ),
    },
    {
      key: 'growth',
      header: 'Velocity',
      sortable: true,
      render: (row: JobRole) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
          {row.growth}
        </span>
      ),
    },
    {
      key: 'topSkills',
      header: 'Top Core Skills',
      render: (row: JobRole) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {row.topSkills.slice(0, 4).map((sk) => (
            <span
              key={sk}
              className="px-1.5 py-0.2 bg-slate-100 border border-slate-200 rounded text-2xs font-mono text-slate-700"
            >
              {sk}
            </span>
          ))}
          {row.topSkills.length > 4 && (
            <span className="text-2xs font-mono text-slate-400 self-center">
              +{row.topSkills.length - 4}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'locations',
      header: 'Primary Hubs',
      render: (row: JobRole) => (
        <span className="font-mono text-2xs text-slate-600">
          {row.locations.slice(0, 2).join(', ')}
          {row.locations.length > 2 ? ` +${row.locations.length - 2}` : ''}
        </span>
      ),
    },
    {
      key: 'avgProficiency',
      header: 'NSQF Target',
      render: (row: JobRole) => (
        <span className="font-mono text-2xs text-slate-700 font-medium">
          {row.avgProficiency}
        </span>
      ),
    },
    {
      key: 'activePostings',
      header: 'Postings',
      sortable: true,
      align: 'right' as const,
      render: (row: JobRole) => (
        <span className="font-mono font-bold text-slate-900">
          {row.activePostings.toLocaleString()}
        </span>
      ),
    },
  ];

  if (loading) {
    return <LoadingSkeleton type="table" rows={7} />;
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
              OCCUPATIONAL JOB ROLES REPOSITORY
            </h1>
            <Badge variant="blue">{roles.length} ROLES INDEXED</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Standardized technical job descriptions mapped against live state demand and NSQF levels
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsExportOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Roles
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-medium"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          <select
            value={selectedDemand}
            onChange={(e) => setSelectedDemand(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-medium"
          >
            <option value="All">All Demand Levels</option>
            <option value="Surging">Surging</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter roles, skills, locations..."
            />
          </div>

          <div className="flex items-center border border-slate-200 rounded overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 ${viewMode === 'table' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredRoles}
          keyExtractor={(r) => r.id}
          onRowClick={(r) => navigate(`/job-roles/${r.id}`)}
          emptyMessage="No occupational roles matched your criteria."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredRoles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      )}

      {/* Export Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportTitle="Occupational Job Roles Repository Audit"
      />
    </div>
  );
};
