import React, { createContext, useContext, useState } from "react";

export const TotalPayValue = createContext();
export const useTotalPayValue = () => useContext(TotalPayValue);
const TotalPayContextProvider = ({ children }) => {
  const [totalPay, setTotalPay] = useState(0);
  return (
    <TotalPayValue.Provider value={{ totalPay, setTotalPay }}>
      {children}
    </TotalPayValue.Provider>
  );
};

export default TotalPayContextProvider;
