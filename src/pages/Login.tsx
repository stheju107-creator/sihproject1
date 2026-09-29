import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('arvind.raman@dte.state.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('District Planner');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Sign In to CAREERLINK
        </h2>
        <p className="text-2xs text-slate-500">
          Smart India Hackathon 2026 • PS-26134 (Team NexGen)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            Institutional Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-medium"
          >
            <option value="District Planner">District Planner (DoTE)</option>
            <option value="Curriculum Director">Curriculum Director (Syllabus Council)</option>
            <option value="Industry Evaluator">Industry Evaluator (Corporate Advisory)</option>
            <option value="State Admin">State Admin (Skill Dev Secretary)</option>
            <option value="Student / Trainee">Student / Trainee (Polytechnic)</option>
          </select>
        </div>

        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            Government / Institutional Email
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 font-mono"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="teal"
            size="md"
            loading={loading}
            className="w-full justify-center"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Access Intelligence Platform
          </Button>
        </div>
      </form>

      <div className="pt-3 border-t border-slate-100 text-center text-2xs text-slate-500">
        Don't have an institutional credential?{' '}
        <Link to="/register" className="text-teal-700 font-bold hover:underline">
          Register Institutional Seat
        </Link>
      </div>
    </div>
  );
};
