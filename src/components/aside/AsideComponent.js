import React from "react";

const AsideComponent = () => {
  return (
    <aside>
      <div className="logo">
        <p>logo</p>
      </div>
      <div className="sidebar-menu">
        <a href="" title="database">
          <i className="fa-sharp fa-solid fa-database"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-bag-shopping"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-wallet"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-wallet"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-message"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-gear"></i>
        </a>
      </div>
    </aside>
  );
};

export default AsideComponent;
