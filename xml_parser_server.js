const express = require('express');
const bodyParser = require('body-parser');
const mung = require('express-mung');
const parseString = require('xml2js').parseString;
const { Builder } = require('xml2js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: () => true }));


// Transformacja danych żądania
app.use((req, res, next) => {
    if (/\/xml$/.test(req.headers['content-type'])) {
        parseString(req.body.toString(), function (err, result) {
            console.dir(result);
            req.body = result;
        });
    }
    next();
});

app.use(mung.json((body, req, res) => {
    if (/\/xml$/.test(req.originalUrl)) {
        const builder = new Builder();
        const xml = builder.buildObject(body);
        res.set('Content-Type', 'application/xml');
        return xml;
    }
    return body;
}));

app.post('/xml-to-json', (req, res) => {
    // Zakładamy, że middleware już przekształcił XML na JSON i umieścił w req.body
    res.json(req.body);
});

app.get('/api/sample', (req, res) => {
    const data = {
        message: "To jest przykładowa odpowiedź",
        timestamp: new Date()
    };
    res.json(data);
});

app.get('/api/sample/xml', (req, res) => {
    const data = {
        message: "To jest przykładowa odpowiedź",
        timestamp: new Date()
    };
    res.json(data);
});


app.listen(3000, () => console.log('Serwer działa na porcie 3000'));
