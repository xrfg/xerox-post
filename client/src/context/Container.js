import React, { useState } from "react";
import MyContext from "./MyContext";

export default function Container(props) {
  const [userEmail, setUserEmail] = useState("");
  return (
    <MyContext.Provider value={{ userEmail, setUserEmail }}>
      {props.children}
    </MyContext.Provider>
  );
}
