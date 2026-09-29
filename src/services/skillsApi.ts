import { simulateNetworkDelay } from './api';
import { SKILLS_DATA, FASTEST_ACCELERATING_SKILLS, SKILL_GAP_ANALYSIS_DATA } from '../data/demoData';
import { Skill, AcceleratingSkill, SkillGapItem } from '../types';

export const skillsApi = {
  getSkills: async (filters?: { search?: string; category?: string; minDemand?: number }): Promise<Skill[]> => {
    let result = [...SKILLS_DATA];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.relatedSkills.some((rs) => rs.toLowerCase().includes(q))
      );
    }
    if (filters?.category && filters.category !== 'All') {
      result = result.filter((s) => s.category === filters.category);
    }
    if (filters?.minDemand) {
      result = result.filter((s) => s.demandPct >= (filters.minDemand || 0));
    }
    return simulateNetworkDelay(result);
  },

  getSkillById: async (id: string): Promise<Skill | undefined> => {
    const skill = SKILLS_DATA.find((s) => s.id === id);
    return simulateNetworkDelay(skill);
  },

  getFastestAcceleratingSkills: async (): Promise<AcceleratingSkill[]> => {
    return simulateNetworkDelay(FASTEST_ACCELERATING_SKILLS);
  },

  getSkillGapAnalysis: async (filters?: { roleId?: string; severity?: string; search?: string }): Promise<SkillGapItem[]> => {
    let result = [...SKILL_GAP_ANALYSIS_DATA];
    if (filters?.roleId && filters.roleId !== 'All') {
      result = result.filter((item) => item.roleId === filters.roleId);
    }
    if (filters?.severity && filters.severity !== 'All') {
      result = result.filter((item) => item.severity === filters.severity);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.skillName.toLowerCase().includes(q) ||
          item.roleName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    return simulateNetworkDelay(result);
  },
};
