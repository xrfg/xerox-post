import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import "../Sass/Register.scss";

export default function Register(props) {
  const { userEmail } = useContext(MyContext);
  const signupForm = (e) => {
    e.preventDefault();

    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    console.log("sign up data ==>", user);

    // post req ==> http://localhost:5000/api/v1/register

    fetch("http://localhost:5000/api/v1/users/register", {
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
      });
  };

  return (
    <>
      <div className="loginResPage">
        <div className="formSection">
          <h2 className="signupHeader">Create your account!</h2>
          <form onSubmit={signupForm} className="signupForm">
            <input
              className="signupInput"
              type="text"
              name="username"
              placeholder="Enter Username"
              required
            />

            <input
              className="signupInput"
              type="email"
              name="email"
              defaultValue={userEmail}
              placeholder="Enter Email"
              required
            />

            <input
              className="signupInput"
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />

            <input
              className="signupInput"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
            <button className="signupBtn" type="submit">
              <span>Signup</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
