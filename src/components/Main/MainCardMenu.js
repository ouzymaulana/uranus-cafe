import React from "react";

const CardComponent = ({ data, orderMenu, setOrderMenu, menu, setMenu }) => {
  const addOrderList = (value) => {
    if (value.stock > 0) {
      let checkOrderMenu;
      if (orderMenu) {
        checkOrderMenu = orderMenu.find(
          (dataOrderMenu) => dataOrderMenu.value.id === value.id
        );
      }
      if (!checkOrderMenu) {
        let newOrderMenu;
        if (orderMenu && Array.isArray(orderMenu)) {
          if (
            orderMenu === null ||
            !orderMenu.some((menu) => menu.id === value.id)
          ) {
            newOrderMenu = [
              ...orderMenu,
              {
                value,
                quantity: 1,
              },
            ];
          }
        } else {
          newOrderMenu = [{ value, quantity: 1 }];
        }

        localStorage.setItem("orderMenu", JSON.stringify(newOrderMenu));
        setOrderMenu(newOrderMenu);

        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id == value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );
      } else {
        setMenu(
          menu.map((dataMenu) =>
            dataMenu.id === value.id
              ? { ...dataMenu, stock: dataMenu.stock - 1 }
              : dataMenu
          )
        );

        if (orderMenu && Array.isArray(orderMenu)) {
          const setOrderMenuLocalStorage = orderMenu.map((orderMenu) => {
            return orderMenu.value.id === value.id
              ? { ...orderMenu, quantity: orderMenu.quantity + 1 }
              : orderMenu;
          });
          localStorage.setItem(
            "orderMenu",
            JSON.stringify(setOrderMenuLocalStorage)
          );
          setOrderMenu(setOrderMenuLocalStorage);
        }
      }
    } else {
      alert("maaf, pesanan tersebut sedang kosong");
    }
  };
  return (
    <div className="card" onClick={() => addOrderList(data)}>
      <img
        src={require(`../../assets/img/${data.gambar}`)}
        alt="gambar"
        width={270}
        height={320}
      />
      <span>{data.menu_name}</span>
      <em>stock {data.stock}</em>
    </div>
  );
};

export default CardComponent;
