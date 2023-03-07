import React, { useState } from "react";
import CardComponent from "./CardComponent";
import LoadingCardMenu from "./LoadingCardMenu";

const MainComponent = ({
  data,
  handleCat,
  orderMenu,
  categoryActive,
  loadingStatus,
}) => {
  return (
    <main>
      <div>
        <div className="menu-main">
          <a
            className={categoryActive === "" ? "active" : ""}
            onClick={() => {
              handleCat("");
            }}
          >
            All
          </a>
          <a
            className={categoryActive === "appetizer" ? "active" : ""}
            onClick={() => {
              handleCat("appetizer");
            }}
          >
            Appetizer
          </a>
          <a
            className={categoryActive === "main course" ? "active" : ""}
            onClick={() => {
              handleCat("main course");
            }}
          >
            Main Course
          </a>
          <a
            className={categoryActive === "dessert" ? "active" : ""}
            onClick={() => {
              handleCat("dessert");
            }}
          >
            Dessert
          </a>
          <a
            className={categoryActive === "drink" ? "active" : ""}
            onClick={() => {
              handleCat("drink");
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
        {loadingStatus && <LoadingCardMenu />}
        {!loadingStatus &&
          data.map((result, index) => (
            <CardComponent orderMenu={orderMenu} data={result} key={index} />
          ))}
      </div>
    </main>
  );
};

// <i class="fa-sharp fa-solid fa-arrow-right-from-arc"></i>

export default MainComponent;
