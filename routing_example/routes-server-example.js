const express = require('express');
const routes = require('./routes');
const app = express();

// Dynamiczne dodawanie tras zdefiniowanych w routes.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

// Middleware dla obsługi 404
app.use((req, res, next) => {
    res.status(404).send('404: Strona nie znaleziona');
});

// Middleware dla obsługi błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500: Błąd serwera');
});

// Uruchomienie serwera
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
