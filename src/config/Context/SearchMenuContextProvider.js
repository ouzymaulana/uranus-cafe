import React, { createContext, useContext, useState } from "react";

export const SearchMenu = createContext();
export const useSearchMenu = () => useContext(SearchMenu);
const SearchMenuContextProvider = ({ children }) => {
  const [searchName, setSearchName] = useState("");
  return (
    <SearchMenu.Provider value={{ searchName, setSearchName }}>
      {children}
    </SearchMenu.Provider>
  );
};

export default SearchMenuContextProvider;
