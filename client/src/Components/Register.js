import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import "../Sass/Register.scss";

export default function Register(props) {
  const { userEmail } = useContext(MyContext);
  const signupForm = (e) => {
    e.preventDefault();

    /* const user = {
      firstname: e.target.elements["firstname"].value,
      lastname: e.target.elements["lastname"].value,
      email: e.target.elements["email"].value,
      password: e.target.elements["password"].value,
    };
    // sending post request to express-server
    fetch("http://localhost:4000/api/v1/users", {
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
    <>
      <div className="loginResPage">
        <div className="formSection">
          <h2 className="signupHeader">Create your account!</h2>
          <form onSubmit={signupForm} className="signupForm">
            <input
              className="signupInput"
              type="text"
              name="firstname"
              placeholder="Enter First Name"
              required
            />

            <input
              type="text"
              className="signupInput"
              name="lastname"
              placeholder="Enter Last Name"
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
            <button className="signupBtn" type="submit">
              <span>Signup</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
