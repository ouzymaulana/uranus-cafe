import React, { useEffect, useState } from "react";
import "./../../css/style.css";
import Aside from "../../layout/SidebarMenu";
import Header from "../../layout/Header";
import OrderComponent from "../../layout/SidebarOrderlist/Index";
import Main from "../../layout/Main";
import "react-loading-skeleton/dist/skeleton.css";
import dataOrderMenu from "../../Helper/orderMenuLocalStorage";
// import DashboardRoute from "../../Routes/DashboardRoute";
import ProfilePage from "../Profile";
import WrapperMainOrProfile from "../../config/Wrapper/WrapperMainOrProfile";
import { useOrderMenu } from "../../config/Context/OrderMenuContextProvider";
import { useDataMenu } from "../../config/Context/DataMenuContextProvider";
import DataSearchOrderMenuContextProvider from "../../config/Context/DataSearchOrderMenuContextProvider";
import { Route, Switch } from "react-router-dom";
import SearchMenuContextProvider from "../../config/Context/SearchMenuContextProvider";
import Layout from "../../layout";

function ListMenu({ handleLogin }) {
  return (
    <Layout handleLogin={handleLogin}>
      <Main />
    </Layout>
  );
}

export default ListMenu;
