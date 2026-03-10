export interface BackendFeeType {
  id: number;
  name: string;
  description: string | null;
  unitPrice: string | null;
  measureUnit: string | null;
  isRecurring: boolean | null;
}

export interface CreateFeeTypePayload {
  name: string;
  description?: string;
  unitPrice: string;
  measureUnit?: string;
  isRecurring?: boolean;
}

export type UpdateFeeTypePayload = Partial<CreateFeeTypePayload>;
