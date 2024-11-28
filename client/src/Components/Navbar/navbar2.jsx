import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "./navbar2.css";

const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For hamburger menu
  const [activeDropdown, setActiveDropdown] = useState(null); // For dropdowns
  const [isMobile, setIsMobile] = useState(false); // To detect mobile view

  // Detect screen size for mobile or desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (dropdown) => {
    if (isMobile) {
      // For mobile, toggle dropdown on click
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img
            src="/trogon-logo/Tongston logo_Tongston logo.jpg"
            alt="T-logo"
          />
        </div>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>

          {/* Dropdown 1 */}
          <div
            className={`dropdown ${
              activeDropdown === "OUR BUSINESSES" ? "active" : ""
            }`}
            onMouseEnter={
              !isMobile ? () => setActiveDropdown("OUR BUSINESSES") : undefined
            }
            onMouseLeave={!isMobile ? () => setActiveDropdown(null) : undefined}
          >
            <button
              className="dropdown-btn"
              onClick={() => toggleDropdown("OUR BUSINESSES")}
            >
              OUR BUSINESSES
            </button>
            {(activeDropdown === "OUR BUSINESSES" || !isMobile) && (
              <div className="dropdown-menu">
                <Link to="/web" onClick={() => setIsMenuOpen(false)}>
                  T-COLLEGE
                </Link>
                <Link to="/app" onClick={() => setIsMenuOpen(false)}>
                  T-INSTITUTE
                </Link>
                <Link to="/seo" onClick={() => setIsMenuOpen(false)}>
                  T-VENTURES
                </Link>
                <Link to="/seo" onClick={() => setIsMenuOpen(false)}>
                  T-HOLDINGS
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            TONGSTON WORLD
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            TEES 2024
          </Link>

          {/* Dropdown 2 */}
          <div
            className={`dropdown ${
              activeDropdown === " INSIGHTS & EVENTS" ? "active" : ""
            }`}
            onMouseEnter={
              !isMobile
                ? () => setActiveDropdown(" INSIGHTS & EVENTS")
                : undefined
            }
            onMouseLeave={!isMobile ? () => setActiveDropdown(null) : undefined}
          >
            <button
              className="dropdown-btn"
              onClick={() => toggleDropdown(" INSIGHTS & EVENTS")}
            >
              INSIGHTS & EVENTS
            </button>
            {(activeDropdown === " INSIGHTS & EVENTS" || !isMobile) && (
              <div className="dropdown-menu">
                <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>
                  INSIGHTS
                </Link>
                <Link to="/faq" onClick={() => setIsMenuOpen(false)}>
                  EVENTS
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            CAREERS
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT US
          </Link>
        </div>
        <RxHamburgerMenu onClick={toggleMenu} className="hamburger" />
      </div>
    </nav>
  );
};

export default Navbar2;
