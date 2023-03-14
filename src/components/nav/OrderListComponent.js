import React from "react";

const OrderListComponent = ({
  item,
  subTotal,
  quantityValue,
  setOrderQuantity,
  menu,
  setMenu,
  orderMenu,
  setOrderMenu,
  searchOrderMenu,
  setSearchOrderMenu,
  setNoResult,
}) => {
  const decrementQuantity = (value, id) => {
    // mengubah jumlah quantity
    const newValue = quantityValue[id] - parseInt(value);
    const menuStock = item.stock;
    if (newValue > 0 && menuStock >= 0) {
      const newOrderQuantity = {
        ...quantityValue,
        [id]: newValue,
      };

      setOrderQuantity(newOrderQuantity);

      //* untuk perubahan stock ketika input berubah
      const newMenu = menu.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stock: item.stock + quantityValue[id] - newValue,
          };
        }
        return item;
      });
      setMenu(newMenu);
    }
  };

  const incrementQuantity = (value, id) => {
    const newValue = parseInt(value);
    const currentValue = newValue + quantityValue[id];
    const menuStock = menu.find((item) => item.id === id).stock;

    if (menuStock > 0) {
      // if (newValue > 0) {
      const newOrderQuantity = {
        ...quantityValue,
        [id]: currentValue,
      };

      setOrderQuantity(newOrderQuantity);

      //* untuk perubahan stock ketika input berubah
      const newMenu = menu.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stock: item.stock + quantityValue[id] - currentValue,
          };
        }
        return item;
      });
      setMenu(newMenu);
    } else {
      alert("maaf, stock habis");
    }
    // }
  };

  const deleteOrderMenu = (value) => {
    const newOrderMenu = orderMenu.filter((item) => item.id !== value);
    setOrderMenu(newOrderMenu);
    const filteredData = searchOrderMenu.filter((item) => item.id !== value);
    setSearchOrderMenu(filteredData);

    if (filteredData.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }

    // * update stock menu ketika order list menu tersebut dihapus
    const newMenu = menu.map((item) => {
      if (item.id === value) {
        return {
          ...item,
          stock: item.stock + quantityValue[value],
        };
      }
      return item;
    });
    setMenu(newMenu);

    // * menghapus quantity order pada state quantity
    const newOrderQuantity = { ...quantityValue };
    delete newOrderQuantity[value.id];
    setOrderQuantity(newOrderQuantity);
    console.log(newOrderQuantity);
  };

  return (
    <div className="cart">
      <p>{item.menu_name}</p>
      <div>
        <p>{item.price}</p>
        <div>
          <a
            onClick={() => {
              incrementQuantity(1, item.id);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </a>
          <span id="quantity">{quantityValue[item.id]}</span>
          <a
            onClick={() => {
              decrementQuantity(1, item.id);
            }}
          >
            <i className="fa-solid fa-minus"></i>
          </a>
        </div>

        <p>{subTotal(item)}</p>
        <span onClick={() => deleteOrderMenu(item.id)}>
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
  );
};

export default OrderListComponent;
