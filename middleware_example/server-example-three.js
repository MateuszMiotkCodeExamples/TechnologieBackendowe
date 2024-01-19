const express = require('express');
const session = require('express-session');
const app = express();
const requiresWaiver = require('./lib/tourRequiresViewer');
app.use(session({
    secret: 'TwojSekret',
    resave: false,
    saveUninitialized: true
}));

// Middleware do sprawdzania wymaganej zgody

app.use(requiresWaiver);


const products = [
    { id: 1, name: 'Tour A', requiresWaiver: false },
    { id: 2, name: 'Tour B', requiresWaiver: true }
];

// Strona główna
app.post('/add-to-cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).send('Produkt nie znaleziony');
    }

    if (!req.session.cart) {
        req.session.cart = { items: [], warnings: [] };
    }

    req.session.cart.items.push({ product });
    res.send('Produkt dodany do koszyka');
});

app.get('/cart', (req, res) => {
    if (!req.session.cart) {
        return res.send('Koszyk jest pusty');
    }

    res.json(req.session.cart);
});

app.post('/checkout', (req, res) => {
    if (!req.session.cart || req.session.cart.items.length === 0) {
        return res.status(400).send('Koszyk jest pusty');
    }

    // Tutaj można dodać logikę realizacji zamówienia
    req.session.cart = null; // Czyszczenie koszyka po realizacji zamówienia
    res.send('Zamówienie zostało zrealizowane');
});


// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
