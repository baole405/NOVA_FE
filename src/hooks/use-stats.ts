"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  getStatsActivity,
  getStatsOverview,
  getStatsRevenue,
} from "@/lib/stats";
import type {
  RevenuePeriod,
  StatsActivity,
  StatsOverview,
  StatsRevenue,
} from "@/types/stats";

interface UseStatsReturn {
  overview: StatsOverview | null;
  revenue: StatsRevenue | null;
  activity: StatsActivity | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setRevenuePeriod: (period: RevenuePeriod) => void;
}

export function useStats(): UseStatsReturn {
  const { user } = useAuth();
  const [overview, setOverview] = useState<StatsOverview | null>(null);
  const [revenue, setRevenue] = useState<StatsRevenue | null>(null);
  const [activity, setActivity] = useState<StatsActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revenuePeriod, setRevenuePeriod] = useState<RevenuePeriod>("6-months");

  const refetch = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const [overviewData, revenueData, activityData] = await Promise.all([
        getStatsOverview(),
        getStatsRevenue(revenuePeriod),
        getStatsActivity(),
      ]);
      setOverview(overviewData);
      setRevenue(revenueData);
      setActivity(activityData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stats");
      console.log("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  }, [user, revenuePeriod]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    overview,
    revenue,
    activity,
    loading,
    error,
    refetch,
    setRevenuePeriod,
  };
}
