import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../assets/logo.png';

const NavigationBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsAuthenticated(false); // Update authentication state
    navigate('/login'); // Redirect to login
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Circuit Surge Logo" className="logo" />
      </div>

      {/* Navigation Bar */}
      <nav className="navigation-bar">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact Us
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a href="/logout" onClick={handleLogout} className="logout-link">
                  Log Out
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;