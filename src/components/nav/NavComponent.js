import React, { useEffect, useRef, useState } from "react";
import OrderListComponent from "./OrderListComponent";
import LoadingOrderMenu from "./LoadingOrderMenu";

const NavComponent = ({
  time,
  data,
  searchData,
  searchOrderMenu,
  quantityValue,
  deleteItem,
  handleSubTotal,
  loadingStatus,
  subTotal,
  total,
  tax,
  totalPay,
  incrementQuantity,
  setSearchOrderMenu,
}) => {
  const currentData = searchData == "" ? data : searchData;
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef(null);
  function handleClearSearchValue() {
    setSearchValue("");
    inputRef.current.value = "";
  }

  function handleAddSearchValue(event) {
    const data = event.target.value;
    setSearchValue(data);
  }

  return (
    <nav>
      <div className="order-list-title">
        <p>Order List</p>
        <span>
          {time.toLocaleDateString("id-ID", { weekday: "long" })},{" "}
          {time.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          | {time.toLocaleTimeString("id-ID")}
        </span>
      </div>
      <div className="search-cart">
        <input
          ref={inputRef}
          type="text"
          name="search"
          placeholder="Search Something.."
          autoComplete="off"
          onChange={(event) => {
            searchOrderMenu(event.target.value);
            handleAddSearchValue(event);
            console.log(searchValue);
          }}
        />
        {searchValue && (
          <a
            onClick={() => {
              handleClearSearchValue();
            }}
          >
            <i className="fa-sharp fa-solid fa-xmark"></i>
          </a>
        )}
        <span className="fa fa-search"></span>
      </div>
      <div className="cart-content">
        {loadingStatus && searchData && <LoadingOrderMenu />}
        {!loadingStatus &&
          currentData.map((result, index) => (
            <OrderListComponent
              item={result}
              quantityValue={quantityValue}
              deleteItem={deleteItem}
              key={index}
              handleSubTotal={handleSubTotal}
              subTotal={subTotal}
              total={total}
              incrementQuantity={incrementQuantity}
            />
          ))}
      </div>
      <div className="subtotal-tax-total">
        <div className="subtotal">
          <p>Subtotal</p>
          <p>{total}</p>
        </div>
        <div className="tax">
          <p>10% Tax</p>
          <p>{tax.toLocaleString()}</p>
        </div>
        <div className="total">
          <p>Total</p>
          <p>{totalPay.toLocaleString()}</p>
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
