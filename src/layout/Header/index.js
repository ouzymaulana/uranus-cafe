import React from "react";
import foto from "../../assets/you.png";
// import LoginComponent from "../login/LoginComponent";
import { useSearchMenu } from "../../config/Context/SearchMenuContextProvider";

const HeaderComponent = ({ search, handleLogin, handleClickProfile }) => {
  // const handleClickProfile = () => {
  //   setShowProfile(true);
  // };
  const { setSearchName } = useSearchMenu();
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
            // event.key === "Enter" ? search(event.target.value) : ""
            event.key === "Enter" ? setSearchName(event.target.value) : ""
          }
        />
      </div>
      <div onClick={handleClickProfile}>
        <p>Ouzy Maulana</p>
        <img src={foto} alt="" />
      </div>
      <div>
        <a onClick={handleLogin}>
          <p>LOGOUT</p>
          <i className="fa-solid fa-right-to-bracket fa-2xl"></i>
        </a>
      </div>
    </header>
  );
};

export default HeaderComponent;
