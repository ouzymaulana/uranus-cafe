import React from "react";

const CardComponent = ({ data, orderMenu }) => {
  return (
    <div className="card" onClick={() => orderMenu(data)}>
      <img
        src={require(`../../assets/img/${data.gambar}`)}
        alt="gambar"
        width={270}
        height={320}
      />
      <span>{data.menu_name}</span>
    </div>
  );
};

export default CardComponent;
