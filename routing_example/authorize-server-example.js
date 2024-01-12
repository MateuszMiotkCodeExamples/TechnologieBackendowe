const express = require('express');
const session = require('express-session');
const {engine} = require("express-handlebars");

const app = express();

app.use(session({
    secret: 'TwojTajnyKlucz', // Użyj bezpiecznego, losowego klucza
    resave: false,
    saveUninitialized: true
}));

// Konfiguracja Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Funkcja middleware do autoryzacji
function authorize(req, res, next) {
    if(req.session.authorized) return next();
    res.render('not-authorized');
}

// Definicje tras
app.get('/public', (req, res) => res.render('public'));
app.get('/secret', authorize, (req, res) => res.render('secret'));

app.get('/login', (req, res) => {
    req.session.authorized = true; // Ustawienie użytkownika jako autoryzowanego
    res.send("Zostałeś zalogowany i autoryzowany do dostępu do sekretnych stron.");
});

// Punkt końcowy do wylogowania
app.get('/logout', (req, res) => {
    req.session.authorized = false; // Usunięcie autoryzacji użytkownika
    res.send("Zostałeś wylogowany.");
});

// Uruchomienie serwera
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
