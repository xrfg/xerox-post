import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyContext from "../context/MyContext";
import "../Sass/Login.scss";
import baseURL from "../config/baseURL";

export default function Register(props) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const { userEmail } = useContext(MyContext);

  const registerForm = async (e) => {
    e.preventDefault();

    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    console.log("sign up data ==>", user);

    // post req ==> http://localhost:5000/api/v1/register

    try {
      const res = await axios.post(baseURL + "/users/register", user);
      if (res.data.error) {
        setError(res.data.error);
        setSuccess(null);
      } else {
        setError(null);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setSuccess("registered successfully, redirect in 3 seconds");
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);
      }
      console.log("res => ", res.data);
    } catch (err) {
      console.log(err);
    }

    /* fetch("http://localhost:5000/api/v1/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          console.log(result.data);
          props.history.push("/login");
        } else {
          console.log(result.message);
        }
      }); */
  };

  return (
    <div className="loginResPage">
      {success && <div>{success}</div>}
      <div className="formSection">
        <h2 className="registerHeader">Create your account!</h2>
        <form onSubmit={registerForm} className="registerForm">
          <input
            className="registerInput"
            type="text"
            name="username"
            placeholder="Enter Username"
          />

          <input
            className="registerInput"
            type="email"
            name="email"
            defaultValue={userEmail}
            placeholder="Enter Email"
          />

          <input
            className="registerInput"
            type="password"
            name="password"
            placeholder="Enter Password"
          />

          <input
            className="registerInput"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <button className="registerBtn" type="submit">
            <span>Signup</span>
          </button>
        </form>

        {error && (
          <div className="infoWarning2">
            <span>{error}</span>
          </div>
        )}

        <h4 className="dontHaveAcc">
          Have an account already?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </h4>
      </div>
    </div>
  );
}
