// routes/movies.js
const express = require('express');
const router = express.Router();
const path = require('path');
let movies = require('../data/movies');

// Pobierz wszystkie filmy i wyświetl listę
router.get('/', (req, res) => {
    res.render('movies/list', { movie: movies[0] });
});

module.exports = router;