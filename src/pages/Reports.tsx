import React, { useState } from 'react';
import { REPORTS_DATA } from '../data/demoData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { ExportReportModal } from '../components/modals/ExportReportModal';
import {
  Download,
  RefreshCw,
} from 'lucide-react';
import { ReportItem } from '../types';

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(REPORTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReportTitle, setSelectedReportTitle] = useState('State Labour Market Report');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const categories = ['All', 'Labour Market', 'Curriculum', 'District Capacity', 'Skills', 'Employer Consensus'];

  const filteredReports = reports.filter((r) => {
    const matchSearch =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleGenerate = (id: string) => {
    setGeneratingId(id);
    setTimeout(() => {
      setGeneratingId(null);
      setReports((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, generatedDate: 'Just now (Updated)', downloadCount: r.downloadCount + 1 }
            : r
        )
      );
    }, 1000);
  };

  const handleExportClick = (title: string) => {
    setSelectedReportTitle(title);
    setIsExportOpen(true);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              REPORTS & INTELLIGENCE ARTIFACTS
            </h1>
            <Badge variant="teal">AUDITED EXPORTS</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Automated PDF, Excel, and machine-readable data deliverables for State Education Departments and NCVET
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="teal"
            size="xs"
            onClick={() => handleExportClick('Consolidated State LMI Dossier 2026')}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export All Dossiers (.ZIP)
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-2xs font-mono font-medium border transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search report titles..."
          />
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-slate-200 rounded-md p-4 shadow-card flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <Badge variant="blue">{report.category}</Badge>
                <span className="text-2xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  {report.format} • {report.size}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {report.title}
              </h3>

              <p className="text-2xs text-slate-600 mt-1 leading-relaxed font-sans">{report.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="text-2xs font-mono text-slate-400">
                <span>Updated: {report.generatedDate}</span>
                <span className="mx-1">•</span>
                <span>{report.downloadCount} downloads</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="xs"
                  loading={generatingId === report.id}
                  onClick={() => handleGenerate(report.id)}
                  icon={<RefreshCw className="w-3 h-3" />}
                >
                  Regenerate
                </Button>
                <Button
                  variant="teal"
                  size="xs"
                  onClick={() => handleExportClick(report.title)}
                  icon={<Download className="w-3 h-3" />}
                >
                  Download {report.format}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportTitle={selectedReportTitle}
      />
    </div>
  );
};
