import React from "react";

const OrderListComponent = ({
  item,
  subTotal,
  menu,
  setMenu,
  orderMenu,
  setOrderMenu,
  searchOrderMenu,
  setSearchOrderMenu,
  setNoResult,
  searchValue,
}) => {
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

  const incrementQuantity = (value, id) => {
    const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));
    const checkStockMenu = orderMenu.find((result) => result.value.id === id);
    const currentValue = parseInt(value) + checkStockMenu.quantity;
    const menuStock = menu.find((item) => item.id === id).stock;

    if (menuStock > 0) {
      // if (newValue > 0) {
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
    // }
  };

  const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));
  const deleteOrderMenu = (value) => {
    const currentOrderMenu = orderMenu.filter(
      (result) => result.value.id !== value
    );

    if (currentOrderMenu == "") {
      localStorage.removeItem("orderMenu");
    } else {
      localStorage.setItem("orderMenu", JSON.stringify(currentOrderMenu));
    }
    setOrderMenu(currentOrderMenu);

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
  };

  return (
    <div className="cart">
      <p>{item.value.menu_name}</p>
      <div>
        <p>{item.value.price}</p>
        <div>
          <a
            onClick={() => {
              incrementQuantity(1, item.value.id);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </a>
          <span id="quantity">{item.quantity}</span>
          {/* <span id="quantity">{quantityValue[item.id]}</span> */}
          <a
            onClick={() => {
              decrementQuantity(1, item.value.id);
            }}
          >
            <i className="fa-solid fa-minus"></i>
          </a>
        </div>

        <p>{subTotal(item)}</p>
        {/* <p>{item.quantity * item.value.price}</p> */}
        <span onClick={() => deleteOrderMenu(item.value.id)}>
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
  );
};

export default OrderListComponent;
