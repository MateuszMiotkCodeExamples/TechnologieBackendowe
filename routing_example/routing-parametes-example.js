const express = require('express');
const {engine} = require("express-handlebars");

const app = express();

// Konfiguracja Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const staff = {
    mitch: { name: "Mitch", bio: 'Mitch is the man to have at your back in a bar fight.' },
    madeline: { name: "Madeline", bio: 'Madeline is our Oregon expert.' },
    walt: { name: "Walt", bio: 'Walt is our Oregon Coast expert.' },
}

app.get('/staff/:name', (req, res, next) => {
    const info = staff[req.params.name];
    if (!info) return next(); // Przejście do obsługi 404, jeśli nie ma pracownika
    res.render('05-staffer', info);
});


const staff2 = {
    portland: {
        mitch: { name: "Mitch", bio: 'Mitch is the man to have at your back.' },
        madeline: { name: "Madeline", bio: 'Madeline is our Oregon expert.' },
    },
    bend: {
        walt: { name: "Walt", bio: 'Walt is our Oregon Coast expert.' },
    },
}
app.get('/staff/:city/:name', (req, res, next) => {
    const cityStaff = staff2[req.params.city]
    if(!cityStaff) return next() // nieznane miasto -> 404
    const info = cityStaff[req.params.name]
    if(!info) return next()
    res.render('05-staffer', info)
})

// ... (potencjalna obsługa błędu 404)

app.use((req, res) => {
    res.status(404).send('404: Nie znaleziono');
});


// Uruchomienie serwera
const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
