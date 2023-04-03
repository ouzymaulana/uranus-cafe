import React from "react";
import { useDataMenu } from "../../config/Context/DataMenuContextProvider";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";

const MainCartMenu = ({ data }) => {
  const { addOrderList } = useOrderMenu();

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

export default MainCartMenu;
