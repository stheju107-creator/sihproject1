import { simulateNetworkDelay } from './api';
import { CAREER_PATHWAYS_DATA } from '../data/demoData';
import { CareerPathway } from '../types';

export const careerApi = {
  getCareerPathways: async (filters?: { search?: string; domain?: string }): Promise<CareerPathway[]> => {
    let result = [...CAREER_PATHWAYS_DATA];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.domain.toLowerCase().includes(q) ||
          p.acquiredSkills.some((s) => s.toLowerCase().includes(q)) ||
          p.missingSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (filters?.domain && filters.domain !== 'All') {
      result = result.filter((p) => p.domain === filters.domain);
    }
    return simulateNetworkDelay(result);
  },

  getCareerPathwayById: async (id: string): Promise<CareerPathway | undefined> => {
    const pathway = CAREER_PATHWAYS_DATA.find((p) => p.id === id);
    return simulateNetworkDelay(pathway);
  },

  analyzeStudentProfile: async (profile: {
    education: string;
    skills: string[];
    interests: string;
    location: string;
  }): Promise<CareerPathway[]> => {
    // Dynamic matching calculation based on input skills
    const evaluated = CAREER_PATHWAYS_DATA.map((path) => {
      let matchedCount = 0;
      profile.skills.forEach((skill) => {
        if (
          path.acquiredSkills.some((s) => s.toLowerCase().includes(skill.toLowerCase())) ||
          path.title.toLowerCase().includes(skill.toLowerCase())
        ) {
          matchedCount++;
        }
      });
      const dynamicMatch = Math.min(96, Math.max(55, path.matchPct + (matchedCount > 0 ? 5 : -5)));
      return {
        ...path,
        matchPct: dynamicMatch,
      };
    });

    evaluated.sort((a, b) => b.matchPct - a.matchPct);
    return simulateNetworkDelay(evaluated, 400);
  },
};
