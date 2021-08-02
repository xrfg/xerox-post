import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <ul className="footerList bg4Inverted">
        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <a
            href="https://www.instagram.com/lavenderexcesssweat/"
            target="_blank"
            rel="noreferrer"
          >
            By Xerox Martins
          </a>
        </li>
      </ul>
    </footer>
  );
}
