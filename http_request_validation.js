const express = require('express');
const bodyParser = require('body-parser');
const validator = require('./validator');
const { validationResult } = require('express-validator');
const { registrationValidator } = require('./userValidator');
const {handleValidationErrors} = require("./validationErrorHandler");
const {registrationSchema} = require("./validationSchema");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register', validator.registrationValidation, (req, res, next) => {
    // Kod rejestracji
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // Jeśli parametry żądania spełniają kryteria walidacji
        console.log('Rejestracja użytkownika zakończona');
        res.json({"message": "Rejestracja użytkownika powiodła się"});
    } else {
        res.status(400).json({
            errors: errors.array()
        });
    }
});

app.post('/register2', registrationValidator, (req, res) => {
    // Sprawdzenie wyników walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Jeśli są błędy walidacji, zwróć odpowiedź z błędami
        return res.status(400).json({ errors: errors.array() });
    }

    // Logika rejestracji użytkownika (np. zapis do bazy danych)
    const { firstName, lastName, email } = req.body;
    // Tu można dodać kod do tworzenia użytkownika w bazie danych

    // Zwrócenie sukcesu
    res.status(201).json({ message: 'Użytkownik został zarejestrowany pomyślnie.' });
});

app.post('/register3', registrationValidator, handleValidationErrors, (req, res) => {
    // Logika rejestracji użytkownika (np. zapis do bazy danych)
    const { firstName, lastName, email } = req.body;
    // Tu można dodać kod do tworzenia użytkownika w bazie danych

    // Zwrócenie sukcesu
    res.status(201).json({ message: 'Użytkownik został zarejestrowany pomyślnie.' });
});

app.post('/register4', registrationSchema, handleValidationErrors, (req, res) => {
    // Logika rejestracji użytkownika (np. zapis do bazy danych)
    const { firstName, lastName, email, phoneNumber, age, website } = req.body;
    // Tu można dodać kod do tworzenia użytkownika w bazie danych

    // Zwrócenie sukcesu
    res.status(201).json({ message: 'Użytkownik został zarejestrowany pomyślnie.' });
});

app.listen(3000, () => console.log('Serwer działa na porcie 3000'));
