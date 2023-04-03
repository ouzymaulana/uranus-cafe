import React, { useEffect, useState } from "react";
import "./../../css/style.css";
import Aside from "../../layout/SidebarMenu";
import Header from "../../layout/Header";
import OrderComponent from "../../layout/SidebarOrderlist/Index";
import Main from "../../layout/Main";
import "react-loading-skeleton/dist/skeleton.css";
import dataOrderMenu from "../../Helper/orderMenuLocalStorage";
import ProfilePage from "../Profile";
import WrapperMainOrProfile from "../../config/Wrapper/WrapperMainOrProfile";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";
import { useDataMenu } from "../../config/Context/DataMenuContextProvider";
import DataSearchOrderMenuContextProvider from "../../config/Context/DataSearchOrderMenuContextProvider";

function Index({ handleLogin }) {
  const [searchName, setSearchName] = useState("");
  const { setOrderMenu } = useOrderMenu();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const data = dataOrderMenu || [];
    setOrderMenu(data);
  }, []);

  // const withWrapper = (Component, showProfile) => {
  //   return () => {
  //     return !showProfile ? (
  //       <Main
  //         menu={menu}
  //         setMenu={setMenu}
  //         searchName={searchName}
  //         orderMenu={orderMenu}
  //         setOrderMenu={setOrderMenu}
  //       />
  //     ) : (
  //       <Component />
  //     );
  //   };
  // };

  // const WrapperMainOrProfileVariable = WrapperMainOrProfile(
  //   ProfilePage,
  //   showProfile,
  //   menu,
  //   setMenu,
  //   searchName,
  //   orderMenu,
  //   setOrderMenu
  // );
  const handleClickProfile = (value) => {
    setShowProfile(value);
  };

  return (
    <DataSearchOrderMenuContextProvider>
      <div className="container">
        <Header
          search={setSearchName}
          handleLogin={handleLogin}
          handleClickProfile={handleClickProfile}
        />
        <Aside />
        <OrderComponent />
        {/* <WrapperMainOrProfileVariable /> */}
        <Main searchName={searchName} />
      </div>
    </DataSearchOrderMenuContextProvider>
  );
}

export default Index;
