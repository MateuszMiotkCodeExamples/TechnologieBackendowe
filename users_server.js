//users_server.js
const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
}));

const users = [
    { id: 1, name: "Jan Kowalski", email: "jan.kowalski@example.com" },
    { id: 2, name: "Anna Nowak", email: "anna.nowak@example.com" },
];

app.get('/users', (req, res) => {
    res.send(users);
});

app.listen(6069, () => {
    console.log('Serwer działa na porcie 6069');
});
