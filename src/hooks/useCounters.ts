import { useState, useEffect, useCallback } from "react";

export interface Counter {
  id: string;
  name: string;
  value: number;
}

const STORAGE_KEY = "tally-counters";

const loadCounters = (): Counter[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export function useCounters() {
  const [counters, setCounters] = useState<Counter[]>(loadCounters);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  }, [counters]);

  // Auto-select first counter if none selected
  useEffect(() => {
    if (!selectedId && counters.length > 0) {
      setSelectedId(counters[0].id);
    }
    if (selectedId && !counters.find((c) => c.id === selectedId)) {
      setSelectedId(counters.length > 0 ? counters[0].id : null);
    }
  }, [counters, selectedId]);

  const addCounter = useCallback((name: string) => {
    const newCounter: Counter = {
      id: crypto.randomUUID(),
      name: name || "Counter",
      value: 0,
    };
    setCounters((prev) => [...prev, newCounter]);
    setSelectedId(newCounter.id);
  }, []);

  const updateCounter = useCallback((id: string, updates: Partial<Pick<Counter, "name" | "value">>) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  const increment = useCallback((id: string) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: c.value + 1 } : c))
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: Math.max(0, c.value - 1) } : c))
    );
  }, []);

  const resetCounter = useCallback((id: string) => {
    updateCounter(id, { value: 0 });
  }, [updateCounter]);

  const deleteCounter = useCallback((id: string) => {
    setCounters((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    counters,
    selectedId,
    setSelectedId,
    addCounter,
    updateCounter,
    increment,
    decrement,
    resetCounter,
    deleteCounter,
  };
}
