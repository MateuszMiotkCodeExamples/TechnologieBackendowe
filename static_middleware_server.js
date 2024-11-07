const express = require('express');
const path = require('path');
const app = express();

// Middleware na poziomie aplikacji - logowanie czasu żądania
app.use((req, res, next) => {
    console.log('Log czasu żądania:', new Date().toISOString());
    next();
});

// Middleware do serwowania statycznych plików z katalogu 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware do obsługi błędów 404
app.use((req, res, next) => {
    res.status(404).send('Strona nie znaleziona');
});

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Wewnętrzny błąd serwera');
});

// Uruchomienie serwera na porcie 3000
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na http://localhost:${PORT}`);
});
