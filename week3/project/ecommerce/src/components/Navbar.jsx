import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onHomeClick }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1> My E-commerce</h1>
      <div className="nav-links">
        <Link
          to="/"
          onClick={onHomeClick}
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/favourites"
          className={location.pathname === "/favourites" ? "active" : ""}
        >
          Favourites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
