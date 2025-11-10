// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import order from "../photoSelfcare/order.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar">
        <button className="burger" onClick={toggleMenu}>
          {isOpen ? "✕" : "☰"}
        </button>

        <div className="navbar-title">Hjemmeside</div>

        <img src={order} alt="Kurv" className="delivery-icon" />
      </nav>

      {/* Side-menu */}
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/running" onClick={closeMenu}>Running</Link>
          </li>
          <li>
            <Link to="/thehouse" onClick={closeMenu}>The House</Link>
          </li>
          <li>
            <Link to="/gaudi" onClick={closeMenu}>Gaudí</Link>
          </li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Navbar;
