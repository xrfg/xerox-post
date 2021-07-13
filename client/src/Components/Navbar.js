import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../Sass/Navbar.scss";

export default function Navbar() {
  const history = useHistory();

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
          <li>All posts</li>
        </Link>
        <Link to="/post">
          <li>Post</li>
        </Link>
        {localStorage.getItem("x-auth") ? (
          <>
            <Link to="/login">
              <button
                onClick={() => {
                  localStorage.clear();
                  history.push("/");
                  console.log("user logged out");
                  window.location.reload();
                }}
                className="navBtn"
              >
                <span>Log out</span>
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="navBtn">
              <span>Log in</span>
            </button>
          </Link>
        )}
        <Link to="/register">
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
}
