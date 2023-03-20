import React from "react";

const ButtonCartComponent = () => {
  return (
    <div className="cart-button">
      <a href="">
        <i className="fa-regular fa-floppy-disk fa-xl"></i>
      </a>
      <a href="">
        <i className="fa-regular fa-file fa-xl"></i>
      </a>
      <a href="">
        <div>
          <span>PAY</span> <i className="fa-solid fa-arrow-right fa-2xl"></i>
        </div>
      </a>
    </div>
  );
};

export default ButtonCartComponent;
