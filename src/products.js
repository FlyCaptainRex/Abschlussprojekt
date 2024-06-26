import React, { useState, useEffect } from "react";
import "./mystyle.css";
import Navbar from "./navbar";
import Cart from "./cart";
import { Link } from "react-router-dom";

// Komponente 'Products' definiert
const Products = () => {
  // Zustandshooks für Produkte, Warenkorb und Fehlernachrichten
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [err, setErr] = useState("");

  // useEffect-Hook für das Laden der Produkte beim ersten Rendern der Komponente
  useEffect(() => {
    // Abrufen der Produktdaten vom Server
    fetch("http://127.0.0.1:3000/products")
      .then((response) => {
        // Fehlermeldung, wenn die Antwort nicht erfolgreich ist
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((result) => setProducts(result)) // Setzt die erhaltenen Produkte in den Zustand
      .catch((error) => setErr(error.toString())); // Setzt die Fehlermeldung in den Zustand
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur einmal ausgeführt wird

  // Funktion zum Aktualisieren des Warenkorbs und Speichern im localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Funktion zum Hinzufügen eines Produkts zum Warenkorb
  const addToCart = (product) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.ID === product.ID);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        prevCart.push({ ...product, quantity: 1 });
      }
      updateCart([...prevCart]);
      return prevCart;
    });
  };

  // Funktion zum Entfernen eines Produkts aus dem Warenkorb
  const removeFromCart = (product) => {
    updateCart(cart.filter((item) => item.ID !== product.ID));
  };

  // Funktion zum Erhöhen der Menge eines Produkts im Warenkorb
  const incrementQuantity = (product) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.ID === product.ID);
      cartItem.quantity++;
      updateCart([...prevCart]);
      return prevCart;
    });
  };

  // Funktion zum Verringern der Menge eines Produkts im Warenkorb
  const decrementQuantity = (product) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.ID === product.ID);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        updateCart([...prevCart]);
      } else {
        removeFromCart(product);
      }
      return prevCart;
    });
  };

  // Rendern der Komponente
  return (
    <div>
      <Navbar />
      <div className="container">
        {err && <p className="statusbar">{err}</p>}
        <div className="product-list">
          {products.map((product) => (
            <div key={product.ID} className="product-card">
              <h2>{product.name}</h2>
              <h3>{product.brand}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Cart
        cartItems={cart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
      <Link to="/order" className="order-btn">
        Place Order
      </Link>
    </div>
  );
};

// Exportiert den Products-Komponentefür die Verwendung in anderen Teilen des Codes
export default Products;
