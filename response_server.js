//response_server.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware do parsowania JSON i URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trasa główna - zwraca "Hello, My server using Express"
app.get('/', (req, res) => {
    res.send('Hello, My server using Express');
});

// Trasa używająca res.append()
app.get('/append', (req, res) => {
    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
    res.append('Warning', '199 Miscellaneous warning');
    res.send('Dodano nagłówki Link i Warning');
});

// Trasa używająca res.attachment()
app.get('/attachment', (req, res) => {
    const filePath = path.join(__dirname, 'path/to/js_pic.png');
    res.attachment(filePath);
    res.send('Plik został wysłany jako załącznik');
});

// Trasa używająca res.cookie()
app.get('/set-cookie', (req, res) => {
    res.cookie('Section', { Names: ['raj', 'sunil', 'ajay'] });
    res.cookie('Cart', { items: [1, 2, 3] }, { maxAge: 900000 });
    res.send('Ciasteczka zostały ustawione');
});

// Trasa używająca res.clearCookie()
app.get('/clear-cookie', (req, res) => {
    res.clearCookie('Section', { path: '/' });
    res.send('Ciasteczko Section zostało usunięte');
});

// Trasa używająca res.download()
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'file.txt');
    res.download(filePath, 'file.txt', (err) => {
        if (err) {
            res.status(500).send('Błąd podczas pobierania pliku');
        }
    });
});

// Trasa używająca res.json()
app.get('/json', (req, res) => {
    res.json({ name: 'ajeet' });
});

// Trasa używająca res.jsonp()
app.get('/jsonp', (req, res) => {
    res.jsonp({ data: 'Przykład JSONP' });
});

// Trasa używająca res.redirect()
app.get('/redirect', (req, res) => {
    res.redirect('http://example.com');
});

// Trasa używająca res.render()
// Zakładamy, że mamy ustawiony silnik widoków, np. Pug
app.set('view engine', 'pug');
app.get('/render', (req, res) => {
    res.render('index', { title: 'Strona główna', message: 'Witaj w Express.js!' });
});

// Trasa używająca res.send()
app.get('/send', (req, res) => {
    res.send('Przykład metody res.send()');
});

// Trasa używająca res.sendFile()
app.get('/send-file', (req, res) => {
    const filePath = path.join(__dirname, 'file.txt');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Błąd podczas wysyłania pliku');
        }
    });
});

// Trasa używająca res.status()
app.get('/status', (req, res) => {
    res.status(404).send('Nie znaleziono zasobu');
});

// Uruchomienie serwera na porcie 8081
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Serwer nasłuchuje pod adresem http://${host}:${port}`);
});
