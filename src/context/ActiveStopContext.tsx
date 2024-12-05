"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type ActiveStopContextType = {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
};

const ActiveStopContext = createContext<ActiveStopContextType>({
  activeIndex: null,
  setActiveIndex: () => {},
});

export function ActiveStopProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ActiveStopContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </ActiveStopContext.Provider>
  );
}

export function useActiveStop() {
  return useContext(ActiveStopContext);
}
