import type { StatsActivity, StatsOverview, StatsRevenue } from "@/types/stats";
import { fetchApi } from "./api-client";

export async function getStatsOverview(): Promise<StatsOverview> {
  return fetchApi<StatsOverview>("/stats?type=overview");
}

export async function getStatsRevenue(
  period?: string,
): Promise<StatsRevenue> {
  const qs = period ? `&period=${period}` : "";
  return fetchApi<StatsRevenue>(`/stats?type=revenue${qs}`);
}

export async function getStatsActivity(): Promise<StatsActivity> {
  return fetchApi<StatsActivity>("/stats?type=activity");
}
