import React, { useState } from "react";
import OrderListComponent from "../../components/Order/OrderList";
import LoadingOrderMenu from "../../components/Loading/LoadingOrderMenu";
import HeaderOrderListComponent from "../../components/Order/OrderHeader";
import OrderSearch from "../../components/Order/OrderSearch";
import ButtonCartComponent from "../../components/Order/OrderButton";
import OrderSummary from "../../components/Order/OrderSummary";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";
import { useDataSearchOrderMenu } from "../../config/Context/DataSearchOrderMenuContextProvider";
import TotalPayContextProvider from "../../config/Context/TotalPayContextProvider";

const NavComponent = () => {
  const { orderMenu } = useOrderMenu();
  const { searchOrderMenu } = useDataSearchOrderMenu();

  const [skaletonLoading, setSkaletonLoding] = useState(false);
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
      <OrderSearch
        setSkaletonLoding={setSkaletonLoding}
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
      <TotalPayContextProvider>
        <OrderSummary />
        <ButtonCartComponent />
      </TotalPayContextProvider>
    </nav>
  );
};

export default NavComponent;
