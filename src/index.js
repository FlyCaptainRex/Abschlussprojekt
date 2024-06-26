import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./mystyle.css";
import Home from "./home";
import Products from "./products";
import Order from "./order";

// Definiert die Hauptanwendungskomponente 'App'
const App = () => (
  // Konfiguriert den Router für die Anwendung
  <Router>
    {/* Definiert die verschiedenen Routen der Anwendung */}
    <Routes>
      {/* Route für die Startseite */}
      <Route path="/" element={<Home />} />
      {/* Route für die Produktseite */}
      <Route path="/products" element={<Products />} />
      {/* Route für die Bestellseite */}
      <Route path="/order" element={<Order />} />
    </Routes>
  </Router>
);

// Erstellt ein Root-Element für die React-Anwendung und rendert die 'App'-Komponente
const root = ReactDOM.createRoot(document.getElementById("wurzelelement"));
root.render(<App />);
