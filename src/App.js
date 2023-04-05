import React, { createContext, useEffect, useState } from "react";
import "./css/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import ListMenu from "./pages/Menu/ListMenu";
import LoginPage from "./pages/Login/Login";
import Cookies from "js-cookie";
import ProfilePage from "./pages/Profile/index";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard/index";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import OrderMenuContextProvider from "./config/Context/OrderMenuContextProvider";
import DataMenuContextProvider from "./config/Context/DataMenuContextProvider";
import DashboardRoute from "./Routes/DashboardRoute";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  // const location = useLocation();

  const handleLogin = () => {
    setShowDashboard(false);
    Cookies.remove("password");
    Cookies.remove("email");
  };

  const ifHasEmail = Cookies.get("email");
  const ifHasPassword = Cookies.get("password");
  const ifAdmin = Cookies.get("role");

  useEffect(() => {
    if (ifHasEmail == undefined || ifHasPassword == undefined) {
      setShowDashboard(false);
    } else {
      setShowDashboard(true);
    }
  }, []);

  useEffect(() => {
    console.log(showDashboard);
  }, [showDashboard]);

  return (
    <>
      <Router>
        <DataMenuContextProvider>
          <OrderMenuContextProvider>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <LoginPage setShowDashboard={setShowDashboard} {...props} />
                )}
              />
              <ProtectedRoute
                exact
                path="/list-menu"
                component={ListMenu}
                isAuthenticated={showDashboard}
                handleLogin={handleLogin}
              />
              <ProtectedRoute
                exact
                path="/dashboard"
                component={Dashboard}
                isAuthenticated={showDashboard}
                handleLogin={handleLogin}
              />
              {/* {!showDashboard ? (
              ) : (
                <Redirect to={window.location.pathname} />
              )} */}
            </Switch>
          </OrderMenuContextProvider>
        </DataMenuContextProvider>
      </Router>
    </>
  );
}

export default App;
