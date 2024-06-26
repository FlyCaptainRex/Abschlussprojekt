import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./mystyle.css";

// Definiert die Navbar-Komponente
const Navbar = () => {
  // Zustandshook für das Öffnen und Schließen des Menüs
  const [isOpen, setIsOpen] = useState(false);

  // Funktion zum Umschalten des Menüzustands
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Rendern der Komponente
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Button zum Umschalten des Menüs */}
        <button onClick={toggleMenu} className="hamburger-button">
          <i className="material-icons">menu</i>
        </button>
        <span>Perfume Heaven</span>
      </div>
      {/* Menü, das basierend auf dem Zustand isOpen angezeigt oder ausgeblendet wird */}
      <div className={`navbar-menu ${isOpen ? "is-open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/products" onClick={toggleMenu}>
          Products
        </Link>
      </div>
    </nav>
  );
};

// Exportiert die Navbar-Komponente für die Verwendung in anderen Teilen des Codes
export default Navbar;
