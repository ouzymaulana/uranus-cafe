import React from "react";
import Main from "../../layout/Main";

const WrapperMainOrProfile = (
  Component,
  showProfile,
  menu,
  setMenu,
  searchName,
  orderMenu,
  setOrderMenu
) => {
  return !showProfile ? (
    <Main
      menu={menu}
      setMenu={setMenu}
      searchName={searchName}
      orderMenu={orderMenu}
      setOrderMenu={setOrderMenu}
    />
  ) : (
    <Component />
  );
};

export default WrapperMainOrProfile;
