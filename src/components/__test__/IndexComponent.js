import React, { useEffect, useState } from "react";
import "./../../css/style.css";
import Aside from "../../layout/SidebarMenu";
import Header from "../../layout/Header";
import OrderComponent from "../../layout/SidebarOrderlist/Index";
import Main from "../../layout/Main";
import "react-loading-skeleton/dist/skeleton.css";
import dataOrderMenu from "./../../helper";
import ProfilePage from "./../../pages/Profile";

function App({ handleLogin }) {
  const [menu, setMenu] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const data = dataOrderMenu || [];
    setOrderMenu(data);
  }, []);

  const withWrapper = (Component, showProfile) => {
    return () => {
      return !showProfile ? (
        <Main
          menu={menu}
          setMenu={setMenu}
          searchName={searchName}
          orderMenu={orderMenu}
          setOrderMenu={setOrderMenu}
        />
      ) : (
        <Component />
      );
    };
  };

  const WrappedComponent = withWrapper(ProfilePage, showProfile);
  const handleClickProfile = (value) => {
    setShowProfile(value);
  };

  return (
    <div className="container">
      <Header
        search={setSearchName}
        handleLogin={handleLogin}
        handleClickProfile={handleClickProfile}
      />
      <Aside />
      <OrderComponent
        orderMenu={orderMenu}
        menu={menu}
        setMenu={setMenu}
        setOrderMenu={setOrderMenu}
      />
      {/* <WrappedComponent /> */}
      {/* <Main
        // addOrderList={addOrderList}
        menu={menu}
        setMenu={setMenu}
        searchName={searchName}
        orderMenu={orderMenu}
        setOrderMenu={setOrderMenu}
      /> */}
      {!showProfile ? (
        <Main
          menu={menu}
          setMenu={setMenu}
          searchName={searchName}
          orderMenu={orderMenu}
          setOrderMenu={setOrderMenu}
        />
      ) : (
        <ProfilePage />
      )}
    </div>
  );
}

export default App;
