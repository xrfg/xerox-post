import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../config/baseURL";
import MyContext from "../../context/MyContext";
import "./Login.scss";

export default function Login(props) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { userEmail } = useContext(MyContext);
  const loginForm = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("sign in data ==>", user);

    try {
      const res = await axios.post(baseURL + "/users/login", user);
      if (res.data.error) {
        setError(res.data.error);
        setSuccess(null);
      } else {
        setError(null);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setSuccess(true);
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
      console.log("res => ", res.data);
    } catch (err) {
      console.log(err);
    }
    // POST req ==> http://localhost:5000/api/v1/login

    // sending post request on /users/login
    /* fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        let token = res.headers.get("x-auth");
        localStorage.setItem("x-auth", token);
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          console.log(result.data);
          localStorage.setItem("userId", result.data.id);
          props.history.push("/post");
          window.location.reload();
        } else {
          console.log(result.message);
        }
        // window.location.replace("/movies");
      }); */
  };
  return (
    <div className="loginResPage">
      {success && <div className="successNote"></div>}
      <div className="formSection">
        <h2 className="registerHeader">Log in!</h2>
        <form onSubmit={loginForm} className="registerForm">
          <input
            className="registerInput"
            defaultValue={userEmail}
            type="email"
            name="email"
            placeholder="Enter Email"
          />

          <input
            className="registerInput"
            type="password"
            name="password"
            placeholder="Enter Password"
          />

          <button type="submit" className="registerBtn">
            <span>Login</span>
          </button>
        </form>
        {error && (
          <div className="infoWarning2">
            <span>{error}</span>
          </div>
        )}

        <h4 className="dontHaveAcc">
          Don't have an account yet?{" "}
          <Link to="/register">
            <span>Register</span>
          </Link>
        </h4>
      </div>
    </div>
  );
}
