import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar({ user }) {
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

        <div className="navBtnBox">
          <button className="navBtn">
            <NavLink activeClassName="activeNavLink" to="/posts">
              <span>All Posts</span>
            </NavLink>
          </button>
        </div>

        {user ? (
          <>
            <div className="navBtnBox">
              <button className="navBtn">
                <NavLink activeClassName="activeNavLink" to="/my-posts">
                  <span>My Posts</span>
                </NavLink>
              </button>
            </div>
            <div className="navBtnBox">
              <button className="navBtn">
                <NavLink activeClassName="activeNavLink" to="/profile">
                  <div style={{ display: "flex" }}>
                    <span>{user.username}</span>
                    <div
                      className="avatarBox"
                      style={{ backgroundImage: "url(" + user.avatar + ")" }}
                    ></div>
                  </div>
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
