// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const movieRouter = require('./routes/movies');

const app = express();

// Ustawienie Pug jako silnika szablonów
app.set('view engine', 'pug');

// Opcjonalnie, zmiana domyślnego katalogu na 'views'
app.set('views', path.join(__dirname, 'views'));

// Serwowanie statycznych plików
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(morgan('common', { immediate: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Trasy
app.use('/movies', movieRouter);

// Trasa główna przekierowująca do listy filmów
app.get('/', (req, res) => res.redirect('/movies'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});