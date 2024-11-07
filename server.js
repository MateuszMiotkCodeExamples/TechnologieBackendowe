const express = require('express');
const app = express();

// Middleware do parsowania JSON
app.use(express.json());

// Trasa główna - zwraca "Hello, My server using Express"
app.get('/', (req, res) => {
    res.send('Hello, My server using Express');
});

// Trasa do sprawdzania akceptowanych typów MIME
app.get('/check-accepts', (req, res) => {
    if (req.accepts('html')) {
        res.send('Klient akceptuje HTML');
    } else if (req.accepts('application/json')) {
        res.json({ message: 'Klient akceptuje JSON' });
    } else {
        res.status(406).send('Nieakceptowany typ MIME');
    }
});

// Trasa do pobierania nagłówka Content-Type
app.post('/content-type', (req, res) => {
    const contentType = req.get('Content-Type');
    res.send(`Content-Type żądania: ${contentType}`);
});

// Trasa z parametrem dynamicznym
app.get('/user/:name', (req, res) => {
    const userName = req.params;
    res.send(`Witaj, ${userName.name}!`);
});

// Uruchomienie serwera na porcie 8081
const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Serwer nasłuchuje pod adresem http://${host}:${port}`);
});
