import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { Badge } from '../ui/Badge';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Cpu,
  Network,
  GitCompare,
  BookOpen,
  UserCheck,
  Server,
  MapPin,
  Compass,
  Radar,
  FileSpreadsheet,
  Settings,
  ShieldCheck,
  Layers,
} from 'lucide-react';

export interface SidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: null,
    },
    {
      label: 'Labour Intelligence',
      path: '/labour-intelligence',
      icon: <TrendingUp className="w-4 h-4" />,
      badge: '+18.4%',
      badgeVariant: 'teal' as const,
    },
    {
      label: 'Job Roles',
      path: '/job-roles',
      icon: <Briefcase className="w-4 h-4" />,
      badge: '148',
      badgeVariant: 'slate' as const,
    },
    {
      label: 'Skill Intelligence',
      path: '/skills',
      icon: <Cpu className="w-4 h-4" />,
      badge: '632',
      badgeVariant: 'teal' as const,
    },
    {
      label: 'Skill Graph',
      path: '/skill-graph',
      icon: <Network className="w-4 h-4" />,
      badge: 'Interactive',
      badgeVariant: 'blue' as const,
    },
    {
      label: 'Skill Gap Analysis',
      path: '/skill-gap-analysis',
      icon: <GitCompare className="w-4 h-4" />,
      badge: '3-Layer',
      badgeVariant: 'rose' as const,
    },
    {
      label: 'AI Curriculum Advisor',
      path: '/curriculum-advisor',
      icon: <BookOpen className="w-4 h-4" />,
      badge: 'XAI',
      badgeVariant: 'amber' as const,
    },
    {
      label: 'Employer Validation',
      path: '/employer-validation',
      icon: <UserCheck className="w-4 h-4" />,
      badge: '84%',
      badgeVariant: 'emerald' as const,
    },
    {
      label: 'Training Capacity',
      path: '/training-capacity',
      icon: <Server className="w-4 h-4" />,
      badge: 'Deficit',
      badgeVariant: 'rose' as const,
    },
    {
      label: 'District Planning',
      path: '/district-planning',
      icon: <MapPin className="w-4 h-4" />,
      badge: 'Heatmap',
      badgeVariant: 'amber' as const,
    },
    {
      label: 'Career Guidance',
      path: '/career-guidance',
      icon: <Compass className="w-4 h-4" />,
      badge: 'Active',
      badgeVariant: 'teal' as const,
    },
    {
      label: 'Emerging Tech Radar',
      path: '/emerging-tech',
      icon: <Radar className="w-4 h-4" />,
      badge: 'Signals',
      badgeVariant: 'blue' as const,
    },
    {
      label: 'Reports & Exports',
      path: '/reports',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      badge: null,
    },
    {
      label: 'System Settings',
      path: '/settings',
      icon: <Settings className="w-4 h-4" />,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 z-30 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={clsx(
          'w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-200 z-30 select-none shadow-xs',
          'fixed inset-y-14 left-0 lg:static lg:h-[calc(100vh-3.5rem)]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-56'
        )}
      >
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <div className="px-2 mb-2 text-2xs font-mono font-bold tracking-wider text-slate-400 uppercase">
            OPERATIONAL MODULES
          </div>

          <nav className="space-y-0.5" onClick={onCloseMobile}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-medium transition-colors group',
                    isActive
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={clsx(
                          'shrink-0 transition-colors',
                          isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-700'
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={clsx(
                          'ml-1 px-1.5 py-0.2 rounded text-2xs font-mono font-medium shrink-0',
                          isActive
                            ? 'bg-slate-800 text-teal-300'
                            : item.badgeVariant === 'teal'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200/60'
                            : item.badgeVariant === 'rose'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            : item.badgeVariant === 'amber'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            : item.badgeVariant === 'blue'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            : item.badgeVariant === 'emerald'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Core Pipeline Widget */}
        <div className="p-2.5 m-2 bg-slate-50 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-2xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              CORE PIPELINE
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">99.8%</span>
          </div>
          <p className="text-2xs text-slate-500 font-sans leading-tight">
            84 courses mapped against NSQF standards
          </p>
          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-1.5">
            <div className="bg-teal-600 h-full w-[99.8%]" />
          </div>
        </div>
      </aside>
    </>
  );
};
