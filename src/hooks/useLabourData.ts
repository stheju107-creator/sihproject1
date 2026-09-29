import { useState, useEffect, useCallback } from 'react';
import { labourMarketApi } from '../services/labourMarketApi';
import {
  FeedbackLoopItem,
  KPICardData,
  DemandOutputDataPoint,
  UrgentAction,
  DistrictDeficit,
  JobRole,
} from '../types';

export function useLabourData(selectedSector = 'All Sectors') {
  const [feedbackLoop, setFeedbackLoop] = useState<FeedbackLoopItem[]>([]);
  const [kpis, setKpis] = useState<KPICardData[]>([]);
  const [timeSeries, setTimeSeries] = useState<DemandOutputDataPoint[]>([]);
  const [urgentActions, setUrgentActions] = useState<UrgentAction[]>([]);
  const [districts, setDistricts] = useState<DistrictDeficit[]>([]);
  const [roles, setRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [fb, kp, ts, ua, dist, rl] = await Promise.all([
        labourMarketApi.getFeedbackLoop(),
        labourMarketApi.getKpis(),
        labourMarketApi.getDemandOutputTimeSeries(selectedSector),
        labourMarketApi.getUrgentActions(),
        labourMarketApi.getDistrictDeficits(),
        labourMarketApi.getJobRoles(),
      ]);
      setFeedbackLoop(fb);
      setKpis(kp);
      setTimeSeries(ts);
      setUrgentActions(ua);
      setDistricts(dist);
      setRoles(rl);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch labour market data');
    } finally {
      setLoading(false);
    }
  }, [selectedSector]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    feedbackLoop,
    kpis,
    timeSeries,
    urgentActions,
    districts,
    roles,
    loading,
    error,
    refetch: fetchData,
  };
}
