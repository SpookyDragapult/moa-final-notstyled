import React, { createContext, useState, useContext } from 'react';

// Buat context untuk navigasi
export const NavigationContext = createContext();

// Provider component
export const NavigationProvider = ({ children }) => {
  const [previousPath, setPreviousPath] = useState(null);

  const updatePreviousPath = (path) => {
    setPreviousPath(path);
  };

  return (
    <NavigationContext.Provider value={{ 
      previousPath, 
      updatePreviousPath 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};