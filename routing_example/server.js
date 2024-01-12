// Importowanie modułu express i vhost
const express = require('express');
const vhost = require('vhost');
const getSpecialsFromDatabase = require('./db.js');
// Inicjalizacja aplikacji Express
const app = express();
const {engine} = require("express-handlebars");
app.set('view cache', true)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Definicja routera dla administratora
const admin = express.Router();
admin.get('*', (req, res) => res.send('Witaj, Adminie!'));

// Używanie vhost dla obsługi subdomeny 'admin'
app.use(vhost('acme.com', admin));

// Definicja zwykłych tras
// app.get('*', (req, res) => res.send('Witaj, Użytkowniku!'));

// Trasa 'fifty-fifty', która losowo decyduje, którą odpowiedź wysłać
app.get('/fifty-fifty', (req, res, next) => {
    // Jeśli wylosowana liczba jest mniejsza niż 0.5, idź do następnego middleware
    if(Math.random() < 0.5) return next();

    // W przeciwnym razie wyślij odpowiedź "sometimes this"
    res.send('sometimes this');
});

// Druga trasa dla '/fifty-fifty', która jest wywoływana tylko wtedy, gdy pierwsza trasa wywoła funkcję next()
app.get('/fifty-fifty', (req, res) => {
    res.send('and sometimes that');
});

app.get('/rgb',
    (req, res, next) => {
        // Około jedna trzecia żądań zwróci "red"
        if(Math.random() < 0.33) return next();
        res.send('red');
    },
    (req, res, next) => {
        // Kolejna jedna trzecia żądań zwróci "green"
        if(Math.random() < 0.5) return next();
        res.send('green');
    },
    (req, res) => {
        // Ostatnia jedna trzecia żądań zwróci "blue"
        res.send('blue');
    }
);

async function getSpecials(req, res, next) {
    try {
        res.locals.specials = await getSpecialsFromDatabase();
        console.log("haha")
        console.log(res.locals.specials);
        next();
    } catch (error) {
        next(error); // Przekazanie błędu do obsługi błędów
    }
}

app.get('/page-with-specials', getSpecials, (req, res) => {
    res.render('page-with-specials'); // Renderowanie widoku z danymi specjalnymi
});

// Obsługa błędów
app.use((err, req, res, next) => {
    // Logowanie błędu
    console.error(err);
    // Wysyłanie odpowiedzi z błędem
    res.status(500).send('Wystąpił błąd serwera');
});

// Uruchomienie serwera na określonym porcie
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
