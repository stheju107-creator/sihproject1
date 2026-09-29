import React, { useState } from 'react';
import { useCurriculum } from '../hooks/useCurriculum';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MetricCard } from '../components/cards/MetricCard';
import { LoadingSkeleton, ErrorState } from '../components/ui/LoadingSkeleton';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Building2,
  Send,
} from 'lucide-react';
import { EmployerValidationRequest } from '../types';

export const EmployerValidation: React.FC = () => {
  const { validations, loading, error, refetch, submitValidationFeedback } = useCurriculum();

  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'consensus'>('all');
  const [selectedRequest, setSelectedRequest] = useState<EmployerValidationRequest | null>(null);
  const [feedbackCompany, setFeedbackCompany] = useState('Tata Consultancy Services');
  const [feedbackReviewer, setFeedbackReviewer] = useState('Senior Technical Evaluator');
  const [feedbackRole, setFeedbackRole] = useState('Principal Architect');
  const [feedbackStatus, setFeedbackStatus] = useState<'AGREED' | 'PARTIALLY_AGREED' | 'DISAGREED'>('AGREED');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredValidations = validations.filter((v) => {
    if (activeTab === 'open') return v.status === 'Under Review' || v.status === 'Open';
    if (activeTab === 'consensus') return v.status === 'Consensus Reached';
    return true;
  });

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !feedbackComment.trim()) return;

    setIsSubmitting(true);
    await submitValidationFeedback(selectedRequest.id, {
      company: feedbackCompany,
      reviewer: feedbackReviewer,
      role: feedbackRole,
      status: feedbackStatus,
      comment: feedbackComment,
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setSelectedRequest(null);
      setFeedbackComment('');
    }, 1500);
  };

  if (loading) {
    return <LoadingSkeleton type="card" rows={4} />;
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
              EMPLOYER VALIDATION & INDUSTRY CONSENSUS
            </h1>
            <Badge variant="emerald">37 CORPORATE BOARDS</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Decentralized review quorum where engineering leaders audit and sign off on proposed curriculum changes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal">Quorum Threshold: 75% Consensus</Badge>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <MetricCard
          title="Overall Quorum Consensus"
          value="89.4%"
          subvalue="+3.2% vs 2025"
          badge={{ text: 'High Agreement', variant: 'emerald' }}
          icon={<UserCheck className="w-4 h-4 text-emerald-600" />}
          description="Average agreement rate across active state technical amendments."
        />
        <MetricCard
          title="Partner Corporations"
          value="37 Corps"
          subvalue="TCS, Infy, Bosch..."
          badge={{ text: 'Tier 1 Industry', variant: 'blue' }}
          icon={<Building2 className="w-4 h-4 text-blue-600" />}
          description="Registered institutional reviewers with formal voting privileges."
        />
        <MetricCard
          title="Consensus Reached"
          value="18 Syllabi"
          subvalue="Ready for Gazette"
          badge={{ text: 'Signed Off', variant: 'teal' }}
          icon={<CheckCircle2 className="w-4 h-4 text-teal-600" />}
          description="Curriculum blueprints having achieved >85% industry endorsement."
        />
        <MetricCard
          title="Pending Quorum"
          value="4 Requests"
          subvalue="Due by 15-Apr-2026"
          badge={{ text: 'Under Review', variant: 'amber' }}
          icon={<Clock className="w-4 h-4 text-amber-600" />}
          description="Proposals currently undergoing 14-day mandatory employer audit."
        />
      </div>

      {/* Tab filter */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded font-medium ${
            activeTab === 'all' ? 'bg-slate-900 text-white shadow-xs font-bold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Requests ({validations.length})
        </button>
        <button
          onClick={() => setActiveTab('consensus')}
          className={`px-3 py-1.5 rounded font-medium ${
            activeTab === 'consensus' ? 'bg-slate-900 text-white shadow-xs font-bold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Consensus Reached ({validations.filter((v) => v.status === 'Consensus Reached').length})
        </button>
        <button
          onClick={() => setActiveTab('open')}
          className={`px-3 py-1.5 rounded font-medium ${
            activeTab === 'open' ? 'bg-slate-900 text-white shadow-xs font-bold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Under Review ({validations.filter((v) => v.status === 'Under Review').length})
        </button>
      </div>

      {/* Validation Requests Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredValidations.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.status === 'Consensus Reached' ? 'emerald' : 'amber'}>
                    {item.status}
                  </Badge>
                  <span className="text-2xs font-mono uppercase text-slate-500 font-semibold">{item.industrySector}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{item.recommendationTitle}</h3>
              </div>

              <div className="text-right">
                <span className="text-2xs font-mono text-slate-400 block mb-0.5">Agreement Quorum</span>
                <span className="text-base font-bold font-mono text-emerald-700">{item.agreementPct}%</span>
              </div>
            </div>

            {/* Evidence Text */}
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 font-sans">
              <strong>Grounding Telemetry: </strong>{item.evidence}
            </p>

            {/* Reviewers List */}
            <div>
              <span className="text-2xs font-mono uppercase text-slate-400 font-bold block mb-2">
                Corporate Evaluator Quorum Signatures ({item.employers.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {item.employers.map((emp) => (
                  <div key={emp.id} className="bg-slate-50/70 border border-slate-200 rounded p-2.5 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{emp.company}</span>
                      <Badge
                        variant={
                          emp.status === 'AGREED'
                            ? 'emerald'
                            : emp.status === 'PARTIALLY_AGREED'
                            ? 'amber'
                            : emp.status === 'PENDING'
                            ? 'slate'
                            : 'rose'
                        }
                      >
                        {emp.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    {emp.comment && (
                      <p className="text-2xs text-slate-600 italic">"{emp.comment}"</p>
                    )}
                    <div className="flex justify-between items-center text-2xs font-mono text-slate-400 pt-1 border-t border-slate-100">
                      <span>{emp.reviewer} ({emp.role})</span>
                      <span>{emp.timestamp || 'Pending'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="text-2xs font-mono text-slate-500">
                Deadline: <strong className="text-slate-800">{item.dueDate}</strong>
              </div>
              <Button
                variant="teal"
                size="xs"
                onClick={() => setSelectedRequest(item)}
                icon={<MessageSquare className="w-3.5 h-3.5" />}
              >
                Cast Quorum Vote / Add Comment
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Vote / Comment Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-md border border-slate-200 shadow-modal max-w-lg w-full p-5 space-y-4">
            <div className="flex items-start justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Cast Employer Advisory Vote
                </h3>
                <p className="text-2xs text-slate-500 mt-0.5">{selectedRequest.recommendationTitle}</p>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Quorum Vote Registered</h4>
                <p className="text-xs text-emerald-700">
                  Your formal advisory assessment has been added to the state curriculum audit record.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVoteSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
                    Your Organization / Industry Board
                  </label>
                  <input
                    type="text"
                    value={feedbackCompany}
                    onChange={(e) => setFeedbackCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
                      Evaluator Name
                    </label>
                    <input
                      type="text"
                      value={feedbackReviewer}
                      onChange={(e) => setFeedbackReviewer(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
                      Professional Role / Title
                    </label>
                    <input
                      type="text"
                      value={feedbackRole}
                      onChange={(e) => setFeedbackRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1.5">
                    Curriculum Endorsement Verdict
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFeedbackStatus('AGREED')}
                      className={`p-2 rounded border text-center transition-colors font-semibold text-2xs ${
                        feedbackStatus === 'AGREED'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-600" />
                      Endorsed (Agreed)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackStatus('PARTIALLY_AGREED')}
                      className={`p-2 rounded border text-center transition-colors font-semibold text-2xs ${
                        feedbackStatus === 'PARTIALLY_AGREED'
                          ? 'border-amber-600 bg-amber-50 text-amber-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 mx-auto mb-1 text-amber-600" />
                      Conditional
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackStatus('DISAGREED')}
                      className={`p-2 rounded border text-center transition-colors font-semibold text-2xs ${
                        feedbackStatus === 'DISAGREED'
                          ? 'border-rose-600 bg-rose-50 text-rose-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5 mx-auto mb-1 text-rose-600" />
                      Revision Needed
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
                    Formal Advisory Comment & Lab Guidance
                  </label>
                  <textarea
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Describe laboratory tooling recommendations or credit adjustments..."
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-900 focus:bg-white"
                    required
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
                  <Button variant="secondary" size="xs" onClick={() => setSelectedRequest(null)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="teal"
                    size="xs"
                    loading={isSubmitting}
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Submit Advisory Signature
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
