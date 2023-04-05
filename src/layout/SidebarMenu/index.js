import React from "react";
import { Link } from "react-router-dom";

const AsideComponent = () => {
  return (
    <aside>
      <div className="logo">
        <p>logo</p>
      </div>
      <div className="sidebar-menu">
        <Link to="/dashboard">
          <i className="fa-solid fa-layer-group"></i>
        </Link>
        <Link to="/list-menu">
          <i className="fa-solid fa-bag-shopping"></i>
        </Link>
        <a href="">
          <i className="fa-solid fa-wallet"></i>
        </a>
        <a href="">
          <i className="fa-regular fa-share-from-square"></i>
        </a>
        <a href="">
          <i className="fa-regular fa-message"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-gear"></i>
        </a>
      </div>
    </aside>
  );
};

export default AsideComponent;
