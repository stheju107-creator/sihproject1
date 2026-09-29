import React, { useState } from 'react';
import { Modal } from '../modals/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Sliders, Cpu, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export interface ModelProjectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelProjectionsModal: React.FC<ModelProjectionsModalProps> = ({ isOpen, onClose }) => {
  const [newBatches, setNewBatches] = useState(48);
  const [targetedDistrict, setTargetedDistrict] = useState('All Tier-2 Districts');
  const [labUpgrades, setLabUpgrades] = useState(24);
  const [projectedDeficitReduction, setProjectedDeficitReduction] = useState(88);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setProjectedDeficitReduction(Math.min(98, Math.round(50 + newBatches * 0.7 + labUpgrades * 0.5)));
      setIsSimulating(false);
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Algorithmic Capacity & Deficit Neutralization Model"
      subtitle="Monte Carlo Simulation • Directorate of Technical Education (DoTE) Forecasting Engine"
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-2xs font-mono text-slate-500">ML Confidence: 94.6%</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="xs" onClick={onClose}>
              Dismiss
            </Button>
            <Button variant="teal" size="xs" onClick={handleSimulate} loading={isSimulating} icon={<Cpu className="w-3.5 h-3.5" />}>
              Recompute Scenario
            </Button>
          </div>
        </div>
      }
    >
      <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Baseline State Deficit: 4,270 Trainees / Month
          </span>
          <Badge variant="rose">34% Widening Deficit</Badge>
        </div>
        <p className="text-slate-600 text-2xs">
          Simulate how allocating vocational batches and lab grants across Tier-2 polytechnics bridges state hiring deficits by Q3 2026.
        </p>
      </div>

      {/* Interactive Sliders */}
      <div className="space-y-3.5 bg-white border border-slate-200 rounded p-3.5">
        <h5 className="text-2xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-slate-700" />
          Simulation Policy Levers
        </h5>

        <div>
          <div className="flex justify-between text-xs font-medium text-slate-800 mb-1">
            <span>Additional Vocational Batches to Allocate</span>
            <span className="font-mono text-teal-700 font-bold">+{newBatches} Batches ({newBatches * 30} Seats)</span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            value={newBatches}
            onChange={(e) => {
              setNewBatches(Number(e.target.value));
              setProjectedDeficitReduction(Math.min(98, Math.round(50 + Number(e.target.value) * 0.7 + labUpgrades * 0.5)));
            }}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-slate-800 mb-1">
            <span>Modernized Cloud & Hardware Laboratories</span>
            <span className="font-mono text-blue-700 font-bold">{labUpgrades} Labs (₹{(labUpgrades * 0.15).toFixed(2)} Cr)</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            value={labUpgrades}
            onChange={(e) => {
              setLabUpgrades(Number(e.target.value));
              setProjectedDeficitReduction(Math.min(98, Math.round(50 + newBatches * 0.7 + Number(e.target.value) * 0.5)));
            }}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="text-2xs font-mono text-slate-500 uppercase block mb-1">Target Priority Cluster</label>
          <select
            value={targetedDistrict}
            onChange={(e) => setTargetedDistrict(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs text-slate-800 font-medium"
          >
            <option value="All Tier-2 Districts">All Tier-2 Industrial Hubs (Coimbatore, Pune, Madurai, Trichy)</option>
            <option value="Coimbatore Only">Coimbatore Western Cluster (Cloud & IoT Focus)</option>
            <option value="Chennai Metro">Chennai Metro Corridor (Automotive & AI Focus)</option>
            <option value="Bengaluru Urban">Bengaluru Frontier (GenAI & VLSI Focus)</option>
          </select>
        </div>
      </div>

      {/* Projection Results */}
      <div className="bg-emerald-50/50 border border-emerald-200 rounded p-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-emerald-900">Projected Deficit Neutralization</span>
          <span className="text-xs font-mono font-bold text-emerald-700">{projectedDeficitReduction}% by Q3 2026</span>
        </div>
        <ProgressBar value={projectedDeficitReduction} variant="emerald" size="sm" />
        <div className="grid grid-cols-2 gap-2 text-2xs font-mono text-slate-600 pt-1">
          <div>
            <span className="text-slate-400 block">Graduates Added</span>
            <span className="font-semibold text-slate-800 font-mono">+{newBatches * 30 + labUpgrades * 15} certified trainees/mo</span>
          </div>
          <div>
            <span className="text-slate-400 block">Estimated Placement Delta</span>
            <span className="font-semibold text-emerald-700 font-mono">+12.4% state hiring conversion</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
