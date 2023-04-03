import React, { createContext, useContext, useState } from "react";

export const DataSearchOrderMenu = createContext();
export const useDataSearchOrderMenu = () => useContext(DataSearchOrderMenu);

const DataSearchOrderMenuContextProvider = ({ children }) => {
  const [searchOrderMenu, setSearchOrderMenu] = useState([]);
  return (
    <DataSearchOrderMenu.Provider
      value={{ searchOrderMenu, setSearchOrderMenu }}
    >
      {children}
    </DataSearchOrderMenu.Provider>
  );
};

export default DataSearchOrderMenuContextProvider;
