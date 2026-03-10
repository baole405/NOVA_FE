import type {
  RevenuePeriod,
  StatsActivity,
  StatsOverview,
  StatsRevenue,
} from "@/types/stats";
import { fetchApi } from "./api-client";

export function getStatsOverview(): Promise<StatsOverview> {
  return fetchApi<StatsOverview>("/stats?type=overview");
}

export function getStatsRevenue(
  period: RevenuePeriod = "6-months",
): Promise<StatsRevenue> {
  return fetchApi<StatsRevenue>(`/stats?type=revenue&period=${period}`);
}

export function getStatsActivity(): Promise<StatsActivity> {
  return fetchApi<StatsActivity>("/stats?type=activity");
}
