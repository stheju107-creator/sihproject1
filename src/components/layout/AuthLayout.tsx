import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Cpu, ArrowLeft } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-teal-600 text-white font-mono font-bold flex items-center justify-center">
            CL
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block">
              CAREERLINK
            </span>
            <span className="text-2xs font-mono text-teal-400 block uppercase">
              Labour-Market Intelligence
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="teal">SIH 2026 PS-26134</Badge>
          <Badge variant="slate" dot>DEMO DATA</Badge>
        </div>
      </div>

      {/* Main Card View */}
      <div className="max-w-md w-full mx-auto my-8 bg-white text-slate-900 rounded-lg border border-slate-200 shadow-modal p-6 sm:p-8">
        <Outlet />
      </div>

      {/* Bottom Footer */}
      <div className="max-w-5xl w-full mx-auto text-center text-2xs font-mono text-slate-500 flex flex-wrap justify-between items-center gap-2 border-t border-slate-800 pt-3">
        <span>Team NexGen • Smart India Hackathon 2026</span>
        <span>Directorate of Technical Education (DoTE) Framework</span>
      </div>
    </div>
  );
};
