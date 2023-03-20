import React, { useState, useEffect } from "react";
// import CardComponent from "./CardComponent";
import CardComponent from "../../components/Main/CardMenu";
import LoadingCardMenu from "../../components/Loading/LoadingCardMenu";
import foodData from "../../menu.json";
import dataOrderMenu from "../../helper";

const MainComponent = ({
  menu,
  searchName,
  setMenu,
  orderMenu,
  setOrderMenu,
}) => {
  const [isLoadingMenu, setIsLoadingMenu] = useState();
  const [skaletonLoadingMenu, setSkaletonLodingMenu] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [isCategory, setIsCategory] = useState("");

  const dataCategory = ["", "appetizer", "main course", "dessert", "drink"];

  const getOrderMenu = dataOrderMenu();
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
        if (orderMenu) {
          return { ...dataMenu, stock: dataMenu.stock - orderMenu.quantity };
        } else {
          return dataMenu;
        }
      });

      // setListMenu(filteredProducts);
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
                className={setIsCategory === result ? "active" : ""}
                onClick={() => {
                  // handleCat("");
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
            <CardComponent
              menu={menu}
              setMenu={setMenu}
              orderMenu={orderMenu}
              setOrderMenu={setOrderMenu}
              // addOrderList={addOrderList}
              data={result}
              key={index}
            />
          ))}
      </div>
    </main>
  );
};

export default MainComponent;
