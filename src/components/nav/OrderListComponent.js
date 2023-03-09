import React from "react";

const OrderListComponent = ({
  item,
  deleteItem,
  handleSubTotal,
  subTotal,
  quantityValue,
  incrementQuantity,
}) => {
  return (
    <div className="cart">
      <p>{item.menu_name}</p>
      <div>
        <p>{item.price}</p>
        {/* <input
          type="number"
          defaultValue={1}
          min={1}
          max={item.stock}
          onChange={(event) =>
            handleSubTotal(event.currentTarget.value, item.id)
          }
        /> */}

        <div>
          <a
            onClick={() => {
              incrementQuantity(1, item.id);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </a>
          <span id="quantity">{quantityValue[item.id]}</span>
          <a
            onClick={() => {
              handleSubTotal(1, item.id);
            }}
          >
            <i className="fa-solid fa-minus"></i>
          </a>
        </div>

        <p>{subTotal(item)}</p>
        <span onClick={() => deleteItem(item.id)}>
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
  );
};

export default OrderListComponent;
