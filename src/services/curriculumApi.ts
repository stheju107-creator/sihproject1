import { simulateNetworkDelay } from './api';
import { CURRICULUM_RECOMMENDATIONS, EMPLOYER_VALIDATION_REQUESTS } from '../data/demoData';
import { CurriculumRecommendation, EmployerValidationRequest } from '../types';

let recommendationsStore = [...CURRICULUM_RECOMMENDATIONS];
let validationsStore = [...EMPLOYER_VALIDATION_REQUESTS];

export const curriculumApi = {
  getRecommendations: async (filters?: { status?: string; domain?: string; search?: string }): Promise<CurriculumRecommendation[]> => {
    let result = [...recommendationsStore];
    if (filters?.status && filters.status !== 'All') {
      result = result.filter((r) => r.status === filters.status);
    }
    if (filters?.domain && filters.domain !== 'All') {
      result = result.filter((r) => r.domain === filters.domain);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.skillName.toLowerCase().includes(q) ||
          r.domain.toLowerCase().includes(q)
      );
    }
    return simulateNetworkDelay(result);
  },

  getRecommendationById: async (id: string): Promise<CurriculumRecommendation | undefined> => {
    const rec = recommendationsStore.find((r) => r.id === id);
    return simulateNetworkDelay(rec);
  },

  updateRecommendationStatus: async (
    id: string,
    status: 'PENDING' | 'APPROVED' | 'IN_REVIEW' | 'REJECTED'
  ): Promise<CurriculumRecommendation | undefined> => {
    const idx = recommendationsStore.findIndex((r) => r.id === id);
    if (idx !== -1) {
      recommendationsStore[idx] = { ...recommendationsStore[idx], status };
      return simulateNetworkDelay(recommendationsStore[idx]);
    }
    return simulateNetworkDelay(undefined);
  },

  getEmployerValidations: async (): Promise<EmployerValidationRequest[]> => {
    return simulateNetworkDelay(validationsStore);
  },

  getEmployerValidationById: async (id: string): Promise<EmployerValidationRequest | undefined> => {
    const item = validationsStore.find((v) => v.id === id);
    return simulateNetworkDelay(item);
  },

  submitEmployerFeedback: async (
    validationId: string,
    employerFeedback: { company: string; reviewer: string; role: string; status: 'AGREED' | 'PARTIALLY_AGREED' | 'DISAGREED'; comment: string }
  ): Promise<EmployerValidationRequest | undefined> => {
    const idx = validationsStore.findIndex((v) => v.id === validationId);
    if (idx !== -1) {
      const existing = validationsStore[idx];
      const newEmployerEntry = {
        id: `emp-new-${Date.now()}`,
        company: employerFeedback.company,
        reviewer: employerFeedback.reviewer,
        role: employerFeedback.role,
        status: employerFeedback.status,
        comment: employerFeedback.comment,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      
      const updatedEmployers = [...existing.employers, newEmployerEntry];
      const agreedCount = updatedEmployers.filter(e => e.status === 'AGREED').length;
      const agreementPct = Math.round((agreedCount / updatedEmployers.length) * 100);

      validationsStore[idx] = {
        ...existing,
        agreementPct,
        employers: updatedEmployers,
      };
      return simulateNetworkDelay(validationsStore[idx]);
    }
    return simulateNetworkDelay(undefined);
  },
};
