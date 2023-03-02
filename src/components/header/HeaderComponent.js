import React from "react";
import foto from "../../assets/you.png";

const HeaderComponent = ({ search }) => {
  return (
    <header>
      <div>
        <p>Uranus Cafe</p>
      </div>
      <div>
        <span className="fa fa-search"></span>
        <input
          type="text"
          name="search"
          placeholder="Search anything, find everything"
          autoComplete="off"
          onKeyDown={(event) =>
            event.key === "Enter" ? search(event.target.value) : ""
          }
        />
      </div>
      <div>
        <p>Ouzy Maulana</p>
        <img src={foto} alt="" />
      </div>
      <div>
        <a href="">
          <p>LOGOUT</p>
          <i className="fa-solid fa-right-to-bracket fa-2xl"></i>
        </a>
      </div>
    </header>
  );
};

export default HeaderComponent;
