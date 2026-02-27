"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getTransactions } from "@/lib/transactions";
import type { BackendTransaction } from "@/types/api";

interface UseTransactionsReturn {
  transactions: BackendTransaction[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTransactions(): UseTransactionsReturn {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<BackendTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load transactions",
      );
      console.log("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { transactions, loading, error, refetch };
}
