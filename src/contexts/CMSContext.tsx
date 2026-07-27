'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CMSContextType, CMSContent } from '@/types';
import { initialCMSContent } from '@/data/cms';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<CMSContent>(initialCMSContent);

  const setContent = useCallback((value: CMSContent | ((prev: CMSContent) => CMSContent)) => {
    if (typeof value === 'function') {
      setContentState(value);
    } else {
      setContentState(value);
    }
  }, []);

  return (
    <CMSContext.Provider value={{ content, setContent }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS(): CMSContextType {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
