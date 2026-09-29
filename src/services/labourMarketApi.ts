import { simulateNetworkDelay } from './api';
import {
  FEEDBACK_LOOP_DATA,
  KPI_GRID_DATA,
  DEMAND_OUTPUT_TIMESERIES,
  URGENT_ACTIONS,
  DISTRICT_HEATMAP_DATA,
  JOB_ROLES_DATA,
  EMERGING_TECH_RADAR_DATA,
  REPORTS_DATA,
  NOTIFICATIONS_DATA,
} from '../data/demoData';
import {
  FeedbackLoopItem,
  KPICardData,
  DemandOutputDataPoint,
  UrgentAction,
  DistrictDeficit,
  JobRole,
  EmergingTechItem,
  ReportItem,
  NotificationItem,
} from '../types';

export const labourMarketApi = {
  getFeedbackLoop: async (): Promise<FeedbackLoopItem[]> => {
    return simulateNetworkDelay(FEEDBACK_LOOP_DATA);
  },

  getKpis: async (): Promise<KPICardData[]> => {
    return simulateNetworkDelay(KPI_GRID_DATA);
  },

  getDemandOutputTimeSeries: async (sector = 'All Sectors'): Promise<DemandOutputDataPoint[]> => {
    const data = DEMAND_OUTPUT_TIMESERIES[sector] || DEMAND_OUTPUT_TIMESERIES['All Sectors'];
    return simulateNetworkDelay(data);
  },

  getUrgentActions: async (): Promise<UrgentAction[]> => {
    return simulateNetworkDelay(URGENT_ACTIONS);
  },

  getDistrictDeficits: async (): Promise<DistrictDeficit[]> => {
    return simulateNetworkDelay(DISTRICT_HEATMAP_DATA);
  },

  getDistrictById: async (id: string): Promise<DistrictDeficit | undefined> => {
    const district = DISTRICT_HEATMAP_DATA.find((d) => d.id === id);
    return simulateNetworkDelay(district);
  },

  getJobRoles: async (filters?: { search?: string; category?: string; demandLevel?: string }): Promise<JobRole[]> => {
    let result = [...JOB_ROLES_DATA];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.topSkills.some((s) => s.toLowerCase().includes(q)) ||
          r.locations.some((l) => l.toLowerCase().includes(q))
      );
    }
    if (filters?.category && filters.category !== 'All') {
      result = result.filter((r) => r.category === filters.category);
    }
    if (filters?.demandLevel && filters.demandLevel !== 'All') {
      result = result.filter((r) => r.demandLevel === filters.demandLevel);
    }
    return simulateNetworkDelay(result);
  },

  getJobRoleById: async (id: string): Promise<JobRole | undefined> => {
    const role = JOB_ROLES_DATA.find((r) => r.id === id);
    return simulateNetworkDelay(role);
  },

  getEmergingTechRadar: async (): Promise<EmergingTechItem[]> => {
    return simulateNetworkDelay(EMERGING_TECH_RADAR_DATA);
  },

  getReports: async (): Promise<ReportItem[]> => {
    return simulateNetworkDelay(REPORTS_DATA);
  },

  getNotifications: async (): Promise<NotificationItem[]> => {
    return simulateNetworkDelay(NOTIFICATIONS_DATA);
  },
};
