const express = require('express');
const app = express();

// Konfiguracja Handlebars
app.set('view engine', 'handlebars');

// Importowanie i użycie tras
require('./routes2')(app);

// Obsługa błędu 404
app.use((req, res) => {
    res.status(404).send('404: Strona nie znaleziona');
});

// Uruchomienie serwera
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});