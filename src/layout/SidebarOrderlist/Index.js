import React, { useState } from "react";
// import OrderListComponent from "./OrderListComponent";
import OrderListComponent from "../../components/Order/OrderList";
// import LoadingOrderMenu from "./loadingComponent/LoadingOrderMenu";
import LoadingOrderMenu from "../../components/Loading/LoadingOrderMenu";
// import HeaderOrderListComponent from "./HeaderOrderListComponent";
import HeaderOrderListComponent from "../../components/Order/OrderHeader";
// import SearchOrderListComponent from "./SearchOrderListComponent";
import SearchOrderListComponent from "../../components/Order/OrderSearch";
// import ButtonCartComponent from "./ButtonCartComponent";
import ButtonCartComponent from "../../components/Order/OrderButton";
// import OrderSummary from "./OrderSummary";
import OrderSummary from "../../components/Order/OrderSummary";

const NavComponent = ({ orderMenu, menu, setMenu, setOrderMenu }) => {
  const [skaletonLoading, setSkaletonLoding] = useState(false);
  const [searchOrderMenu, setSearchOrderMenu] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const subTotal = (value) => {
    const result = value.quantity * value.value.price;
    return result;
  };

  const currentData = searchOrderMenu == "" ? orderMenu : searchOrderMenu;

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
        {skaletonLoading && searchOrderMenu && <LoadingOrderMenu />}
        {!skaletonLoading && (
          <>
            {noResult ? (
              <span id="noResultSearchOrderMenu">
                pencarian tidak ditemukan
              </span>
            ) : currentData && Array.isArray(currentData) ? (
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
      <OrderSummary
        subTotal={subTotal}
        orderMenu={orderMenu}
        setOrderMenu={setOrderMenu}
      />
      <ButtonCartComponent />
    </nav>
  );
};

export default NavComponent;
