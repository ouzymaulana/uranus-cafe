import React, { useState } from "react";
import "./../../css/login.css";
import Cookies from "js-cookie";
import UserData from "../../user.json";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const LoginComponent = ({ setShowDashboard }) => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleSubmit = (value, setFieldError) => {
    const { email, password } = value;
    const checkEmail = UserData.find((data) => data.email == email);
    const checkPassword = UserData.find((data) => data.password == password);

    if (checkEmail == undefined) {
      setFieldError("email", "email tidak ditemukan");
      return;
    } else if (checkPassword == undefined) {
      setFieldError("password", "password tidak ditemukan");
      return;
    } else {
      setShowDashboard(true);
      Cookies.set("email", email, { expires: 1 / 24 });
      Cookies.set("password", password, { expires: 1 / 24 });
      history.push("/list-menu");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Alamat email yang dimasukkan tidak valid")
      .required("Email tidak boleh kosong"),
    password: Yup.string()
      .min(5, "Password minimal 5 karakter")
      .required("Password tidak boleh kosong"),
  });

  return (
    <div className="login">
      <div className="layoutWelcome">Welcome</div>
      <div className="login-form">
        <div className="login-item">
          <p>Login</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setFieldError }) =>
              handleSubmit(values, setFieldError)
            }
          >
            <Form>
              <div className="input-group">
                <label htmlFor="">email</label>
                <Field type="text" id="email" name="email" />
                <i className="fa-solid fa-user fa-lg"></i>
                <span>
                  <ErrorMessage name="email" />
                </span>
              </div>
              <br />
              <div className="input-group">
                <label htmlFor="">password</label>
                <Field
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  name="password"
                  autoComplete="off"
                />
                <div className="icon-item">
                  <i
                    onClick={handleShowPassword}
                    className="fa-regular fa-eye-slash fa-lg icon_eye"
                  ></i>
                  <i className="fa-solid fa-lock fa-lg"></i>
                </div>
                <span>
                  <ErrorMessage name="password" />
                </span>
              </div>
              <div>
                <button className="button-login" type="submit">
                  Login
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
