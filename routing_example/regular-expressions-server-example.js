const express = require('express');
const app = express();

// Trasa z Opcjonalnym Fragmentem
app.get('/user(name)?', (req, res) => {
    res.send('user');
});

// Trasa z Jednym lub Więcej Wystąpień
app.get('/khaa+n', (req, res) => {
    res.send('khaaan');
});

// Trasa z Wyrażeniem Regularnym
app.get(/crazy|mad(ness)?|lunacy/, (req, res) => {
    res.send('madness');
});

// Uruchomienie serwera
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
