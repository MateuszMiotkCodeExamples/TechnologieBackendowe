//error_handling_server.js
const express = require('express');
const app = express();

// Obsługa żądania POST dla ścieżki /employees
app.post('/employees', (request, response) => {
    const name = request.body.name;

    // Sprawdzenie warunku błędu
    if (name == null) {
        // Logowanie błędu
        console.log("błąd wejścia");

        // Zwrócenie odpowiedzi z błędem
        response.status(400).json({ message: "Pole obowiązkowe: brak nazwy" });
    } else {
        const empCreationResponse = { result: "success" };
        // Zwrócenie odpowiedzi sukcesu
        response.json(empCreationResponse);
    }
});

app.get('/employees', async (request, response) => {
    try {
        const apiResponse = await axios.get("http://localhost:3001/employees");
        const jsonResponse = apiResponse.data;
        console.log("odpowiedź " + jsonResponse);
        response.send(jsonResponse);
    } catch(error) {
        // Zwrócenie odpowiedzi z błędem
        response.status(500).json({ message: "Błąd podczas wywołania API: /employees" });
    }
});

app.get('/userswitherror', (request, response) => {
    // Rzucenie błędu z kodem statusu 400
    let error = new Error(`processing error in request at ${request.url}`);
    error.statusCode = 400;
    throw error;
});


app.listen(3000, () => console.log('Serwer działa na porcie 3000'));