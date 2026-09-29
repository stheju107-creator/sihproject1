import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Building, Mail, User } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('Dr. Arvind Raman');
  const [email, setEmail] = useState('arvind.raman@dte.state.gov.in');
  const [org, setOrg] = useState('Directorate of Technical Education');
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
          Register Institutional Seat
        </h2>
        <p className="text-2xs text-slate-500">
          State Directorate of Technical Education Access Gateway
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            Full Name & Title
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
            required
          />
        </div>

        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            Institutional Organization
          </label>
          <input
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900"
            required
          />
        </div>

        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            Designated Persona Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-medium"
          >
            <option value="District Planner">District Planner</option>
            <option value="Curriculum Director">Curriculum Director</option>
            <option value="Industry Evaluator">Industry Evaluator</option>
            <option value="State Admin">State Admin</option>
            <option value="Student / Trainee">Student / Trainee</option>
          </select>
        </div>

        <div>
          <label className="text-2xs font-mono uppercase text-slate-500 font-bold block mb-1">
            Official Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
            required
          />
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
            Submit for State Authorization
          </Button>
        </div>
      </form>

      <div className="pt-3 border-t border-slate-100 text-center text-2xs text-slate-500">
        Already registered?{' '}
        <Link to="/login" className="text-teal-700 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
