import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(prevState => !prevState);
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo-container">
            <NavLink to="/">
              <img src="./assets/Logo.png" alt="Logo" className="navbar-logo" />
            </NavLink>
          </div>
          <ul className="nav-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/soil-analysis" className={({ isActive }) => (isActive ? 'active' : '')}>
                Soil Analysis
              </NavLink>
            </li>
            <li>
              <NavLink to="/information" className={({ isActive }) => (isActive ? 'active' : '')}>
                Information
              </NavLink>
            </li>
            <li>
              <NavLink to="/references" className={({ isActive }) => (isActive ? 'active' : '')}>
                References
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                About
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            &#x2022;&#x2022;&#x2022; {/* Three dots icon */}
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div className="sidebar">
          <div className="sidebar-content">
            <ul>
              <li>
                <NavLink to="/account" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Account
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Support
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
