import React, { useState } from "react";
import MyContext from "./MyContext";

export default function Container(props) {
  const [userEmail, setUserEmail] = useState("");
  const [isLogin, setIsLogin] = useState("");
  return (
    <MyContext.Provider
      value={{ userEmail, setUserEmail, isLogin, setIsLogin }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
