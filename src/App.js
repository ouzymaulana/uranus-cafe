import React, { useEffect, useState } from "react";
import "./css/style.css";
import Aside from "./layout/SidebarMenu/SidebarMenu";
import Header from "./layout/Header/Header";
import OrderComponent from "./layout/SidebarOrderlist/Index";
import Main from "./layout/Main/Main";
import "react-loading-skeleton/dist/skeleton.css";
import IndexComponent from "./components/__test__/IndexComponent";
import dataOrderMenu from "./helper";
import LoginComponent from "./pages/Login/Login";

function App() {
  const [showDashboard, setShowDashboar] = useState(false);

  const handleLogin = () => {
    setShowDashboar(false);
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  };

  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  return (
    <>
      {!showDashboard && <LoginComponent setShowDashboar={setShowDashboar} />}
      {showDashboard && (
        <IndexComponent
          setShowDashboar={setShowDashboar}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
  // const [menu, setMenu] = useState([]);
  // const [searchName, setSearchName] = useState("");
  // const [orderMenu, setOrderMenu] = useState([]);

  // useEffect(() => {
  //   const data = dataOrderMenu || [];
  //   setOrderMenu(data);
  // }, []);

  // return (
  //   <div className="container">
  //     <Header search={setSearchName} />
  //     <Aside />
  //     <OrderComponent
  //       orderMenu={orderMenu}
  //       menu={menu}
  //       setMenu={setMenu}
  //       setOrderMenu={setOrderMenu}
  //     />
  //     <Main
  //       // addOrderList={addOrderList}
  //       menu={menu}
  //       setMenu={setMenu}
  //       searchName={searchName}
  //       orderMenu={orderMenu}
  //       setOrderMenu={setOrderMenu}
  //     />
  //   </div>
  // );
}

export default App;
