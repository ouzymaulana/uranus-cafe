import React, { useEffect, useState } from "react";
import "./css/style.css";
import Aside from "./components/aside/AsideComponent";
import Header from "./components/header/HeaderComponent";
import Nav from "./components/nav/NavComponent.js";
import Main from "./components/main/MainComponent";
import foodData from "./../src/menu.json";

function App() {
  const [menu, setMenu] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);
  const [quantity, setQuantity] = useState();

  // ! handle search by category
  const handleCategoryChange = (value) => {
    setSelectCategory(value);
  };

  // ! handle search by input
  const handleSearching = (value) => {
    setSearchName(value);
  };

  useEffect(() => {
    const filteredProducts = foodData.filter((item) => {
      return (
        item.menu_name.toLowerCase().includes(searchName.toLowerCase()) &&
        (selectCategory === "" || item.category === selectCategory)
      );
    });
    setMenu(filteredProducts);
  }, []);

  // ! penambahan data dalam keranjang
  const handleOrderMenu = (value) => {
    setOrderMenu(orderMenu.concat([value]));
  };

  // ! menghapus data dalam keranjang
  const deleteOrderMenu = (value) => {
    setOrderMenu(orderMenu.filter((dataOrder) => dataOrder.id !== value));
  };

  // ! handle harga menu perquantity
  const handleQuantity = (value, id) => {
    const price = orderMenu.find((dataOrder) => dataOrder.id == id);

    console.log(price.price);
    setQuantity(price.price * value);
  };

  return (
    <div className="container">
      <Header search={handleSearching} />
      <Aside />
      <Nav
        data={orderMenu}
        deleteItem={deleteOrderMenu}
        handleQuantity={handleQuantity}
        subTotal={handleQuantity}
      />
      <Main
        orderMenu={handleOrderMenu}
        data={menu}
        handleCat={handleCategoryChange}
      />
    </div>
  );
}

export default App;
