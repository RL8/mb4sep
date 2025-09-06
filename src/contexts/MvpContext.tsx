'use client';

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { getAllSections } from '@/data/app-specification';

interface MvpContextType {
  mvpIncluded: Record<string, boolean>;
  setMvpIncluded: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  toggleMvp: (sectionId: string, checked: boolean) => void;
  mvpCount: number;
  allSectionsCount: number;
}

const MvpContext = createContext<MvpContextType | undefined>(undefined);

export function MvpProvider({ children }: { children: ReactNode }) {
  // Initialize MVP state from data using useMemo to avoid re-initialization
  const initialMvpState = useMemo(() => {
    const allSections = getAllSections();
    const state: Record<string, boolean> = {};
    allSections.forEach(section => {
      state[section.id] = section.mvpIncluded || false;
    });
    return state;
  }, []);

  const [mvpIncluded, setMvpIncluded] = useState<Record<string, boolean>>(initialMvpState);

  const toggleMvp = (sectionId: string, checked: boolean) => {
    setMvpIncluded(prev => ({
      ...prev,
      [sectionId]: checked
    }));
  };

  const allSections = getAllSections();
  const mvpCount = allSections.filter(s => mvpIncluded[s.id] || s.mvpIncluded).length;
  const allSectionsCount = allSections.length;

  return (
    <MvpContext.Provider value={{
      mvpIncluded,
      setMvpIncluded,
      toggleMvp,
      mvpCount,
      allSectionsCount
    }}>
      {children}
    </MvpContext.Provider>
  );
}

export function useMvp() {
  const context = useContext(MvpContext);
  if (context === undefined) {
    throw new Error('useMvp must be used within a MvpProvider');
  }
  return context;
}
