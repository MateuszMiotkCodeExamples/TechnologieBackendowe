// app.js
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const studentsRouter = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware do parsowania JSON w ciele żądań
app.use(bodyParser.json());

// Routing do zasobu /students
app.use('/students', studentsRouter);

// Konfiguracja Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint główny
app.get('/', (req, res) => {
    res.send('Hello, My server using Express');
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
