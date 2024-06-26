/*
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'online-shop'
});

connection.connect();

app.get('/daten', (req, res) => {
  connection.query('SELECT * FROM produkt', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
*/