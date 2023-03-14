import React, { useEffect, useRef, useState } from "react";
import OrderListComponent from "./OrderListComponent";
import LoadingOrderMenu from "./LoadingOrderMenu";
import HeaderOrderListComponent from "./HeaderOrderListComponent";
import SearchOrderListComponent from "./SearchOrderListComponent";
import ButtonCartComponent from "./ButtonCartComponent";

const NavComponent = ({
  orderMenu,
  quantityValue,
  setOrderQuantity,
  menu,
  setMenu,
  setOrderMenu,
  // searchData,
  // searchOrderMenu,
  // deleteItem,
  // handleSubTotal,
  // loadingStatus,
  // subTotal,
  // total,
  // tax,
  // totalPay,
  // incrementQuantity,
  // setSearchOrderMenu,
  // noResult,
}) => {
  const [skaletonLoading, setSkaletonLoding] = useState(false);
  const [searchOrderMenu, setSearchOrderMenu] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [total, setTotal] = useState([]);
  const [tax, setTax] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  const subTotal = (menu) => {
    const result = quantityValue[menu.id] * menu.price;
    return result;
  };

  function dataTotal() {
    let newTotal = 0;
    orderMenu.forEach((menu) => {
      newTotal += subTotal(menu);
    });
    setTotal(newTotal);
    setTax(newTotal * 0.1);
    const resultTotalPay = newTotal + tax;
    setTotalPay(resultTotalPay);
  }

  useEffect(() => {
    dataTotal();
  }, [quantityValue, total]);

  // const currentData = searchData == "" ? data : searchData;
  const currentData = searchOrderMenu == "" ? orderMenu : searchOrderMenu;

  return (
    <nav>
      <HeaderOrderListComponent />
      <SearchOrderListComponent
        setSkaletonLoding={setSkaletonLoding}
        setSearchOrderMenu={setSearchOrderMenu}
        orderMenu={orderMenu}
        setNoResult={setNoResult}
      />
      <div className="cart-content">
        {/* {loadingStatus && searchData && <LoadingOrderMenu />}
        {!loadingStatus && ( */}
        {skaletonLoading && searchOrderMenu && <LoadingOrderMenu />}
        {!skaletonLoading && (
          <>
            {noResult ? (
              <span id="noResultSearchOrderMenu">
                pencarian tidak ditemukan
              </span>
            ) : (
              currentData.map((result, index) => (
                <OrderListComponent
                  key={index}
                  item={result}
                  subTotal={subTotal}
                  quantityValue={quantityValue}
                  setOrderQuantity={setOrderQuantity}
                  menu={menu}
                  setMenu={setMenu}
                  orderMenu={orderMenu}
                  setOrderMenu={setOrderMenu}
                  searchOrderMenu={searchOrderMenu}
                  setSearchOrderMenu={setSearchOrderMenu}
                  setNoResult={setNoResult}
                />
              ))
            )}
          </>
        )}
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
      <ButtonCartComponent />
    </nav>
  );
};

export default NavComponent;
