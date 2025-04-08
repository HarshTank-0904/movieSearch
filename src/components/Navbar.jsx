import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";

function Navbar() {
  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-8">
          <img className="logo-size" src="/assets/logo-transparent-png.png" alt="Movie Logo" />
        </div>
        <div className="col-2 navbar-items">
          <Link to="/favourite" className="nav-link">
            <FavoriteIcon className="nav-icon" />
            <span className="nav-text">Favourites</span>
          </Link>
        </div>
        <div className="col-2 navbar-items">
          <Link to="/" className="nav-link">
            <HomeIcon className="nav-icon" />
            <span className="nav-text">Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
