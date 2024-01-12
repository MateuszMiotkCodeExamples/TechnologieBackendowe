const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const {engine} = require("express-handlebars");
const fileAccess = promisify(fs.access);

const autoViews = {};

app.set('view cache', true)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(async (req, res, next) => {
    const reqPath = req.path.toLowerCase();
    if (autoViews[reqPath]) return res.render(autoViews[reqPath]);

    const viewPath = path.join(__dirname, '/views', reqPath + '.handlebars');
    try {
        await fileAccess(viewPath, fs.constants.R_OK);
        autoViews[reqPath] = reqPath.replace(/^\//, '');
        return res.render(autoViews[reqPath]);
    } catch (err) {
        // Plik nie istnieje, przekazujemy do obsługi błędu 404
        next();
    }
});

app.use((req, res) => {
    res.status(404).send('404: Nie znaleziono');
});
// Konfiguracja obsługi błędów i innych middleware/routów...

const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
