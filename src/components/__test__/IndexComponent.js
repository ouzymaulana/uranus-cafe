import React, { useEffect, useState } from "react";
import "./../../css/style.css";
// import Aside from "./components/sidebarMenu/AsideComponent";
import Aside from "../../layout/SidebarMenu/SidebarMenu";
// import Header from "./components/header/HeaderComponent";
import Header from "../../layout/Header/Header";
// import OrderComponent from "./components/orderListComponent/OrderComponent.js";
import OrderComponent from "../../layout/SidebarOrderlist/Index";
// import Main from "./components/main/MainComponent";
import Main from "../../layout/Main/Main";
import "react-loading-skeleton/dist/skeleton.css";
import dataOrderMenu from "./../../helper";

function App({ handleLogin }) {
  const [menu, setMenu] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);

  useEffect(() => {
    const data = dataOrderMenu || [];
    setOrderMenu(data);
  }, []);

  return (
    <div className="container">
      <Header search={setSearchName} handleLogin={handleLogin} />
      <Aside />
      <OrderComponent
        orderMenu={orderMenu}
        menu={menu}
        setMenu={setMenu}
        setOrderMenu={setOrderMenu}
      />
      <Main
        // addOrderList={addOrderList}
        menu={menu}
        setMenu={setMenu}
        searchName={searchName}
        orderMenu={orderMenu}
        setOrderMenu={setOrderMenu}
      />
    </div>
  );
}

export default App;
