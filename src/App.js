import React, { useEffect, useState } from "react";
import "./css/style.css";
import Aside from "./components/aside/AsideComponent";
import Header from "./components/header/HeaderComponent";
import Nav from "./components/nav/NavComponent.js";
import Main from "./components/main/MainComponent";
import foodData from "./../src/menu.json";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isCategory, setIsCateory] = useState("");
  const [searchOrderMenu, setSearchOrderMenu] = useState([]);

  // ! mencari data dalam keranjang
  const handleSearchOrderMenu = (value) => {
    clearTimeout(isLoading);
    const newTimer = setTimeout(() => {
      const result = orderMenu.filter((data) =>
        data.menu_name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchOrderMenu(result);
    }, 2000);

    setIsLoading(newTimer);
  };

  // ! handle search by category
  const handleCategoryChange = (value) => {
    setSelectCategory(value);
    setIsCateory(value);
  };

  // ! handle search by input
  const handleSearching = (value) => {
    setSearchName(value);
  };

  const filterProduct = () => {
    const filteredProducts = foodData.filter((item) => {
      return (
        item.menu_name.toLowerCase().includes(searchName.toLowerCase()) &&
        (selectCategory === "" || item.category === selectCategory)
      );
    });
    setMenu(filteredProducts);
  };

  // ! penambahan data dalam keranjang
  const handleOrderMenu = (value) => {
    setOrderMenu([...orderMenu, value]);
    // setOrderMenu(orderMenu.concat([value]));
  };

  // ! menghapus data dalam keranjang
  const deleteOrderMenu = (value) => {
    setOrderMenu(orderMenu.filter((dataOrder) => dataOrder.id !== value));
  };

  // ! handle harga menu perquantity
  const handleSubTotal = (value, id) => {
    const price = orderMenu.find((dataOrder) => dataOrder.id == id);

    const newData = {
      id: id,
      currentSubTotal: price.price * value,
    };
    // setSubTotal([...subTotal, newData]);
  };

  useEffect(() => {
    filterProduct();
    // console.log(searchOrderMenu);
  }, [foodData, searchName, selectCategory]);

  return (
    <div className="container">
      <Header search={handleSearching} />
      <Aside />
      <Nav
        data={orderMenu}
        searchData={searchOrderMenu}
        searchOrderMenu={handleSearchOrderMenu}
        deleteItem={deleteOrderMenu}
        handleSubTotal={handleSubTotal}
      />
      <Main
        orderMenu={handleOrderMenu}
        data={menu}
        handleCat={handleCategoryChange}
        categoryActive={isCategory}
      />
    </div>
  );
}

export default App;
