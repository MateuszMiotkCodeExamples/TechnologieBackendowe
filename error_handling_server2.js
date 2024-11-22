//error_handling_server2.js
const express = require('express');
const axios = require('axios');
const app = express();

// Definicja funkcji obsługi błędów
const errorHandler = (error, request, response, next) => {
    console.log(`error: ${error.message}`);
    const status = error.statusCode || 400;
    // Zwrócenie zrozumiałego komunikatu o błędzie do klienta
    response.status(status).send(error.message);
};

// Przykładowa trasa z obsługą błędów
app.get('/users', async (request, response, next) => {
    try {
        const apiResponse = await axios.get('http://localhost:3001/users');
        const jsonResponse = apiResponse.data;
        response.send(jsonResponse);
    } catch (error) {
        next(error); // Przekazanie błędu do middleware obsługującego błędy
    }
});

// Dodanie middleware do obsługi błędów
app.use(errorHandler);

const port = 3000;
app.listen(port, () => console.log(`Serwer nasłuchuje na porcie ${port}.`));
