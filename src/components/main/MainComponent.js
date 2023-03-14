import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import LoadingCardMenu from "./LoadingCardMenu";
import foodData from "./../../../src/menu.json";

const MainComponent = ({ menu, addOrderList, searchName, setMenu }) => {
  const [listMenu, setListMenu] = useState([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState();
  const [skaletonLoadingMenu, setSkaletonLodingMenu] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [isCategory, setIsCategory] = useState("");

  const dataCategory = ["", "appetizer", "main course", "dessert", "drink"];

  const filterProduct = () => {
    clearTimeout(isLoadingMenu);
    setSkaletonLodingMenu(true);
    const timer = setTimeout(() => {
      // const filteredProducts = menu.filter((item) => {
      const filteredProducts = foodData.filter((item) => {
        return (
          item.menu_name.toLowerCase().includes(searchName.toLowerCase()) &&
          (selectCategory === "" || item.category === selectCategory)
        );
      });
      // setListMenu(filteredProducts);
      setMenu(filteredProducts);
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
              addOrderList={addOrderList}
              data={result}
              key={index}
            />
          ))}
      </div>
    </main>
  );
};

export default MainComponent;
