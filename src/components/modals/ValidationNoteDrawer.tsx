import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { EMPLOYER_VALIDATION_REQUESTS } from '../../data/demoData';
import { CheckCircle2, MessageSquare, ThumbsUp, HelpCircle, Shield, Building2 } from 'lucide-react';

export interface ValidationNoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  requestId?: string;
}

export const ValidationNoteDrawer: React.FC<ValidationNoteDrawerProps> = ({
  isOpen,
  onClose,
  requestId = 'val-tcs-01',
}) => {
  const [commentText, setCommentText] = useState('');
  const [voted, setVoted] = useState(false);
  const validation = EMPLOYER_VALIDATION_REQUESTS.find((v) => v.id === requestId) || EMPLOYER_VALIDATION_REQUESTS[0];

  const handleAddVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setVoted(true);
    setCommentText('');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="EMPLOYER CONSENSUS AUDIT LOGS"
      subtitle={`${validation.recommendationTitle} • Quorum: ${validation.agreementPct}% Agreement`}
      badge={<Badge variant="emerald" dot>37 Industry Boards</Badge>}
      width="lg"
      footer={
        <div className="flex justify-between items-center w-full">
          <span className="text-2xs font-mono text-slate-500">Status: {validation.status}</span>
          <Button variant="secondary" size="xs" onClick={onClose}>
            Close Audit Log
          </Button>
        </div>
      }
    >
      <div className="bg-slate-50 border border-slate-200 rounded p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-2xs font-mono uppercase text-slate-500 font-semibold">{validation.industrySector}</span>
          <Badge variant="teal">Consensus {validation.agreementPct}%</Badge>
        </div>
        <p className="text-xs text-slate-700">{validation.evidence}</p>
        <div className="flex gap-4 mt-2 pt-2 border-t border-slate-200 text-2xs font-mono text-slate-500">
          <span>Submitted: {validation.submissionDate}</span>
          <span>Due: {validation.dueDate}</span>
        </div>
      </div>

      <div>
        <h5 className="text-2xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-700" />
          Verified Corporate Employer Reviews ({validation.employers.length})
        </h5>
        <div className="space-y-2.5">
          {validation.employers.map((emp) => (
            <div key={emp.id} className="bg-white border border-slate-200 rounded p-3 text-xs shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{emp.company}</span>
                  <Badge
                    variant={
                      emp.status === 'AGREED'
                        ? 'emerald'
                        : emp.status === 'PARTIALLY_AGREED'
                        ? 'amber'
                        : 'rose'
                    }
                  >
                    {emp.status.replace('_', ' ')}
                  </Badge>
                </div>
                <span className="text-2xs font-mono text-slate-400">{emp.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                "{emp.comment || 'Review pending final signature from academic advisory lead.'}"
              </p>
              <div className="text-2xs font-mono text-slate-500 mt-1.5">
                Evaluator: <span className="font-semibold text-slate-700">{emp.reviewer}</span> ({emp.role})
              </div>
            </div>
          ))}

          {voted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Your evaluation note has been submitted to the state curriculum quorum log.</span>
            </div>
          )}
        </div>
      </div>

      {/* Add note form */}
      {!voted && (
        <form onSubmit={handleAddVote} className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2">
          <label className="text-2xs font-mono uppercase text-slate-700 font-bold block">
            Add Corporate Advisory Note / Recommendation
          </label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter institutional recommendations, required lab tools, or credit adjustments..."
            rows={2}
            className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="teal"
              size="xs"
              icon={<MessageSquare className="w-3 h-3" />}
              disabled={!commentText.trim()}
            >
              Submit Board Comment
            </Button>
          </div>
        </form>
      )}
    </Drawer>
  );
};
