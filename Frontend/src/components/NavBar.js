import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/App.css";
import image from "../assets/red.png";
import { TiThMenuOutline } from "react-icons/ti";
import { IoMdCloseCircle } from "react-icons/io";
function NavBar() {
  const [click, setClick] = useState(false);
  var role = localStorage.getItem("role");
  var isUser = localStorage.getItem("isUser");
  const handleClick = () => setClick(!click);
  function Search() {
    console.log("searched");
  }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={image} height={35} width={35} alt="logo"></img>
            CASANEST
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              {role === "owner" ? (
                <NavLink
                  to="/myUploads"
                  activeclassname="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  MY UPLOADS
                </NavLink>
              ) : (
                <NavLink
                  to="/rooms"
                  activeclassname="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  ROOMS
                </NavLink>
              )}
            </li>
            {role === "owner" && (
              <li className="nav-item">
                <NavLink
                  to="/new-room"
                  activeclassname="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  New Room
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              {isUser === "true" ? (
                <NavLink
                  to="/logout"
                  activeclassname="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  LOGOUT
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  activeclassname="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  LOGIN
                </NavLink>
              )}
            </li>

            <li className="nav-item">
              <NavLink
                to="/profile"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                PROFILE
              </NavLink>
            </li>
            <li>
              <div className="search-wrapper">
                <input
                  type="text"
                  name="query"
                  autoComplete="off"
                  placeholder="Search"
                  onChange={Search}
                />
                <button id="search" type="submit"></button>
              </div>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <IoMdCloseCircle />{" "}
              </span>
            ) : (
              <span className="icon">
                <TiThMenuOutline />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
