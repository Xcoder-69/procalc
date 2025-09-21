'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Calculation } from '@/lib/types';

// The history item will not have the full Calculation type from firestore
// It will be a simpler object for session storage
type HistoryItem = Omit<Calculation, 'id' | 'userId' | 'createdAt'>;

interface HistoryContextType {
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addHistory = (item: HistoryItem) => {
    setHistory(prevHistory => [item, ...prevHistory]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const value: HistoryContextType = {
    history,
    addHistory,
    clearHistory,
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
