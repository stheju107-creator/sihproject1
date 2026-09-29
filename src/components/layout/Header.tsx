import React, { useState } from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { UserRole, UserProfile } from '../../types';
import { DEMO_USER_PROFILES } from '../../data/demoData';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Layers,
  Cpu,
  UserCheck,
  Building,
  GraduationCap,
  Shield,
  Command,
} from 'lucide-react';

export interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onToggleSidebar,
  isSidebarOpen,
  unreadNotificationsCount = 3,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const currentUser: UserProfile = DEMO_USER_PROFILES[currentRole] || DEMO_USER_PROFILES['District Planner'];

  const roleOptions: { role: UserRole; icon: React.ReactNode; label: string }[] = [
    { role: 'District Planner', icon: <Building className="w-3.5 h-3.5 text-blue-600" />, label: 'District Planner' },
    { role: 'Curriculum Director', icon: <Layers className="w-3.5 h-3.5 text-teal-600" />, label: 'Curriculum Director' },
    { role: 'Industry Evaluator', icon: <UserCheck className="w-3.5 h-3.5 text-amber-600" />, label: 'Industry Evaluator' },
    { role: 'State Admin', icon: <Shield className="w-3.5 h-3.5 text-rose-600" />, label: 'State Admin' },
    { role: 'Student / Trainee', icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />, label: 'Student / Trainee' },
  ];

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/skills?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-3 md:px-4 flex items-center justify-between sticky top-0 z-40 select-none shadow-xs">
      {/* Left: Brand + Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-slate-600 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Toggle navigation sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center text-teal-400 font-mono font-bold shadow-xs">
            CL
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
                CAREERLINK
              </span>
            </div>
            <span className="text-2xs font-mono font-semibold tracking-wider text-slate-500 block uppercase">
              LABOUR-MARKET INTELLIGENCE
            </span>
          </div>
        </div>
      </div>

      {/* Center: SIH 2026 Badges + System Title (Hidden on small mobile) */}
      <div className="hidden lg:flex items-center gap-2 font-mono text-2xs">
        <span className="text-slate-700 font-bold tracking-tight">
          LMI & CURRICULUM INTELLIGENCE
        </span>
        <span className="text-slate-300">•</span>
        <Badge variant="navy">SIH 2026 PS-26134</Badge>
        <Badge variant="teal">Team NexGen</Badge>
        <Badge variant="slate" dot>DEMO DATA</Badge>
      </div>

      {/* Right: Search, Notifications, Role Selector, User Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Global Search Bar */}
        <form onSubmit={handleGlobalSearch} className="relative hidden md:block w-44 lg:w-56">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, roles, dist..."
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 font-sans shadow-xs transition-all"
          />
        </form>

        {/* Notifications Icon Button */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative text-slate-600 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            title="Switch demo persona perspective"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="font-medium text-2xs font-mono">{currentRole}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isRoleDropdownOpen && (
            <div
              className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-md shadow-elevated py-1 z-50 text-xs animate-in fade-in duration-100"
              onClick={() => setIsRoleDropdownOpen(false)}
            >
              <div className="px-3 py-1.5 border-b border-slate-100 text-2xs font-mono text-slate-400 uppercase">
                Switch Role Persona
              </div>
              {roleOptions.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => onRoleChange(opt.role)}
                  className={clsx(
                    'w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-50 transition-colors text-xs',
                    currentRole === opt.role ? 'bg-teal-50/60 font-semibold text-teal-900' : 'text-slate-700'
                  )}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div
          onClick={() => navigate('/settings')}
          className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center font-mono border border-teal-200">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)}
          </div>
          <div className="leading-tight text-left">
            <span className="text-xs font-semibold text-slate-800 block truncate max-w-[120px]">
              {currentUser.name}
            </span>
            <span className="text-2xs font-mono text-slate-400 block truncate max-w-[120px]">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
