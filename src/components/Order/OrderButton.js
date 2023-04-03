import React from "react";
import { useDataMenu } from "../../config/Context/DataMenuContextProvider";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";
import { useTotalPayValue } from "../../config/Context/TotalPayContextProvider";

const ButtonCartComponent = () => {
  const { menu, setMenu } = useDataMenu();
  const { orderMenu, setOrderMenu } = useOrderMenu();
  const { totalPay } = useTotalPayValue();

  const HandleCheckOutMenu = (e) => {
    e.preventDefault();

    if (orderMenu !== "") {
      const soldDataMenu = JSON.parse(localStorage.getItem("soldMenu"));
      const transactionTotal = JSON.parse(
        localStorage.getItem("TransactionTotal")
      );
      let newSoldDataMenu;
      let newTransactionTotal;
      if (soldDataMenu === null) {
        newSoldDataMenu = [...orderMenu];
        newTransactionTotal = totalPay;
      } else {
        newSoldDataMenu = soldDataMenu.map((itemSoldData) => {
          const orderMenuItem = orderMenu.find(
            (itemOrderMenu) => itemOrderMenu.value.id == itemSoldData.value.id
          );

          if (!orderMenuItem) return itemSoldData;
          return {
            ...itemSoldData,
            quantity: itemSoldData.quantity + orderMenuItem.quantity,
          };
        });

        newSoldDataMenu = [...newSoldDataMenu, ...orderMenu];
        newTransactionTotal = transactionTotal + totalPay;
      }
      localStorage.setItem("soldMenu", JSON.stringify(newSoldDataMenu));
      localStorage.setItem(
        "TransactionTotal",
        JSON.stringify(newTransactionTotal)
      );

      const newDataMenu = menu.map((itemMenu) => {
        const orderMenuItem = orderMenu.find(
          (itemOrderMenu) => itemOrderMenu.value.id == itemMenu.id
        );
        if (orderMenuItem) {
          return {
            ...itemMenu,
            stock: itemMenu.stock - orderMenuItem.quantity,
            stock: itemMenu.stock,
          };
        } else {
          return itemMenu;
        }
      });

      setMenu(newDataMenu);
      localStorage.removeItem("orderMenu");
      setOrderMenu([]);
    }
  };

  return (
    <div className="cart-button">
      <a href="">
        <i className="fa-regular fa-floppy-disk fa-xl"></i>
      </a>
      <a href="">
        <i className="fa-regular fa-file fa-xl"></i>
      </a>
      <a href="" onClick={HandleCheckOutMenu}>
        <div>
          <span>PAY</span> <i className="fa-solid fa-arrow-right fa-2xl"></i>
        </div>
      </a>
    </div>
  );
};

export default ButtonCartComponent;
