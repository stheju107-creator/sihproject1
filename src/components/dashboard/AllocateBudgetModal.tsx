import React, { useState } from 'react';
import { Modal } from '../modals/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CheckCircle2, DollarSign, Building2, UserPlus, Server } from 'lucide-react';

export interface AllocateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  districtId?: string;
  districtName?: string;
  requiredBudget?: string;
}

export const AllocateBudgetModal: React.FC<AllocateBudgetModalProps> = ({
  isOpen,
  onClose,
  districtName = 'Coimbatore',
  requiredBudget = '₹4.20 Cr',
}) => {
  const [labGrants, setLabGrants] = useState('2.40');
  const [trainerHiring, setTrainerHiring] = useState('1.20');
  const [curriculumMaterials, setCurriculumMaterials] = useState('0.60');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Emergency Capacity Allocation • ${districtName} District`}
      subtitle={`Resolving -1,700 seats deficit across 16 state polytechnics`}
      maxWidth="md"
      footer={
        <div className="flex justify-end gap-2 w-full">
          <Button variant="secondary" size="xs" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="teal"
            size="xs"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={isSuccess}
            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
          >
            {isSuccess ? 'Allocation Dispatched!' : 'Authorize State Grant'}
          </Button>
        </div>
      }
    >
      {isSuccess ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded p-6 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-emerald-900">Capital Grant Authorized</h4>
          <p className="text-xs text-emerald-700">
            {requiredBudget} has been earmarked for {districtName} Directorate of Technical Education regional labs.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="bg-amber-50/70 border border-amber-200 rounded p-3 text-xs text-amber-900">
            <div className="flex justify-between font-bold mb-1">
              <span>Required District Fund: {requiredBudget}</span>
              <Badge variant="amber">Deficit -1,700 Seats</Badge>
            </div>
            <p className="text-2xs text-amber-800">
              Coimbatore Cloud & DevOps cluster requires 14 lab expansions and 42 specialized trainers to meet industrial hiring quotas.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="text-2xs font-mono uppercase text-slate-500 font-semibold block mb-1 flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-teal-600" />
                Cloud Sandboxes & Workstation Labs (₹ Cr)
              </label>
              <input
                type="number"
                step="0.1"
                value={labGrants}
                onChange={(e) => setLabGrants(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="text-2xs font-mono uppercase text-slate-500 font-semibold block mb-1 flex items-center gap-1">
                <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                Specialized Adjunct Trainer Recruitment (₹ Cr)
              </label>
              <input
                type="number"
                step="0.1"
                value={trainerHiring}
                onChange={(e) => setTrainerHiring(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="text-2xs font-mono uppercase text-slate-500 font-semibold block mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-600" />
                Hardware Kits & Courseware Licensing (₹ Cr)
              </label>
              <input
                type="number"
                step="0.1"
                value={curriculumMaterials}
                onChange={(e) => setCurriculumMaterials(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">Total Authorization:</span>
            <span className="font-bold text-slate-900">
              ₹{(parseFloat(labGrants || '0') + parseFloat(trainerHiring || '0') + parseFloat(curriculumMaterials || '0')).toFixed(2)} Cr
            </span>
          </div>
        </form>
      )}
    </Modal>
  );
};
