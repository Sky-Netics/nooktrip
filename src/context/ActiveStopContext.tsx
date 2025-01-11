"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo, memo } from 'react';

type ActiveStopContextType = {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
};

const ActiveStopContext = createContext<ActiveStopContextType>({
  activeIndex: null,
  setActiveIndex: () => {},
});

// Memoize the provider component
const ActiveStopProvider = memo(function ActiveStopProvider({ 
  children 
}: { 
  children: ReactNode 
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Memoize the setActiveIndex function
  const handleSetActiveIndex = useCallback((index: number | null) => {
    setActiveIndex(index);
  }, []);

  // Memoize the context value
  const contextValue = useMemo(() => ({
    activeIndex,
    setActiveIndex: handleSetActiveIndex
  }), [activeIndex, handleSetActiveIndex]);

  return (
    <ActiveStopContext.Provider value={contextValue}>
      {children}
    </ActiveStopContext.Provider>
  );
});

// Add display name for better debugging
ActiveStopProvider.displayName = 'ActiveStopProvider';

// Custom hook for consuming the context
function useActiveStop() {
  const context = useContext(ActiveStopContext);
  if (context === undefined) {
    throw new Error('useActiveStop must be used within an ActiveStopProvider');
  }
  return context;
}

export { ActiveStopProvider, useActiveStop };
