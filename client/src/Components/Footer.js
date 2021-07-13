import React from "react";
import { Link } from "react-router-dom";
import "../Sass/Footer.scss";

export default function Footer() {
  return (
    <footer>
      <ul className="footerList">
        <h3>blobpost</h3>
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
    </footer>
  );
}
