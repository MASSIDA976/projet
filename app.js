const express = require('express');
const myconnection = require('express-myconnection');
const mysql2 = require("mysql2");
const url = require('url');
const fs = require('fs');

const app = express();


// Configuration du moteur de templates EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Configuration de la connexion à MySQL
app.use(myconnection(mysql2, {
  host: 'localhost',
  user: 'root',
  password: 'Tissianti976.',
  database: 'assurance_db'
}, 'single'));

// Routes
app.get('/', (req, res) => {
  res.render('accueil');
});

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Route pour afficher le formulaire de création de client
app.get('/clients/new', (req, res) => {
  res.render('newClient');
});

// Route pour ajouter un nouveau client
app.post('/clients', (req, res) => {
  const { nom, email, type_assurance } = req.body;
  req.getConnection((err, connection) => {
    if (err) return res.send(err);

    const query = 'INSERT INTO clients (nom, email, type_assurance) VALUES (?, ?, ?)';
    connection.query(query, [nom, email, type_assurance], (err) => {
      if (err) return res.send(err);

      res.redirect('/menu');
    });
  });
});



module.exports = app;