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
  const [isLoading, setIsLoading] = useState();
  const [skaletonLoading, setSkaletonLoding] = useState(false);
  const [isCategory, setIsCateory] = useState("");
  const [searchOrderMenu, setSearchOrderMenu] = useState([]);
  const [orderQuantity, setOrderQuantity] = useState({});
  // const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState([]);

  // ! mencari data dalam keranjang
  const handleSearchOrderMenu = (value) => {
    if (value !== "") {
      clearTimeout(isLoading);
      setSkaletonLoding(true);
      const newTimer = setTimeout(() => {
        const result = orderMenu.filter((data) =>
          data.menu_name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchOrderMenu(result);
        setSkaletonLoding(false);
      }, 1000);

      setIsLoading(newTimer);
    }
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
    const menuOrder = menu.find((menuOrder) => menuOrder.id == value.id);

    if (menuOrder.stock > 0) {
      setOrderMenu([...orderMenu, value]);

      setMenu(
        menu.map((dataMenu) =>
          dataMenu.id === value.id
            ? { ...dataMenu, stock: dataMenu.stock - 1 }
            : dataMenu
        )
      );

      // diperbaiki
      setOrderQuantity({
        ...orderQuantity,
        [value.id]: (orderQuantity[value.id] || 0) + 1,
      });
    } else {
      alert("maaf, pesanan tersebut sedang kosong");
    }
    // setSkaletonLoding(false);
  };

  // ! menghapus data dalam keranjang
  const deleteOrderMenu = (value) => {
    console.log(orderQuantity);
    // setOrderMenu(orderMenu.filter((dataOrder) => dataOrder.id !== value));

    const index = orderMenu.findIndex((dataOrder) => dataOrder.id === value);
    const newOrderMenu = [...orderMenu];
    newOrderMenu.splice(index, 1);
    setOrderMenu(newOrderMenu);

    // perbaiki
    const newOrderQuantity = [...orderQuantity];
    newOrderQuantity.splice(index, 1);
    setOrderQuantity(newOrderQuantity);
  };

  // ! handle harga menu perquantity
  const handleSubTotal = (value, id) => {
    // mengubah jumlah quantity
    const newValue = parseInt(value);
    const menuStock = menu.find((item) => item.id === id).stock;
    // if (newValue > 0 && newValue <= menu.find((item) => item.id === id).stock) {
    if (newValue > 0) {
      const newOrderQuantity = {
        ...orderQuantity,
        [id]: newValue,
      };

      setOrderQuantity(newOrderQuantity);

      //* untuk perubahan stock ketika input berubah
      // const newMenu = menu.map((item) => {
      //   if (item.id === id) {
      //     console.log(item.id);
      //     const newStock = menuStock - newValue + newOrderQuantity[id];
      //     return {
      //       ...item,
      //       stock: newStock >= 0 ? newStock : 0,
      //     };
      //   }
      //   return item;
      // });
      // setMenu(newMenu);
    }
  };

  // ! handle subtotal per menu
  const subtotal = (menu) => {
    return orderQuantity[menu.id] * menu.price;
  };

  function dataTotal() {
    let newTotal = 0;
    console.log(orderMenu);
    orderMenu.forEach((menu) => {
      newTotal += subtotal(menu);
    });
    setTotal(newTotal);
  }

  useEffect(() => {
    filterProduct();
    dataTotal();
  }, [foodData, searchName, selectCategory, orderQuantity]);

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
        loadingStatus={skaletonLoading}
        subTotal={subtotal}
        total={total.toLocaleString()}
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
