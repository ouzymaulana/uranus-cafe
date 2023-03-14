import React, { useEffect, useState } from "react";
import "./css/style.css";
import Aside from "./components/aside/AsideComponent";
import Header from "./components/header/HeaderComponent";
import Nav from "./components/nav/NavComponent.js";
import Main from "./components/main/MainComponent";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  // const [menu, setMenu] = useState(foodData);
  const [menu, setMenu] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);
  const [orderQuantity, setOrderQuantity] = useState([]);

  const addOrderList = (value) => {
    if (value.stock > 0) {
      const menuOrder = menu.find((menuOrder) => menuOrder.id == value.id);

      const checkOrderMenu = orderMenu.find(
        (menuOrder) => menuOrder.id == value.id
      );
      if (!checkOrderMenu) {
        setOrderMenu([...orderMenu, value]);

        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id == value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );

        setOrderQuantity({
          ...orderQuantity,
          [value.id]: 1,
        });
      } else {
        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id === value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );

        setOrderQuantity({
          ...orderQuantity,
          [value.id]: orderQuantity[value.id] + 1,
        });
      }
    } else {
      alert("maaf, pesanan tersebut sedang kosong");
    }
  };

  return (
    <div className="container">
      <Header search={setSearchName} />
      <Aside />
      <Nav
        orderMenu={orderMenu}
        quantityValue={orderQuantity}
        setOrderQuantity={setOrderQuantity}
        menu={menu}
        setMenu={setMenu}
        setOrderMenu={setOrderMenu}
      />
      <Main
        addOrderList={addOrderList}
        menu={menu}
        setMenu={setMenu}
        searchName={searchName}
      />
    </div>
  );
}

export default App;
