import { useState, useEffect, useCallback } from 'react';
import { careerApi } from '../services/careerApi';
import { CareerPathway } from '../types';

export function useCareerGuidance(initialDomain = 'All') {
  const [pathways, setPathways] = useState<CareerPathway[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPathways = useCallback(async (domain = initialDomain) => {
    try {
      setLoading(true);
      setError(null);
      const res = await careerApi.getCareerPathways({ domain });
      setPathways(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch career pathways');
    } finally {
      setLoading(false);
    }
  }, [initialDomain]);

  useEffect(() => {
    fetchPathways();
  }, [fetchPathways]);

  const analyzeProfile = async (profile: {
    education: string;
    skills: string[];
    interests: string;
    location: string;
  }) => {
    try {
      setAnalyzing(true);
      const res = await careerApi.analyzeStudentProfile(profile);
      setPathways(res);
      return res;
    } finally {
      setAnalyzing(false);
    }
  };

  return {
    pathways,
    loading,
    analyzing,
    error,
    refetch: fetchPathways,
    analyzeProfile,
  };
}
