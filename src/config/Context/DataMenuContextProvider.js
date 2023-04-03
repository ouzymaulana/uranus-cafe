import React, { createContext, useContext, useState } from "react";

export const DataMenu = createContext();
export const useDataMenu = () => useContext(DataMenu);
const DataMenuContextProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  return (
    <DataMenu.Provider value={{ menu, setMenu }}>{children}</DataMenu.Provider>
  );
};

export default DataMenuContextProvider;
