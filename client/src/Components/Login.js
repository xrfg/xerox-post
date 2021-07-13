import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";
import "../Sass/Login.scss";

export default function Login(props) {
  const { userEmail } = useContext(MyContext);
  const loginForm = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("sign in data ==>", user);

    // POST req ==> http://localhost:5000/api/v1/login

    // sending post request on /users/login
    fetch("http://localhost:5000/api/v1/users/login", {
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
      });
  };
  return (
    <div className="loginResPage">
      <div className="formSection">
        <h2 className="signupHeader">Log in!</h2>
        <form onSubmit={loginForm} className="signupForm">
          <input
            className="signupInput"
            defaultValue={userEmail}
            type="email"
            name="email"
            placeholder="Enter Email"
          />

          <input
            className="signupInput"
            type="password"
            name="password"
            placeholder="Enter Password"
          />

          <button type="submit" className="signupBtn">
            <span>Login</span>
          </button>
        </form>
        <h4>Don't have an account yet?</h4>
        <Link to="/register">
          <button>
            <span>Register</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
