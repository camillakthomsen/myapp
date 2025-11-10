// NavBar.js
import { useState } from "react";
import { Link } from "react-router-dom";
import basket from "../photoSelfcare/order.png";
import "./../App.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="nav">
      {/* Venstre: burger */}
      <div className="nav-left">
        <button
          className="burger-btn"
          onClick={toggleMenu}
          aria-label={isOpen ? "Luk menu" : "Åbn menu"}
        >
          {isOpen ? (
            <span className="burger-close">✕</span>
          ) : (
            <>
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </>
          )}
        </button>
      </div>

      {/* Midten: logo / navn */}
      <div className="nav-center">
        <Link to="/homepage" className="nav-logo">
          Glow Up
        </Link>
      </div>

      {/* Højre: indkøbskurv */}
      <div className="nav-right">
        <Link to="/delivery" className="cart-icon">
          <img src={basket} alt="Indkøbskurv" />
        </Link>
      </div>

      {/* Slide-in menu */}
      {isOpen && (
        <>
          {/* Grå baggrund */}
          <div className="nav-overlay" onClick={closeMenu} />

          <nav className="nav-drawer">
            <button
              className="drawer-close-btn"
              onClick={closeMenu}
              aria-label="Luk menu"
            >
              ✕
            </button>

            <ul className="drawer-list">
              <li>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tips" onClick={closeMenu}>
                  Tips
                </Link>
              </li>
              <li>
                <Link to="/events" onClick={closeMenu}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/running" onClick={closeMenu}>
                  Start
                </Link>
              </li>
            </ul>

          </nav>
        </>
      )}
    </header>
  );
}
