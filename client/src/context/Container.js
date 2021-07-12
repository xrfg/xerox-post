import React from "react";
import MyContext from "./MyContext";

export default function Container(props) {
  return <MyContext.Provider value={{}}>{props.children}</MyContext.Provider>;
}
