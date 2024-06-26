import React from "react";
import "./mystyle.css";

// Definiert die Komponente 'Cart'
const Cart = ({ cartItems, incrementQuantity, decrementQuantity }) => {
  // Berechnet den Gesamtpreis aller Artikel im Warenkorb
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Rendern der Komponente
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.ID} className="cart-item">
          <h3>{item.name}</h3>
          <p>Price: CHF {item.price}</p>
          <div className="quantity-controls">
            {/* Button zum Verringern der Menge */}
            <button onClick={() => decrementQuantity(item)}>-</button>
            <span>{item.quantity}</span>
            {/* Button zum Erhöhen der Menge */}
            <button onClick={() => incrementQuantity(item)}>+</button>
          </div>
          {/* Zeigt den Gesamtpreis für das einzelne Produkt an */}
          <p>Total: CHF {item.price * item.quantity}</p>
        </div>
      ))}
      {/* Zeigt den Gesamtpreis aller Artikel im Warenkorb an */}
      <h3>Total: CHF {total.toFixed(2)}</h3>
    </div>
  );
};

// Exportiert die 'Cart'-Komponente für die Verwendung in anderen Teilen des Codes
export default Cart;
