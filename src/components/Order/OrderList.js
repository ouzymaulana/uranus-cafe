import React from "react";
import { useDataSearchOrderMenu } from "../../config/Context/DataSearchOrderMenuContextProvider";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";

const OrderListComponent = ({ item, subTotal, setNoResult, searchValue }) => {
  const { searchOrderMenu, setSearchOrderMenu } = useDataSearchOrderMenu();
  const { decrementQuantity, incrementQuantity, deleteOrderMenu } =
    useOrderMenu();

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
          <a
            onClick={() => {
              decrementQuantity(1, item.value.id);
            }}
          >
            <i className="fa-solid fa-minus"></i>
          </a>
        </div>

        <p>{subTotal(item).toLocaleString("id-ID")}</p>
        <span
          onClick={() =>
            deleteOrderMenu(
              item.value.id,
              setNoResult,
              searchValue,
              searchOrderMenu,
              setSearchOrderMenu
            )
          }
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
  );
};

export default OrderListComponent;
