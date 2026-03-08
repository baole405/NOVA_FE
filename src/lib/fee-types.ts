import type {
  BackendFeeType,
  CreateFeeTypePayload,
  UpdateFeeTypePayload,
} from "@/types/fee-types";
import { fetchApi } from "./api-client";

export async function getFeeTypes(): Promise<BackendFeeType[]> {
  return fetchApi<BackendFeeType[]>("/fee-types");
}

export async function createFeeType(
  payload: CreateFeeTypePayload,
): Promise<BackendFeeType> {
  return fetchApi<BackendFeeType>("/fee-types", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateFeeType(
  id: number,
  payload: UpdateFeeTypePayload,
): Promise<BackendFeeType> {
  return fetchApi<BackendFeeType>(`/fee-types/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteFeeType(id: number): Promise<void> {
  return fetchApi<void>(`/fee-types/${id}`, {
    method: "DELETE",
  });
}
