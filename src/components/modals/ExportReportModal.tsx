import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Download, FileText, CheckCircle2, Table, Code2 } from 'lucide-react';

export interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  reportTitle = 'State Labour Market Intelligence & Curriculum Report',
}) => {
  const [format, setFormat] = useState<'PDF' | 'XLSX' | 'CSV' | 'JSON'>('PDF');
  const [includeExplainability, setIncludeExplainability] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Intelligence Artifact"
      subtitle="SIH 2026 • PS-26134 Automated Report Generator"
      maxWidth="md"
      footer={
        <div className="flex justify-between items-center w-full">
          <Badge variant="teal">NSQF Audited Data</Badge>
          <div className="flex gap-2">
            <Button variant="secondary" size="xs" onClick={onClose} disabled={isDownloading}>
              Cancel
            </Button>
            <Button
              variant="teal"
              size="xs"
              onClick={handleDownload}
              loading={isDownloading}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              {downloadSuccess ? 'Downloaded!' : `Export ${format}`}
            </Button>
          </div>
        </div>
      }
    >
      {downloadSuccess ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded p-6 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-emerald-900">Artifact Export Complete</h4>
          <p className="text-xs text-emerald-700">
            {reportTitle} has been downloaded in {format} format.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs">
            <span className="text-2xs font-mono text-slate-400 block mb-0.5">SELECTED REPORT</span>
            <h4 className="font-bold text-slate-900">{reportTitle}</h4>
          </div>

          <div>
            <label className="text-2xs font-mono text-slate-500 uppercase block mb-2 font-semibold">Select Output Format</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'PDF', label: 'PDF Document', desc: 'Official formatted dossier', icon: <FileText className="w-4 h-4 text-rose-600" /> },
                { id: 'XLSX', label: 'Excel (XLSX)', desc: 'Tabular matrix with formulas', icon: <Table className="w-4 h-4 text-emerald-600" /> },
                { id: 'CSV', label: 'Raw CSV', desc: 'Comma separated values', icon: <Table className="w-4 h-4 text-blue-600" /> },
                { id: 'JSON', label: 'REST API JSON', desc: 'Machine-readable schema', icon: <Code2 className="w-4 h-4 text-teal-600" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormat(item.id as any)}
                  className={`flex items-start gap-2.5 p-2.5 rounded border text-left transition-colors ${
                    format === item.id
                      ? 'border-teal-600 bg-teal-50/50 text-slate-900 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-2xs text-slate-500">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeExplainability}
                onChange={(e) => setIncludeExplainability(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="text-slate-700">Include Explainable AI (XAI) feature importance audit trail</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" />
              <span className="text-slate-700">Append 37 Industry Board review signatures and timestamps</span>
            </label>
          </div>
        </div>
      )}
    </Modal>
  );
};
