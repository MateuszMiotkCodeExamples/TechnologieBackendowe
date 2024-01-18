//session-server-example.js
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Ustawianie middleware cookie-parser
app.use(cookieParser('MySecret'));

// Konfiguracja sesji
app.use(session({
    secret: 'AnotherSecret',
    resave: false,
    saveUninitialized: true
}));

// Strona główna
app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`<p>Liczba odwiedzin: ${req.session.views}</p>`);
    } else {
        req.session.views = 1;
        res.send('Witamy po raz pierwszy! Odśwież stronę.');
    }
});

app.get('/reset-counter', (req, res) => {
    delete req.session.views;
    res.send('Licznik sesji został zresetowany.');
});

// Uruchomienie serwera
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
