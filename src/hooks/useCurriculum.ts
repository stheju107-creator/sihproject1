import { useState, useEffect, useCallback } from 'react';
import { curriculumApi } from '../services/curriculumApi';
import { CurriculumRecommendation, EmployerValidationRequest } from '../types';

export function useCurriculum(filters?: { status?: string; domain?: string; search?: string }) {
  const [recommendations, setRecommendations] = useState<CurriculumRecommendation[]>([]);
  const [validations, setValidations] = useState<EmployerValidationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurriculum = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [recs, vals] = await Promise.all([
        curriculumApi.getRecommendations(filters),
        curriculumApi.getEmployerValidations(),
      ]);
      setRecommendations(recs);
      setValidations(vals);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch curriculum recommendations');
    } finally {
      setLoading(false);
    }
  }, [filters?.status, filters?.domain, filters?.search]);

  useEffect(() => {
    fetchCurriculum();
  }, [fetchCurriculum]);

  const updateStatus = async (id: string, status: 'PENDING' | 'APPROVED' | 'IN_REVIEW' | 'REJECTED') => {
    const updated = await curriculumApi.updateRecommendationStatus(id, status);
    if (updated) {
      setRecommendations((prev) => prev.map((r) => (r.id === id ? updated : r)));
    }
    return updated;
  };

  const submitValidationFeedback = async (
    validationId: string,
    feedback: { company: string; reviewer: string; role: string; status: 'AGREED' | 'PARTIALLY_AGREED' | 'DISAGREED'; comment: string }
  ) => {
    const updated = await curriculumApi.submitEmployerFeedback(validationId, feedback);
    if (updated) {
      setValidations((prev) => prev.map((v) => (v.id === validationId ? updated : v)));
    }
    return updated;
  };

  return {
    recommendations,
    validations,
    loading,
    error,
    refetch: fetchCurriculum,
    updateStatus,
    submitValidationFeedback,
  };
}
