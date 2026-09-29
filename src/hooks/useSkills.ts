import { useState, useEffect, useCallback } from 'react';
import { skillsApi } from '../services/skillsApi';
import { Skill, AcceleratingSkill, SkillGapItem } from '../types';

export function useSkills(filters?: { search?: string; category?: string; minDemand?: number }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [fastestSkills, setFastestSkills] = useState<AcceleratingSkill[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkillsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [sk, fast, gaps] = await Promise.all([
        skillsApi.getSkills(filters),
        skillsApi.getFastestAcceleratingSkills(),
        skillsApi.getSkillGapAnalysis(),
      ]);
      setSkills(sk);
      setFastestSkills(fast);
      setSkillGaps(gaps);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch skills data');
    } finally {
      setLoading(false);
    }
  }, [filters?.search, filters?.category, filters?.minDemand]);

  useEffect(() => {
    fetchSkillsData();
  }, [fetchSkillsData]);

  return {
    skills,
    fastestSkills,
    skillGaps,
    loading,
    error,
    refetch: fetchSkillsData,
  };
}
