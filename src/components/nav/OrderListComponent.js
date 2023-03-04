import React from "react";

const OrderListComponent = ({ item, deleteItem, handleSubTotal }) => {
  return (
    <div className="cart">
      <p>{item.menu_name}</p>
      <div>
        <p>{item.price}</p>
        <input
          type="number"
          defaultValue={1}
          min={1}
          max={item.stock}
          onChange={(event) =>
            handleSubTotal(event.currentTarget.value, item.id)
          }
        />
        <p>260000</p>
        <span onClick={() => deleteItem(item.id)}>
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
  );
};

export default OrderListComponent;
