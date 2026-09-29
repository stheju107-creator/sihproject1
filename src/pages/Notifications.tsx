import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATIONS_DATA } from '../data/demoData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Bell,
  CheckCheck,
  ArrowRight,
  BookOpen,
  UserCheck,
  TrendingUp,
  MapPin,
  Radar,
} from 'lucide-react';
import { NotificationItem } from '../types';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Alerts' },
    { id: 'CURRICULUM', label: 'Curriculum' },
    { id: 'EMPLOYER', label: 'Employer Quorum' },
    { id: 'DEMAND', label: 'Labour Demand' },
    { id: 'DISTRICT', label: 'District Deficit' },
    { id: 'TECH', label: 'Tech Radar' },
  ];

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter(
    (n) => selectedCategory === 'ALL' || n.category === selectedCategory
  );

  const getIcon = (category: string) => {
    switch (category) {
      case 'CURRICULUM':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'EMPLOYER':
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'DEMAND':
        return <TrendingUp className="w-4 h-4 text-teal-600" />;
      case 'DISTRICT':
        return <MapPin className="w-4 h-4 text-rose-600" />;
      case 'TECH':
        return <Radar className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-4 pb-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              SYSTEM INTELLIGENCE ALERTS & NOTIFICATIONS
            </h1>
            <Badge variant="rose">REAL-TIME TELEMETRY</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Event-driven triggers from labour crawl, curriculum engine, and employer validation quorum
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="xs"
            onClick={handleMarkAllRead}
            icon={<CheckCheck className="w-3.5 h-3.5" />}
          >
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-xs overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1 rounded text-2xs font-mono font-medium border transition-colors ${
              selectedCategory === c.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => notif.link && navigate(notif.link)}
            className={`p-3.5 rounded-md border transition-all cursor-pointer flex items-start gap-3 text-xs ${
              notif.read
                ? 'bg-white border-slate-200 opacity-80 hover:opacity-100'
                : 'bg-white border-teal-300 ring-1 ring-teal-500/20 shadow-xs'
            }`}
          >
            <div className="p-2 rounded bg-slate-50 border border-slate-200 shrink-0 mt-0.5">
              {getIcon(notif.category)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{notif.title}</span>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  )}
                </div>
                <span className="text-2xs font-mono text-slate-400 shrink-0">
                  {notif.timestamp}
                </span>
              </div>

              <p className="text-2xs text-slate-600 font-sans leading-relaxed">
                {notif.description}
              </p>

              {notif.badge && (
                <div className="pt-1 flex items-center justify-between">
                  <Badge variant="teal">{notif.badge}</Badge>
                  {notif.link && (
                    <span className="text-2xs font-mono text-teal-700 font-semibold hover:underline flex items-center gap-1">
                      Navigate to Module <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
