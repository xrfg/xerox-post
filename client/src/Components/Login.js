import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import "../Sass/Login.scss";

export default function Login() {
  const { userEmail } = useContext(MyContext);
  const loginForm = (e) => {
    e.preventDefault();
    /* let User = {
      email: e.target.elements["email"].value,
      password: e.target.elements["password"].value,
    };

    // sending post request on /users/login
    fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(User),
    })
      .then((res) => {
        let token = res.headers.get("x-auth");
        localStorage.setItem("x-auth", token);
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          const info = result.data;
          console.log(info);
          setUser(info);
          setIsLogin(true);
        } else {
          console.log(result.message);
        }
        window.location.replace("/movies");
      }); */
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
      </div>
    </div>
  );
}
