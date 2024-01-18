//server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const { credentials } = require('./config');

const app = express();

app.use(cookieParser(credentials.cookieSecret));

app.get('/', (req, res) => {
    if (req.cookies.monster) {
        res.send(`Ciasteczko monster: ${req.cookies.monster}`);
    } else {
        res.cookie('monster', 'nom nom');
        res.send('Ciasteczko monster zostało ustawione.');
    }
});

app.get('/signed', (req, res) => {
    if (req.signedCookies.signed_monster) {
        res.send(`Podpisane ciasteczko monster: ${req.signedCookies.signed_monster}`);
    } else {
        res.cookie('signed_monster', 'nom nom', { signed: true });
        res.send('Podpisane ciasteczko monster zostało ustawione.');
    }
});

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('monster');
    res.send('Ciasteczko "monster" zostało usunięte.');
});
app.get('/clear-signed-cookie', (req, res) => {
    res.clearCookie('signed_monster');
    res.send('Podpisane ciasteczko "signed_monster" zostało usunięte.');
});



app.listen(3000, () => {
    console.log('Serwer działa na porcie 3000.');
});
