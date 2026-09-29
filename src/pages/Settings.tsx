import React, { useState } from 'react';
import { useRole } from '../components/layout/MainLayout';
import { DEMO_USER_PROFILES } from '../data/demoData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { UserRole } from '../types';
import {
  User,
  Building,
  Cpu,
  Database,
  CheckCircle2,
  Save,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { role, setRole } = useRole();
  const profile = DEMO_USER_PROFILES[role] || DEMO_USER_PROFILES['District Planner'];

  const [activeTab, setActiveTab] = useState<'profile' | 'organization' | 'ai' | 'data'>('profile');
  const [userName, setUserName] = useState(profile.name);
  const [userEmail, setUserEmail] = useState(profile.email);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(85);
  const [autoApprovalQuorum, setAutoApprovalQuorum] = useState(80);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const roleList: UserRole[] = [
    'District Planner',
    'Curriculum Director',
    'Industry Evaluator',
    'State Admin',
    'Student / Trainee',
  ];

  return (
    <div className="space-y-4 pb-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              SYSTEM & PERSONA SETTINGS
            </h1>
            <Badge variant="teal">ENTERPRISE CONFIG</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Configure algorithmic thresholds, persona perspective, and state data sync integrations
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs">
        {[
          { id: 'profile', label: 'User Persona & Profile', icon: <User className="w-3.5 h-3.5" /> },
          { id: 'organization', label: 'Institutional Affiliation', icon: <Building className="w-3.5 h-3.5" /> },
          { id: 'ai', label: 'Explainable AI (XAI) Tuning', icon: <Cpu className="w-3.5 h-3.5" /> },
          { id: 'data', label: 'Data Feeds & Webhooks', icon: <Database className="w-3.5 h-3.5" /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === t.id
                ? 'bg-slate-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Profile & Role Persona Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-4 text-xs">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">
              ACTIVE DEMO PERSONA SWITCHER
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {roleList.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    const newP = DEMO_USER_PROFILES[r];
                    if (newP) {
                      setUserName(newP.name);
                      setUserEmail(newP.email);
                    }
                  }}
                  className={`p-3 rounded border text-left transition-colors flex flex-col justify-between space-y-1 ${
                    role === r
                      ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-500 font-bold'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900">{r}</span>
                  <span className="text-2xs font-mono text-slate-500">
                    {DEMO_USER_PROFILES[r]?.organization}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div>
              <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
                Full Official Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
                Institutional Email Address
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button type="submit" variant="teal" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      )}

      {/* Organization Tab */}
      {activeTab === 'organization' && (
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
            INSTITUTIONAL REGISTRATION & DIRECTIVES
          </h3>
          <div className="space-y-2 font-mono text-2xs text-slate-700">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
              <span className="text-slate-400 block uppercase">Department</span>
              <strong className="text-slate-900">{profile.organization}</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
              <span className="text-slate-400 block uppercase">Official Title</span>
              <strong className="text-slate-900">{profile.title}</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
              <span className="text-slate-400 block uppercase">Framework Authority</span>
              <strong className="text-slate-900">Smart India Hackathon 2026 • PS-26134 (Team NexGen)</strong>
            </div>
          </div>
        </div>
      )}

      {/* AI Preferences Tab */}
      {activeTab === 'ai' && (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-4 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
            EXPLAINABLE AI (XAI) ALGORITHMIC ENGINE TUNING
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-800 mb-1">
                <span>Recommendation Confidence Threshold</span>
                <span className="font-mono font-bold text-teal-700">{aiConfidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min={60}
                max={95}
                value={aiConfidenceThreshold}
                onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <span className="text-2xs text-slate-400 block mt-0.5">
                Only generate automated syllabus proposals when NLP model confidence exceeds {aiConfidenceThreshold}%.
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-800 mb-1">
                <span>Employer Quorum Consensus Gate</span>
                <span className="font-mono font-bold text-emerald-700">{autoApprovalQuorum}%</span>
              </div>
              <input
                type="range"
                min={70}
                max={95}
                value={autoApprovalQuorum}
                onChange={(e) => setAutoApprovalQuorum(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="text-2xs text-slate-400 block mt-0.5">
                Automatically escalate proposals to State Board once employer quorum reaches {autoApprovalQuorum}%.
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button type="submit" variant="teal" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
              Save AI Thresholds
            </Button>
          </div>
        </form>
      )}

      {/* Data Feeds Tab */}
      {activeTab === 'data' && (
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-card space-y-3 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
            LIVE LABOUR CRAWLER FEEDS & WEBHOOK STATUS
          </h3>
          <div className="space-y-2">
            {[
              { name: 'Public Job Portals Indexer (NCS & State Portals)', status: 'ACTIVE', rate: '15 min sync', count: '6,420 postings' },
              { name: 'Direct Enterprise Career API (TCS, Infy, Zoho, etc.)', status: 'ACTIVE', rate: 'Live Stream', count: '4,180 postings' },
              { name: 'Polytechnic Student Exit Examination DB', status: 'ONLINE', rate: 'Daily Batch', count: '84 colleges' },
              { name: 'NSQF National Qualification Register', status: 'SYNCED', rate: 'Weekly Check', count: '632 taxonomy nodes' },
            ].map((feed) => (
              <div key={feed.name} className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{feed.name}</div>
                  <div className="text-2xs font-mono text-slate-400">{feed.rate} • {feed.count}</div>
                </div>
                <Badge variant="teal">{feed.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
