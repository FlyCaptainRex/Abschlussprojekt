import React from 'react';
import Navbar from './navbar';
import './mystyle.css';

// Definiert die Order-Klasse als eine React-Komponente
class Order extends React.Component {
    constructor(props) {
        super(props);
        // Initialisiert den Zustand der Komponente mit den gespeicherten Warenkorbdaten aus dem localStorage oder einem leeren Array
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.state = {
            cart: savedCart,
            first_name: '',
            last_name: '',
            country: '',
            zip_code: '',
            street: '',
            city: '',
            email: ''
        };
    }

    // Methode zum Verarbeiten von Änderungen in den Eingabefeldern und Aktualisieren des Zustands
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // Methode zum Verarbeiten der Formularübermittlung
    handleSubmit = (e) => {
        e.preventDefault();
        // Bereitet die Bestelldaten vor, die an den Server gesendet werden sollen
        const orderData = {
            user: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                country: this.state.country,
                zip_code: this.state.zip_code,
                street: this.state.street,
                city: this.state.city,
                email: this.state.email
            },
            cart: this.state.cart
        };

        // Sendet die Bestelldaten an den Server
        fetch('http://127.0.0.1:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Order placed successfully!');
            // Löscht den Warenkorb aus dem localStorage und setzt den Zustand zurück
            localStorage.removeItem('cart');
            this.setState({
                cart: [],
                first_name: '',
                last_name: '',
                country: '',
                zip_code: '',
                street: '',
                city: '',
                email: ''
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Order placed successfully!');
        });
    }

    // Rendern der Komponente
    render() {
        const { cart, first_name, last_name, country, zip_code, street, city, email } = this.state;
        // Berechnet den Gesamtpreis aller Artikel im Warenkorb
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        return (
            <div>
                <Navbar />
                <div className="order-container">
                    <h2>Order Summary</h2>
                    {cart.map(item => (
                        <div key={item.ID} className="cart-item">
                            <h3>{item.name}</h3>
                            <p>Price: CHF {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: CHF {item.price * item.quantity}</p>
                        </div>
                    ))}
                    <h3>Total: CHF {total.toFixed(2)}</h3>

                    <h2>Shipping Information</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id="first_name" name="first_name" value={first_name} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" name="last_name" value={last_name} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" name="country" value={country} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip_code">ZIP Code</label>
                            <input type="text" id="zip_code" name="zip_code" value={zip_code} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" name="street" value={street} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={city} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={this.handleChange} required />
                        </div>
                        <button type="submit" className="order-btn">Place Order</button>
                    </form>
                </div>
            </div>
        );
    }
}

// Exportiert die Order-Komponente für die Verwendung in anderen Teilen des Codes
export default Order;
