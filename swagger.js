// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Blog Post API',
        description: 'API do zarządzania wpisami na blogu'
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js', './routes/students.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js'); // Uruchomienie aplikacji po wygenerowaniu dokumentacji
});
