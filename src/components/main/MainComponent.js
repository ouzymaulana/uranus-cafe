import React, { useState } from "react";
import CardComponent from "./CardComponent";

const MainComponent = ({ data, handleCat, orderMenu }) => {
  const [activeLink, setActiveLink] = useState("all");

  return (
    <main>
      <div>
        <div className="menu-main">
          <a
            className={activeLink === "all" ? "active" : ""}
            onClick={() => {
              handleCat("");
              setActiveLink("all");
            }}
          >
            All
          </a>
          <a
            className={activeLink === "appetizer" ? "active" : ""}
            onClick={() => {
              handleCat("appetizer");
              setActiveLink("appetizer");
            }}
          >
            Appetizer
          </a>
          <a
            className={activeLink === "main-course" ? "active" : ""}
            onClick={() => {
              handleCat("main course");
              setActiveLink("main-course");
            }}
          >
            Main Course
          </a>
          <a
            className={activeLink === "dessert" ? "active" : ""}
            onClick={() => {
              handleCat("dessert");
              setActiveLink("dessert");
            }}
          >
            Dessert
          </a>
          <a
            className={activeLink === "drink" ? "active" : ""}
            onClick={() => {
              handleCat("drink");
              setActiveLink("drink");
            }}
          >
            Drink
          </a>
        </div>
        <div className="icon-menu-main">
          <i className="fa-solid fa-bars fa-xl"></i>
        </div>
      </div>
      <div className="main-content">
        {data.map((result, index) => (
          <CardComponent orderMenu={orderMenu} data={result} key={index} />
        ))}
      </div>
    </main>
  );
};

// <i class="fa-sharp fa-solid fa-arrow-right-from-arc"></i>

export default MainComponent;
