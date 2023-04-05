import React, { useState, useEffect } from "react";
import CartMenu from "../../components/Main/MainCardMenu";
import LoadingCardMenu from "../../components/Loading/LoadingCardMenu";
import foodData from "../../menu.json";
import dataOrderMenu from "../../Helper/orderMenuLocalStorage";
import DataSoldMenu from "../../Helper/SoldDataMenuLocalStorage";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";
import { useDataMenu } from "../../config/Context/DataMenuContextProvider";
import OrderComponent from "../../layout/SidebarOrderlist/Index";
import { useSearchMenu } from "../../config/Context/SearchMenuContextProvider";

// const MainComponent = ({ searchName }) => {
const MainComponent = () => {
  const { menu, setMenu } = useDataMenu();
  const { orderMenu, setOrderMenu } = useOrderMenu();
  const { searchName } = useSearchMenu();

  const [isLoadingMenu, setIsLoadingMenu] = useState();
  const [skaletonLoadingMenu, setSkaletonLodingMenu] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");

  const dataCategory = ["", "appetizer", "main course", "dessert", "drink"];

  const getOrderMenu = dataOrderMenu();
  const getSoldMenu = DataSoldMenu();
  const filterProduct = () => {
    clearTimeout(isLoadingMenu);
    setSkaletonLodingMenu(true);
    const timer = setTimeout(() => {
      const filteredProducts = foodData.filter((item) => {
        return (
          item.menu_name.toLowerCase().includes(searchName.toLowerCase()) &&
          (selectCategory === "" || item.category === selectCategory)
        );
      });

      const checkStockMenu = filteredProducts.map((dataMenu) => {
        const orderMenu = getOrderMenu
          ? getOrderMenu.find((order) => order.value.id === dataMenu.id)
          : null;

        const soldMenu = getSoldMenu
          ? getSoldMenu.find(
              (itemSoldData) => itemSoldData.value.id === dataMenu.id
            )
          : null;

        const orderMenuQuantity = orderMenu ? orderMenu.quantity : 0;
        const soldMenuQuantity = soldMenu ? soldMenu.quantity : 0;
        if (orderMenu !== undefined && soldMenu !== undefined) {
          const subtraction = dataMenu.stock - orderMenuQuantity;
          return {
            ...dataMenu,
            stock: subtraction - soldMenuQuantity,
          };
        } else if (orderMenu !== undefined && soldMenu == undefined) {
          return { ...dataMenu, stock: dataMenu.stock - orderMenuQuantity };
        } else if (orderMenu == undefined && soldMenu !== undefined) {
          return { ...dataMenu, stock: dataMenu.stock - soldMenuQuantity };
        } else {
          return dataMenu;
        }
      });

      setMenu(checkStockMenu);
      setSkaletonLodingMenu(false);
    }, 500);
    setIsLoadingMenu(timer);
  };

  useEffect(() => {
    filterProduct();
  }, [searchName, selectCategory]);

  return (
    <div className="menu-page">
      <main>
        <div>
          <div className="menu-main">
            {dataCategory.map((result, index) => {
              return (
                <a
                  key={index}
                  className={selectCategory === result ? "active" : ""}
                  onClick={() => {
                    setSelectCategory(result);
                  }}
                >
                  {result == "" ? "All" : result}
                </a>
              );
            })}
          </div>
          <div className="icon-menu-main">
            <i className="fa-solid fa-bars fa-xl"></i>
          </div>
        </div>
        <div className="main-content">
          {skaletonLoadingMenu && <LoadingCardMenu />}
          {!skaletonLoadingMenu &&
            menu.map((result, index) => (
              <CartMenu
                menu={menu}
                setMenu={setMenu}
                orderMenu={orderMenu}
                setOrderMenu={setOrderMenu}
                data={result}
                key={index}
              />
            ))}
        </div>
      </main>
      <OrderComponent />
    </div>
  );
};

export default MainComponent;
