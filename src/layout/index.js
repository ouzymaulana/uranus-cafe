import React, { useEffect, useState } from "react";
import HeaderComponent from "./Header";
import AsideComponent from "./SidebarMenu";
import DataSearchOrderMenuContextProvider from "../config/Context/DataSearchOrderMenuContextProvider";
import SearchMenuContextProvider from "../config/Context/SearchMenuContextProvider";
import { useOrderMenu } from "../config/Context/OrderMenuContextProvider";
import dataOrderMenu from "../Helper/orderMenuLocalStorage";

const Layout = ({ children, handleLogin }) => {
  const [searchName, setSearchName] = useState("");
  const { setOrderMenu } = useOrderMenu();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const data = dataOrderMenu || [];
    setOrderMenu(data);
  }, []);

  const handleClickProfile = (value) => {
    setShowProfile(value);
  };
  return (
    <div>
      <DataSearchOrderMenuContextProvider>
        <SearchMenuContextProvider>
          <div className="container">
            <HeaderComponent
              handleLogin={handleLogin}
              handleClickProfile={handleClickProfile}
            />
            <AsideComponent />

            <div>{children} </div>
          </div>
        </SearchMenuContextProvider>
      </DataSearchOrderMenuContextProvider>
    </div>
  );
};

export default Layout;
