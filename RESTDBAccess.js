// Importiert die benötigten Module
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Erstellt eine Express-Anwendung
const app = express();
// Definiert den Port, auf dem der Server laufen soll
const PORT = 3000;

console.log('Starting server...');

// Richtet statische Dateien aus dem Verzeichnis 'public' ein
app.use(express.static('public'));
// Konfiguriert body-parser, um URL-kodierte Daten zu verarbeiten
app.use(bodyParser.urlencoded({ extended: false }));
// Konfiguriert body-parser, um JSON-Daten zu verarbeiten
app.use(bodyParser.json());

// Middleware für Cross-Origin Resource Sharing (CORS)
// Setzt Header, um CORS zu ermöglichen, damit Anfragen von anderen Domains akzeptiert werden
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Konfiguriert die Datenbankverbindung
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'online-shop'
};

// Erstellt eine MySQL-Datenbankverbindung
const con = mysql.createConnection(dbConfig);

// Verbindet mit der MySQL-Datenbank und gibt eine Nachricht aus, wenn die Verbindung erfolgreich ist
con.connect(err => {
    if (err) {
        return console.error('Error connecting to the database:', err);
    }
    console.log('Connected to the database.');
});

// Definiert einen Endpunkt zum Abrufen aller Produkte
app.get('/products', (req, res) => {
    const sql = "SELECT * FROM produkt";
    // Führt die SQL-Abfrage aus und sendet das Ergebnis als JSON-Antwort zurück
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    });
});

// Definiert einen Endpunkt zum Erstellen einer neuen Bestellung
app.post('/orders', (req, res) => {
    const { user, cart } = req.body; // Extrahiert Benutzerdaten und Warenkorbdaten aus der Anfrage
    const userSql = 'INSERT INTO user (first_name, last_name, country, zip_code, street, city, email) VALUES (?, ?, ?, ?, ?, ?, ?)'; // SQL-Abfrage zum Einfügen eines neuen Benutzers
    const userValues = [user.first_name, user.last_name, user.country, user.zip_code, user.street, user.city, user.email]; // Werte für den neuen Benutzer

    // Führt die Einfügeabfrage für den Benutzer aus
    con.query(userSql, userValues, (err, userResult) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Error inserting user' });
        }

        const userId = userResult.insertId; // Holt die ID des neu eingefügten Benutzers
        const orderMainSql = 'INSERT INTO order_main (user_id) VALUES (?)'; // SQL-Abfrage zum Einfügen eines neuen Eintrags in order_main

        // Führt die Einfügeabfrage für order_main aus
        con.query(orderMainSql, [userId], (err, orderMainResult) => {
            if (err) {
                console.error('Error inserting order_main:', err);
                return res.status(500).json({ error: 'Error inserting order_main' });
            }

            const orderId = orderMainResult.insertId; // Holt die ID des neu eingefügten order_main-Eintrags
            const orderDetailSql = 'INSERT INTO order_detail (order_id, perfume_name, brand, perfume_price, perfume_amount) VALUES ?'; // SQL-Abfrage zum Einfügen von Bestelldetails
            const orderDetailValues = cart.map(item => [orderId, item.name, item.brand, item.price, item.quantity]); // Werte für order_detail

            // Führt die Einfügeabfrage für order_detail aus
            con.query(orderDetailSql, [orderDetailValues], err => {
                if (err) {
                    console.error('Error inserting order_detail:', err);
                    return res.status(500).json({ error: 'Error inserting order_detail' });
                }

                // Sendet eine Bestätigungsnachricht zurück, wenn die Bestellung erfolgreich war
                res.status(200).json({ message: 'Order placed successfully!' });
            });
        });
    });
});

// Startet den Server und lässt ihn auf dem definierten Port lauschen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
