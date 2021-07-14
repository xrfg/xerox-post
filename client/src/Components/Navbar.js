import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "../Sass/Navbar.scss";

export default function Navbar() {
  const history = useHistory();

  const [navAni, setNavAni] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setNavAni(true) : setNavAni(false);
    });
    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <nav>
      <ul className={`navbar ${navAni && "navAni"} `}>
        <div className="navBtnBox navBtnBox__home">
          <button className="navBtn">
            <NavLink activeClassName="activeNavLink" exact to="/">
              <span>Home</span>
            </NavLink>
          </button>
        </div>

        {localStorage.getItem("token") ? (
          <>
            <div className="navBtnBox">
              <button className="navBtn">
                <NavLink activeClassName="activeNavLink" to="/posts">
                  <span>All Posts</span>
                </NavLink>
              </button>
            </div>
            <div className="navBtnBox">
              <button className="navBtn">
                <NavLink activeClassName="activeNavLink" to="/post">
                  <span>Post</span>
                </NavLink>
              </button>
            </div>
            <div className="navBtnBox">
              <button
                className="navBtn"
                onClick={() => {
                  localStorage.clear();
                  history.push("/");
                  console.log("user logged out");
                  window.location.reload();
                }}
              >
                <NavLink activeClassName="activeNavLink" to="/login">
                  <span>Log out</span>
                </NavLink>
              </button>
            </div>
          </>
        ) : (
          <div className="navBtnBox">
            <button className="navBtn">
              <NavLink activeClassName="activeNavLink" to="/login">
                <span>Log in</span>
              </NavLink>
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
}
