import React, { useEffect, useRef, useState } from "react";
import { useDataSearchOrderMenu } from "../../config/Context/DataSearchOrderMenuContextProvider";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";

const OrderSearch = ({
  setSkaletonLoding,
  setNoResult,
  searchValue,
  setSearchValue,
}) => {
  const { setSearchOrderMenu } = useDataSearchOrderMenu();

  const [isLoading, setIsLoading] = useState();
  const { orderMenu } = useOrderMenu();

  const handleSearchOrderMenu = (value) => {
    clearTimeout(isLoading);
    setSkaletonLoding(true);
    const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));

    const newTimer = setTimeout(() => {
      const result = orderMenu.filter((data) =>
        data.value.menu_name.toLowerCase().includes(value.toLowerCase())
      );

      setSearchOrderMenu(result);
      setSkaletonLoding(false);

      if (result.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
    }, 1000);

    setIsLoading(newTimer);
  };

  const inputRef = useRef(null);
  function handleClearSearchValue() {
    setSearchValue("");
    inputRef.current.value = "";
    handleSearchOrderMenu("");
  }

  function handleAddSearchValue(event) {
    const data = event.target.value;
    setSearchValue(data);
  }
  return (
    <div className="search-cart">
      <input
        ref={inputRef}
        type="text"
        name="search"
        placeholder="Search Something.."
        autoComplete="off"
        onChange={(event) => {
          handleSearchOrderMenu(event.target.value);
          handleAddSearchValue(event);
        }}
      />
      {searchValue && (
        <a
          onClick={() => {
            handleClearSearchValue();
          }}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </a>
      )}
      <span className="fa fa-search"></span>
    </div>
  );
};

export default OrderSearch;
