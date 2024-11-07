const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Importowanie body-parser
const app = express();
const router = express.Router();

// Middleware do parsowania JSON i URL-encoded za pomocą body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware na poziomie aplikacji - logowanie czasu żądania
app.use((req, res, next) => {
    console.log('Log czasu żądania:', new Date().toISOString());
    next();
});

// Middleware na poziomie routera - logowanie renderowania strony zamówienia
router.use((req, res, next) => {
    console.log('Renderowanie strony szczegółów zamówienia');
    next();
});

// Trasa zamontowana na routerze
router.get('/order/:id', (req, res) => {
    res.send(`Szczegóły zamówienia dla ID: ${req.params.id}`);
});

// Middleware zamontowane na trasie /employee/:id - logowanie metody HTTP
app.use('/employee/:id', (req, res, next) => {
    console.log('Typ metody HTTP użytej w żądaniu:', req.method);
    next();
});

// Middleware sekwencyjne na trasie /employee/:id z parametrem isActive
app.use('/employee/:id', (req, res, next) => {
    const isActive = req.query.isActive;

    if (isActive === 'true') {
        console.log('ID żądania:', req.params.id);
        next();
    } else {
        res.status(400).send('Parametr isActive jest wymagany i musi być ustawiony na true');
    }
}, (req, res, next) => {
    console.log('Czy aktywny:', req.query.isActive);
    res.send(`Employee z ID - ${req.params.id}, Status aktywności: ${req.query.isActive}`);
});

// Middleware do uwierzytelniania
function authMiddleware(req, res, next) {
    console.log('Uwierzytelnianie żądania...');
    // Tutaj można dodać logikę uwierzytelniania
    next();
}

// Middleware do logowania informacji aplikacji
function logMiddleware(req, res, next) {
    console.log('Logowanie informacji o żądaniu...');
    next();
}

// Tablica middleware do wielokrotnego użycia
const logStuff = [authMiddleware, logMiddleware];

// Trasa z użyciem tablicy middleware
app.get('/order/:id', logStuff, (req, res, next) => {
    res.send('Szczegóły zamówienia...');
});

// Trasa główna - zwraca "Hello, My server using Express"
app.get('/', (req, res) => {
    res.send('Hello, My server using Express');
});

// Trasa POST wykorzystująca body-parser do odbioru danych
app.post('/submit', (req, res) => {
    const receivedData = req.body;
    console.log('Odebrane dane:', receivedData);
    res.send('Dane zostały odebrane i przetworzone');
});

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Mountowanie routera na aplikacji
app.use('/', router);

// Uruchomienie serwera na porcie 8081
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Serwer nasłuchuje pod adresem http://${host}:${port}`);
});
