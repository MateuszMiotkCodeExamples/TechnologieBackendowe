//server.js
const express = require("express");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes");
require('dotenv').config(); // Ładowanie zmiennych środowiskowych z pliku .env

// Tworzymy aplikację Express.
const app = express();
app.use(express.json());

// Pobieramy URI bazy danych i port z pliku .env
const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;

// Nawiązywanie połączenia z MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Połączono z bazą danych MongoDB");
    })
    .catch(err => {
        console.error("Błąd połączenia z MongoDB:", err);
    });

// Używamy tras z katalogu `routes/`
app.use("/", employeeRoutes);

// Uruchamiamy serwer na zadanym porcie.
app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Serwer nasłuchuje na porcie ${PORT}`);
    }
});
