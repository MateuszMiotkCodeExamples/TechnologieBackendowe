const express = require('express');
const session = require('express-session');
const cartValidation = require('./lib/cartValidation');

const app = express();

// Konfiguracja sesji
app.use(session({
    secret: 'TwojSekret',
    resave: false,
    saveUninitialized: true
}));

// Middleware do walidacji koszyka
app.use(cartValidation.resetValidation);
app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);

// Definicja przykładowych produktów
const products = [
    { id: 1, name: 'Tour A', requiresWaiver: false, maxGuests: 5 },
    { id: 2, name: 'Tour B', requiresWaiver: true, maxGuests: 10 }
];

app.post('/add-to-cart/:productId/:guests', (req, res) => {
    const productId = parseInt(req.params.productId);
    const guests = parseInt(req.params.guests);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).send('Produkt nie znaleziony');
    }

    if (!req.session.cart) {
        req.session.cart = { items: [], warnings: [], errors: [] };
    }
    req.session.cart.items.push({ product, guests });
    res.send('Produkt dodany do koszyka');
});

// Wyświetlanie koszyka
app.get('/cart', (req, res) => {
    if (!req.session.cart) {
        return res.send('Koszyk jest pusty');
    }
    res.json(req.session.cart);
});

// Realizacja zamówienia
app.post('/checkout', (req, res) => {
    if (!req.session.cart || req.session.cart.items.length === 0) {
        return res.status(400).send('Koszyk jest pusty');
    }
    req.session.cart = null; // Czyszczenie koszyka
    res.send('Zamówienie zostało zrealizowane');
});

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
