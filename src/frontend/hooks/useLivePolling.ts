import { useState, useEffect, useCallback, useRef } from 'react';

export function useLivePolling<T>(
  fetchFn: () => Promise<T>,
  intervalMs = 12000
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState<number>(0);

  const isMountedRef = useRef(true);

  const loadData = useCallback(async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const result = await fetchFn();
      if (isMountedRef.current) {
        setData(result);
        setError(null);
        setLastUpdated(new Date());
        setSecondsAgo(0);
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err.message || 'Failed to fetch operations data');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [fetchFn]);

  // Initial fetch and automatic polling interval
  useEffect(() => {
    isMountedRef.current = true;
    loadData();

    const pollInterval = setInterval(() => {
      loadData();
    }, intervalMs);

    // Counter timer for "Last updated: X seconds ago"
    const counterInterval = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);

    return () => {
      isMountedRef.current = false;
      clearInterval(pollInterval);
      clearInterval(counterInterval);
    };
  }, [loadData, intervalMs]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    secondsAgo,
    refetch: () => loadData(true)
  };
}
