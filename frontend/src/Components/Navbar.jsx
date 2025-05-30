import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar ">
      <div className="navbar-container">
        <img src="Event.jpg" alt=""  className="EventLogo"/>
        <ul className="nav-links">
          {user===null ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              {user.role === "admin" && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
              {user.role === "user" && <li><Link to="/user-dashboard">User Dashboard</Link></li>}
              <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
