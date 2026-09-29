import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMERGING_TECH_RADAR_DATA } from '../data/demoData';
import { TechnologyCard } from '../components/cards/TechnologyCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { EmergingTechItem } from '../types';

export const EmergingTechRadar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedQuadrant, setSelectedQuadrant] = useState<'All' | 'Adoption' | 'Trial' | 'Assess' | 'Hold'>('All');
  const [selectedTech, setSelectedTech] = useState<EmergingTechItem>(EMERGING_TECH_RADAR_DATA[0]);

  const filteredTech = EMERGING_TECH_RADAR_DATA.filter(
    (t) => selectedQuadrant === 'All' || t.radarQuadrant === selectedQuadrant
  );

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              EMERGING TECHNOLOGY RADAR & HORIZON SCANNER
            </h1>
            <Badge variant="blue">TECHNOLOGY PULSE</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Horizon scanning mapping high-velocity technological disruptions to state curriculum readiness
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal">9 Frontier Signals Active</Badge>
        </div>
      </div>

      {/* 4 Radar Rings / Quadrant Filter Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs overflow-x-auto">
        {[
          { id: 'All', label: 'All Technologies' },
          { id: 'Adoption', label: 'Adoption (Immediate Action)' },
          { id: 'Trial', label: 'Trial (Pilot Electives)' },
          { id: 'Assess', label: 'Assess (R&D Study)' },
          { id: 'Hold', label: 'Hold (Horizon 3)' },
        ].map((q) => (
          <button
            key={q.id}
            onClick={() => setSelectedQuadrant(q.id as any)}
            className={`px-3 py-1.5 rounded font-medium transition-colors whitespace-nowrap ${
              selectedQuadrant === q.id
                ? 'bg-slate-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Grid: Technology Cards (Left) + Detail Telemetry Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Technology Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredTech.map((tech) => (
            <TechnologyCard
              key={tech.id}
              tech={tech}
              isSelected={selectedTech.id === tech.id}
              onSelect={setSelectedTech}
            />
          ))}
        </div>

        {/* Selected Technology Deep Dive Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-md p-4 shadow-card flex flex-col justify-between space-y-3.5">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-2xs font-mono uppercase text-slate-400 font-bold">RADAR TELEMETRY INSPECTOR</span>
              <Badge variant="teal">{selectedTech.radarQuadrant} QUADRANT</Badge>
            </div>

            <div className="mt-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{selectedTech.name}</h3>
                <span className="font-mono text-2xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {selectedTech.growthSignal}
                </span>
              </div>
              <p className="text-2xs font-mono text-slate-400 mt-0.5">{selectedTech.horizon}</p>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed font-sans">{selectedTech.description}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-2xs font-mono">
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-slate-400 block">Momentum Score</span>
                <span className="text-sm font-bold text-slate-900">{selectedTech.momentumScore}/100</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-slate-400 block">Active Hiring Surge</span>
                <span className="text-sm font-bold text-teal-700">{selectedTech.hiringSurgeCount}</span>
              </div>
            </div>

            {/* State Institutional Readiness */}
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-slate-500">State Institutional Readiness</span>
                <span className="font-bold text-slate-800">{selectedTech.readinessInState}%</span>
              </div>
              <ProgressBar value={selectedTech.readinessInState} variant="gradient" size="xs" />
            </div>

            {/* Curriculum Impact Box */}
            <div className="mt-3 p-2.5 bg-teal-50/50 border border-teal-200 rounded text-xs text-teal-950 font-sans space-y-1">
              <div className="flex items-center gap-1 font-bold text-teal-900 text-2xs font-mono uppercase">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                Curricular Mandate & Lab Directives
              </div>
              <p className="text-2xs">{selectedTech.curriculumImpact}</p>
            </div>

            {/* Affected Roles & Skills */}
            <div className="mt-3 space-y-2">
              <div>
                <span className="text-2xs font-mono uppercase text-slate-400 font-bold block mb-1">
                  Occupational Roles Impacted:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedTech.affectedRoles.map((r) => (
                    <span key={r} className="px-1.5 py-0.2 bg-slate-50 border border-slate-200 rounded text-2xs font-mono text-slate-700">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-2xs font-mono uppercase text-slate-400 font-bold block mb-1">
                  Required Competency Modules:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedTech.requiredSkills.map((sk) => (
                    <span key={sk} className="px-1.5 py-0.2 bg-teal-50 border border-teal-200 rounded text-2xs font-mono text-teal-900 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Button
              variant="teal"
              size="xs"
              className="w-full justify-center"
              onClick={() => navigate('/curriculum-advisor')}
              icon={<BookOpen className="w-3.5 h-3.5" />}
            >
              Trigger Curriculum Alignment Workflow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
