import React, { useEffect, useRef, useState } from "react";
import OrderListComponent from "./OrderListComponent";
import LoadingOrderMenu from "./loadingComponent/LoadingOrderMenu";
import HeaderOrderListComponent from "./HeaderOrderListComponent";
import SearchOrderListComponent from "./SearchOrderListComponent";
import ButtonCartComponent from "./ButtonCartComponent";
import OrderSummary from "./OrderSummary";

const NavComponent = ({ orderMenu, menu, setMenu, setOrderMenu }) => {
  const [skaletonLoading, setSkaletonLoding] = useState(false);
  const [searchOrderMenu, setSearchOrderMenu] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));

  const subTotal = (value) => {
    const result = value.quantity * value.value.price;
    return result;
  };

  const currentData = searchOrderMenu == "" ? getOrderMenu : searchOrderMenu;

  return (
    <nav>
      <HeaderOrderListComponent />
      <SearchOrderListComponent
        setSkaletonLoding={setSkaletonLoding}
        setSearchOrderMenu={setSearchOrderMenu}
        orderMenu={orderMenu}
        setNoResult={setNoResult}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
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
            ) : currentData && Array.isArray(currentData) ? (
              // currentData.map((result, index) => (
              currentData.map((result, index) => (
                <OrderListComponent
                  key={index}
                  item={result}
                  subTotal={subTotal}
                  menu={menu}
                  setMenu={setMenu}
                  orderMenu={orderMenu}
                  setOrderMenu={setOrderMenu}
                  searchOrderMenu={searchOrderMenu}
                  setSearchOrderMenu={setSearchOrderMenu}
                  setNoResult={setNoResult}
                  searchValue={searchValue}
                />
              ))
            ) : (
              <span id="noResultSearchOrderMenu">Keranjang pesanan kosong</span>
            )}
          </>
        )}
      </div>
      <OrderSummary subTotal={subTotal} orderMenu={currentData} />
      <ButtonCartComponent />
    </nav>
  );
};

export default NavComponent;
