import React, { useState } from "react";
import "./../../css/login.css";
// import { Link } from "react-router-dom";
// import IndexComponent from "../IndexComponent/IndexComponent";

const LoginComponent = ({ setShowDashboar }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleDataLogin = (event) => {
    event.preventDefault();
    if (!username == "" && !password == "") {
      setShowDashboar(true);

      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);

      document.cookie = `username=${username}`;
      document.cookie = `password=${password}`;
    }
  };

  const handleUsername = (event) => {
    if (!event.target.value == "") {
      setUsername(event.target.value);
    }
  };

  const handlePassword = (event) => {
    if (!event.target.value == "") {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="login">
      <div className="layoutWelcome">Welcome</div>
      <div className="login-form">
        <p>Login</p>
        <form onSubmit={handleDataLogin}>
          <div className="input-group">
            <label htmlFor="">username</label>
            <input type="text" className="username" onChange={handleUsername} />
            <i className="fa-solid fa-user fa-lg"></i>
          </div>
          <br />
          <div className="input-group">
            <label htmlFor="">password</label>
            <input type="text" className="password" onChange={handlePassword} />
            <i className="fa-solid fa-lock fa-lg"></i>
          </div>

          <button className="button-login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
