import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand text-secondary" to="">
          <strong>Employee Manager</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/sign-up" ? "active" : ""
                }`}
                aria-current="page"
                to="sign-up"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/on-board" ? "active" : ""
                }`}
                to="on-board"
              >
                On board
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/history" ? "active" : ""
                }`}
                to="history"
              >
                History
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
