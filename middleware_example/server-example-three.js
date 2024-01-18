const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'tajny_klucz', // Zmień na bezpieczny klucz w produkcji
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = { items: [] };
    }
    next();
});

app.post('/add-to-cart/:tourId', (req, res) => {
    const { tourId } = req.params;
    req.session.cart.items.push({ tourId });
    res.send(`Dodano wycieczkę o ID ${tourId} do koszyka.`);
});

app.get('/cart', (req, res) => {
    res.json(req.session.cart);
});

app.get('/test', (req, res) => {
    if (req.session.testCount) {
        req.session.testCount += 1;
    } else {
        req.session.testCount = 1;
    }
    res.send(`Licznik sesji: ${req.session.testCount}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serwer Express uruchomiony na http://localhost:${port}; naciśnij Ctrl-C, aby zakończyć.`);
});
