import React, { createContext, useEffect, useState } from "react";
import "./css/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import IndexComponent from "./pages/Menu/Index";
import LoginPage from "./pages/Login/Login";
import Cookies from "js-cookie";
import ProfilePage from "./pages/Profile/index";
import ProtectedRoute from "./Routes/ProtectedRoute";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import OrderMenuContextProvider from "./config/Context/OrderMenuContextProvider";
import DataMenuContextProvider from "./config/Context/DataMenuContextProvider";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogin = () => {
    setShowDashboard(false);
    Cookies.remove("password");
    Cookies.remove("email");
  };

  const ifHasEmail = Cookies.get("email");
  const ifHasPassword = Cookies.get("password");

  useEffect(() => {
    if (ifHasEmail == undefined || ifHasPassword == undefined) {
      setShowDashboard(false);
    } else {
      setShowDashboard(true);
    }
  }, []);
  return (
    <>
      <Router>
        <DataMenuContextProvider>
          <OrderMenuContextProvider>
            <Switch>
              <ProtectedRoute
                exact
                path="/list-menu"
                component={IndexComponent}
                isAuthenticated={showDashboard}
                handleLogin={handleLogin}
              />
              {/* <ProtectedRoute
                path="/profile"
                component={ProfilePage}
                isAuthenticated={showDashboard}
              /> */}
              {!showDashboard ? (
                <Route
                  path="/"
                  render={(props) => (
                    <LoginPage setShowDashboard={setShowDashboard} {...props} />
                  )}
                />
              ) : (
                <Redirect to="/list-menu" />
              )}
            </Switch>
          </OrderMenuContextProvider>
        </DataMenuContextProvider>
      </Router>
    </>
  );
}

export default App;
