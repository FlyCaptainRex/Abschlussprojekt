/*
 Author: Nico Samadelli
 Version: 1.0
 Datum: 26.06.24
 Beschreibung: Home Seite mit viel Text.
*/
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "./mystyle.css";

// Definiert die Home-Komponente
const Home = () => (
  <div>
    {/* Fügt die Navbar-Komponente ein */}
    <Navbar />
    <div className="home-content">
      <h1>Welcome to Perfume Heaven</h1>
      <p>We create exquisite scents for men</p>
      <p>Discover our exclusive collection of perfumes.</p>
      <h3>About Us</h3>
      <p>
        Perfume Heaven is a niche fragrance brand dedicated to crafting unique
        and luxurious scents. Our mission is to provide high-quality, artisanal
        perfumes that cater to the sophisticated tastes of modern men. Each
        fragrance is meticulously formulated using the finest ingredients
        sourced from around the world.
      </p>
      <p>
        Founded in 2010, Perfume Heaven has quickly become a favorite among
        connoisseurs of fine fragrances. Our expert perfumers combine
        traditional techniques with innovative approaches to create scents that
        are both timeless and contemporary.
      </p>
      <p>
        We believe that a great fragrance is an essential part of one's personal
        style. Our collection includes a wide range of scents, from fresh and
        invigorating to deep and sensual, ensuring that there is something for
        every occasion and preference.
      </p>
      <p>
        Visit our store to experience the world of Perfume Heaven and find the
        perfect scent that reflects your personality and enhances your presence.
      </p>
      {/* Fügt einen Link zur Produktseite ein */}
      <Link to="/products" className="btn">
        View Products
      </Link>
    </div>
  </div>
);

// Exportiert den Home-Komponent für die Verwendung in anderen Teilen des Codes
export default Home;
