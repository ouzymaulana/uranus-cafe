import React from "react";

const CardComponent = ({ data, addOrderList }) => {
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
