import React, { useEffect, useState } from "react";
import "./css/style.css";
import Aside from "./components/aside/AsideComponent";
import Header from "./components/header/HeaderComponent";
import Nav from "./components/nav/NavComponent.js";
import Main from "./components/main/MainComponent";
import foodData from "./../src/menu.json";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [menu, setMenu] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isLoadingMenu, setIsLoadingMenu] = useState();
  const [skaletonLoading, setSkaletonLoding] = useState(false);
  const [skaletonLoadingMenu, setSkaletonLodingMenu] = useState(false);
  const [isCategory, setIsCateory] = useState("");
  const [searchOrderMenu, setSearchOrderMenu] = useState([]);
  const [orderQuantity, setOrderQuantity] = useState([]);
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
    } else {
      setSearchOrderMenu([]); //mengosongkan searchOrderMenu ketika inputan kosong
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
    clearTimeout(isLoadingMenu);
    setSkaletonLodingMenu(true);
    const timer = setTimeout(() => {
      const filteredProducts = foodData.filter((item) => {
        return (
          item.menu_name.toLowerCase().includes(searchName.toLowerCase()) &&
          (selectCategory === "" || item.category === selectCategory)
        );
      });
      setMenu(filteredProducts);
      setSkaletonLodingMenu(false);
    }, 500);
    setIsLoadingMenu(timer);
  };

  // ! penambahan data dalam keranjang
  const handleOrderMenu = (value) => {
    if (value.stock > 0) {
      const menuOrder = menu.find((menuOrder) => menuOrder.id == value.id);

      const checkOrderMenu = orderMenu.find(
        (menuOrder) => menuOrder.id == value.id
      );
      if (!checkOrderMenu) {
        setOrderMenu([...orderMenu, value]);

        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id === value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );

        setOrderQuantity({
          ...orderQuantity,
          [value.id]: 1,
        });
        console.log(orderQuantity);
      }
    } else {
      alert("maaf, pesanan tersebut sedang kosong kkk");
    }
  };

  // ! menghapus data dalam keranjang
  const deleteOrderMenu = (value) => {
    const newOrderMenu = orderMenu.filter((item) => item.id !== value);
    setOrderMenu(newOrderMenu);
    const filteredData = searchOrderMenu.filter((item) => item.id !== value);
    setSearchOrderMenu(filteredData);

    // * update stock menu ketika order list menu tersebut dihapus
    const newMenu = menu.map((item) => {
      if (item.id === value) {
        return {
          ...item,
          stock: orderQuantity[value],
        };
      }
      return item;
    });
    setMenu(newMenu);

    // * menghapus quantity order pada state quantity
    const newOrderQuantity = { ...orderQuantity };
    delete newOrderQuantity[value.id];
    setOrderQuantity(newOrderQuantity);
  };

  // ! handle harga menu perquantity
  const handleSubTotal = (value, id) => {
    // mengubah jumlah quantity
    const newValue = parseInt(value);
    const menuStock = menu.find((item) => item.id === id).stock;
    console.log(menuStock);
    if (newValue > 0 && menuStock >= 0) {
      // if (newValue > 0) {
      const newOrderQuantity = {
        ...orderQuantity,
        [id]: newValue,
      };
      setOrderQuantity(newOrderQuantity);

      //* untuk perubahan stock ketika input berubah
      const newMenu = menu.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stock: item.stock + orderQuantity[id] - newValue,
          };
        }
        return item;
      });
      setMenu(newMenu);
    }
  };

  // ! handle subtotal per menu
  const subtotal = (menu) => {
    return orderQuantity[menu.id] * menu.price;
  };

  function dataTotal() {
    let newTotal = 0;
    orderMenu.forEach((menu) => {
      newTotal += subtotal(menu);
    });
    setTotal(newTotal);
  }

  useEffect(() => {
    dataTotal();
  }, [orderQuantity]);

  // useEffect(() => {
  //   dataTotal();
  // }, [menu]);

  useEffect(() => {
    filterProduct();
  }, [searchName, selectCategory]);

  useEffect(() => {
    const waktu = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(waktu);
    };
  }, []);

  return (
    <div className="container">
      <Header search={handleSearching} />
      <Aside />
      <Nav
        time={time}
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
        loadingStatus={skaletonLoadingMenu}
      />
    </div>
  );
}

export default App;
