import React, { useEffect, useState } from "react";
import OrderListComponent from "./OrderListComponent";

const NavComponent = ({ data, deleteItem, handleQuantity, subTotal }) => {
  return (
    <nav>
      <div className="order-list-title">
        <p>Order List</p>
        <span>Tuesday, Feb 28, 2023 | 09:30:23</span>
      </div>
      <div className="search-cart">
        <input
          type="text"
          name="search"
          placeholder="Search Something.."
          autoComplete="off"
        />
        <span className="fa fa-search"></span>
      </div>
      <div className="cart-content">
        {data.map((result, index) => (
          <OrderListComponent
            item={result}
            deleteItem={deleteItem}
            key={index}
            handleQuantity={handleQuantity}
            subTotal={subTotal}
          />
        ))}
      </div>
      <div className="subtotal-tax-total">
        <div className="subtotal">
          <p>Subtotal</p>
          <p>74.000</p>
        </div>
        <div className="tax">
          <p>10% Tax</p>
          <p>74.000</p>
        </div>
        <div className="total">
          <p>Total</p>
          <p>74.000</p>
        </div>
      </div>
      <div className="cart-button">
        <a href="">
          <i className="fa-regular fa-floppy-disk fa-xl"></i>
        </a>
        <a href="">
          <i className="fa-regular fa-file fa-xl"></i>
        </a>
        <a href="">
          PAY <i className="fa-solid fa-arrow-right fa-xl"></i>
        </a>
      </div>
    </nav>
  );
};

export default NavComponent;
