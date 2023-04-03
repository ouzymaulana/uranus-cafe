import React, { createContext, useContext, useState } from "react";
import { useDataMenu } from "./DataMenuContextProvider";

export const OrderMenu = createContext({});
export const useOrderMenu = () => useContext(OrderMenu);
const OrderMenuContextProvider = ({ children }) => {
  const [orderMenu, setOrderMenu] = useState([]);
  const { menu, setMenu } = useDataMenu();

  const addOrderList = (value) => {
    if (value.stock > 0) {
      let checkOrderMenu;
      if (orderMenu) {
        checkOrderMenu = orderMenu.find(
          (dataOrderMenu) => dataOrderMenu.value.id === value.id
        );
      }
      if (!checkOrderMenu) {
        let newOrderMenu;
        if (orderMenu && Array.isArray(orderMenu)) {
          if (
            orderMenu === null ||
            !orderMenu.some((menu) => menu.id === value.id)
          ) {
            newOrderMenu = [
              ...orderMenu,
              {
                value,
                quantity: 1,
              },
            ];
          }
        } else {
          newOrderMenu = [{ value, quantity: 1 }];
        }

        localStorage.setItem("orderMenu", JSON.stringify(newOrderMenu));
        setOrderMenu(newOrderMenu);

        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id == value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );
      } else {
        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id === value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );

        if (orderMenu && Array.isArray(orderMenu)) {
          const setOrderMenuLocalStorage = orderMenu.map((orderMenu) => {
            return orderMenu.value.id === value.id
              ? { ...orderMenu, quantity: orderMenu.quantity + 1 }
              : orderMenu;
          });
          localStorage.setItem(
            "orderMenu",
            JSON.stringify(setOrderMenuLocalStorage)
          );
          setOrderMenu(setOrderMenuLocalStorage);
        }
      }
    } else {
      alert("maaf, pesanan tersebut sedang kosong");
    }
  };

  const incrementQuantity = (value, id) => {
    const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));
    const checkStockMenu = orderMenu.find((result) => result.value.id === id);
    const currentValue = parseInt(value) + checkStockMenu.quantity;
    const menuStock = menu.find((item) => item.id === id).stock;

    if (menuStock > 0) {
      if (orderMenu && Array.isArray(orderMenu)) {
        const setOrderMenuLocalStorage = orderMenu.map((orderMenu) => {
          return orderMenu.value.id === id
            ? { ...orderMenu, quantity: orderMenu.quantity + 1 }
            : orderMenu;
        });
        localStorage.setItem(
          "orderMenu",
          JSON.stringify(setOrderMenuLocalStorage)
        );
        setOrderMenu(setOrderMenuLocalStorage);
      }

      //* untuk perubahan stock ketika input berubah
      const newMenu = menu.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stock: item.stock + checkStockMenu.quantity - currentValue,
          };
        }
        return item;
      });
      setMenu(newMenu);
    } else {
      alert("maaf, stock habis");
    }
  };

  const decrementQuantity = (value, id) => {
    const checkStockMenu = orderMenu.find((result) => result.value.id === id);
    const newValue = checkStockMenu.quantity - parseInt(value);
    if (checkStockMenu.quantity > 1) {
      //pengurangan quantity
      if (orderMenu && Array.isArray(orderMenu)) {
        const setOrderMenuLocalStorage = orderMenu.map((orderMenu) => {
          return orderMenu.value.id === id
            ? { ...orderMenu, quantity: orderMenu.quantity - 1 }
            : orderMenu;
        });
        localStorage.setItem(
          "orderMenu",
          JSON.stringify(setOrderMenuLocalStorage)
        );
        setOrderMenu(setOrderMenuLocalStorage);
      }

      const newMenu = menu.map((item) => {
        //update stock
        if (item.id === id) {
          return {
            ...item,
            stock: item.stock + checkStockMenu.quantity - newValue,
          };
        }
        return item;
      });
      setMenu(newMenu);
    }
  };

  const deleteOrderMenu = (
    value,
    setNoResult,
    searchValue,
    searchOrderMenu,
    setSearchOrderMenu
  ) => {
    const currentOrderMenu = orderMenu.filter(
      (result) => result.value.id !== value
    );

    if (currentOrderMenu == "") {
      localStorage.removeItem("orderMenu");
    } else {
      localStorage.setItem("orderMenu", JSON.stringify(currentOrderMenu));
    }
    setOrderMenu(currentOrderMenu);

    if (searchOrderMenu) {
      const filteredData = searchOrderMenu.filter(
        (item) => item.value.id !== value
      );
      setSearchOrderMenu(filteredData);

      if (filteredData.length === 0 && searchValue) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }

      // * update stock menu ketika order list menu tersebut dihapus
      const checkStockMenu = orderMenu.find(
        (result) => result.value.id === value
      );
      const newMenu = menu.map((item) => {
        if (item.id === value) {
          return {
            ...item,
            stock: item.stock + checkStockMenu.quantity,
          };
        }
        return item;
      });
      setMenu(newMenu);
    }
  };
  return (
    <OrderMenu.Provider
      value={{
        orderMenu,
        setOrderMenu,
        addOrderList,
        decrementQuantity,
        incrementQuantity,
        deleteOrderMenu,
      }}
    >
      {children}
    </OrderMenu.Provider>
  );
};

export default OrderMenuContextProvider;
