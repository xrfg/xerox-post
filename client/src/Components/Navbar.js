import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Sass/Navbar.scss";

export default function Navbar() {
  const [navAni, setNavAni] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setNavAni(true) : setNavAni(false);
    });
    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <nav>
      <ul className={`navbar ${navAni && "navAni"}`}>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/posts">
          <li>Posts</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
}
