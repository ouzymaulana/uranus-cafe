import React, { useEffect, useState } from "react";
import "./css/style.css";
import Aside from "./components/sidebarMenu/AsideComponent";
import Header from "./components/header/HeaderComponent";
import Nav from "./components/orderListComponent/OrderComponent.js";
import Main from "./components/main/MainComponent";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);

  const addOrderList = (value) => {
    if (value.stock > 0) {
      // const checkOrderMenu = orderMenu.find(
      //   (menuOrder) => menuOrder.id == value.id
      // );
      const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));
      let checkOrderMenu;
      if (getOrderMenu) {
        checkOrderMenu = getOrderMenu.find(
          (dataOrderMenu) => dataOrderMenu.value.id === value.id
        );
      }
      if (!checkOrderMenu) {
        // setOrderMenu([...orderMenu, value]);
        // const currentOrderMenu = [...orderMenu, value];
        const savedOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));

        let newOrderMenu;
        if (savedOrderMenu && Array.isArray(savedOrderMenu)) {
          if (
            savedOrderMenu === null ||
            !savedOrderMenu.some((menu) => menu.id === value.id)
          ) {
            newOrderMenu = [
              ...savedOrderMenu,
              {
                value,
                quantity: 1,
              },
            ];
            // newOrderMenu = [...savedOrderMenu, value];
            // console.log(newOrderMenu);
            // console.log("data bukan pertama kali");
          }
        } else {
          // newOrderMenu = [value];
          newOrderMenu = [{ value, quantity: 1 }];
          // console.log(newOrderMenu);
          // console.log("data pertama kali");
        }

        localStorage.setItem("orderMenu", JSON.stringify(newOrderMenu));
        // setOrderMenu(currentOrderMenu);

        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id == value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );

        // setOrderQuantity({
        //   ...orderQuantity,
        //   [value.id]: 1,
        // });
      } else {
        console.log("masuk kesini bro");
        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id === value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );

        // setOrderQuantity({
        //   ...orderQuantity,
        //   [value.id]: orderQuantity[value.id] + 1,
        // });

        if (getOrderMenu && Array.isArray(getOrderMenu)) {
          const setOrderMenuLocalStorage = getOrderMenu.map((orderMenu) => {
            return orderMenu.value.id === value.id
              ? { ...orderMenu, quantity: orderMenu.quantity + 1 }
              : orderMenu;
          });
          localStorage.setItem(
            "orderMenu",
            JSON.stringify(setOrderMenuLocalStorage)
          );
        }
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
