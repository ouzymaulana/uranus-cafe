import React, { useState, useEffect } from "react";
import CartMenu from "../../components/Main/MainCardMenu";
import LoadingCardMenu from "../../components/Loading/LoadingCardMenu";
import foodData from "../../menu.json";
import dataOrderMenu from "../../Helper/orderMenuLocalStorage";
import DataSoldMenu from "../../Helper/SoldDataMenuLocalStorage";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";
import { useDataMenu } from "../../config/Context/DataMenuContextProvider";

const MainComponent = ({ searchName }) => {
  const { menu, setMenu } = useDataMenu();
  const { orderMenu, setOrderMenu } = useOrderMenu();

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

        console.log("soldmenu ", soldMenu);
        console.log("ordermenu ", orderMenu);
        if (orderMenu !== undefined && soldMenu !== undefined) {
          console.log("dua dua ada");
          const subtraction = dataMenu.stock - orderMenu.quantity;
          return {
            ...dataMenu,
            stock: subtraction - soldMenu.quantity,
          };
        } else if (orderMenu !== undefined && soldMenu == undefined) {
          console.log("data order menu doang yang ada");
          return { ...dataMenu, stock: dataMenu.stock - orderMenu.quantity };
        } else if (orderMenu == undefined && soldMenu !== undefined) {
          console.log("data sold menu doang yang ada");
          return { ...dataMenu, stock: dataMenu.stock - soldMenu.quantity };
        } else {
          console.log("belum ada dua duanya");
          return dataMenu;
        }
        // if (orderMenu) {
        //   return { ...dataMenu, stock: dataMenu.stock - orderMenu.quantity };
        // } else {
        //   return dataMenu;
        // }
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
  );
};

export default MainComponent;
