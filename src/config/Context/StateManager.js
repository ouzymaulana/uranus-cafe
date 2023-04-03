import React, { useState, createContext, useContext } from "react";

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);
const StateManager = ({ children }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  return (
    <ThemeContext.Provider value={{ showDashboard, setShowDashboard }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default StateManager;
