import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSkills } from '../hooks/useSkills';
import { SkillCard } from '../components/cards/SkillCard';
import { DataTable } from '../components/tables/DataTable';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { List, Grid, Download, Sparkles } from 'lucide-react';
import { ExportReportModal } from '../components/modals/ExportReportModal';
import { Skill } from '../types';

export const SkillIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minDemand, setMinDemand] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const { skills, loading, error, refetch } = useSkills({
    search: searchQuery,
    category: selectedCategory,
    minDemand,
  });

  const categories = useMemo(() => {
    const set = new Set(skills.map((s) => s.category));
    return ['All', ...Array.from(set)];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.relatedSkills.some((rs) => rs.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchDem = s.demandPct >= minDemand;
      return matchSearch && matchCat && matchDem;
    });
  }, [skills, searchQuery, selectedCategory, minDemand]);

  const columns = [
    {
      key: 'name',
      header: 'Skill Competency',
      sortable: true,
      render: (row: Skill) => (
        <div>
          <div className="font-bold text-slate-900 hover:text-teal-700 transition-colors">
            {row.name}
          </div>
          <div className="text-2xs font-mono text-slate-400">{row.category}</div>
        </div>
      ),
    },
    {
      key: 'demandPct',
      header: 'Market Demand',
      sortable: true,
      render: (row: Skill) => (
        <div className="flex items-center gap-2 max-w-[140px]">
          <ProgressBar value={row.demandPct} variant="teal" size="xs" />
          <span className="font-mono text-2xs font-bold text-slate-800">{row.demandPct}%</span>
        </div>
      ),
    },
    {
      key: 'growth',
      header: 'Velocity',
      sortable: true,
      render: (row: Skill) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
          {row.growth}
        </span>
      ),
    },
    {
      key: 'curriculumCoveragePct',
      header: 'Curriculum Coverage',
      sortable: true,
      render: (row: Skill) => (
        <div className="flex items-center gap-2 max-w-[140px]">
          <ProgressBar value={row.curriculumCoveragePct} variant="rose" size="xs" />
          <span className="font-mono text-2xs font-bold text-slate-800">{row.curriculumCoveragePct}%</span>
        </div>
      ),
    },
    {
      key: 'gapPct',
      header: 'Deficit Gap',
      sortable: true,
      render: (row: Skill) => (
        <span className="font-mono font-bold text-rose-600">
          {row.gapPct}% Divergence
        </span>
      ),
    },
    {
      key: 'relatedRoles',
      header: 'Connected Roles',
      render: (row: Skill) => (
        <span className="font-mono text-2xs text-slate-600">
          {row.relatedRoles.map((r) => r.title).slice(0, 2).join(', ')}
          {row.relatedRoles.length > 2 ? ` +${row.relatedRoles.length - 2}` : ''}
        </span>
      ),
    },
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
              SKILL INTELLIGENCE & ONTOLOGY
            </h1>
            <Badge variant="teal">632 TAXONOMY NODES</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Machine-learned competency taxonomy indexing technical capabilities from active market demand
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsExportOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Skill Taxonomy
          </Button>
          <Button
            variant="teal"
            size="xs"
            onClick={() => navigate('/skill-graph')}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            View Interactive Graph
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
                {c === 'All' ? 'All Skill Categories' : c}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-2xs font-mono text-slate-500">
            <span>Min Demand:</span>
            <input
              type="range"
              min={0}
              max={80}
              step={10}
              value={minDemand}
              onChange={(e) => setMinDemand(Number(e.target.value))}
              className="accent-teal-600 w-24"
            />
            <span className="font-bold text-slate-800">{minDemand}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search skills, frameworks, tools..."
            />
          </div>

          <div className="flex items-center border border-slate-200 rounded overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 ${viewMode === 'table' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Grid of SkillCards or Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredSkills}
          keyExtractor={(s) => s.id}
          onRowClick={(s) => navigate(`/skills/${s.id}`)}
          emptyMessage="No skill competencies match the selected parameters."
        />
      )}

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportTitle="NSQF 632 Competency Ontology Report"
      />
    </div>
  );
};
