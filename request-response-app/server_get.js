//server_get.js
const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const {engine} = require("express-handlebars");
app.set('view cache', true)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

app.disable('x-powered-by')

// basic usage
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/error', (req, res) => res.status(500).render('error'))

app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello esteemed programmer!',
        style: req.query.style,
    })
})

app.get('/no-layout', (req, res) =>
    res.render('no-layout', { layout: null })
)

app.get('/custom-layout', (req, res) =>
    res.render('custom-layout', { layout: 'custom' })
)

app.get('/text', (req, res) => {
    res.type('text/plain')
    res.send('this is a test')
})

app.use((err, req, res, next) => {
    console.error('** SERVER ERROR: ' + err.message)
    res.status(500).render('error',
        { message: "you shouldn't have clicked that!" })
})

app.use((req, res) =>
    res.status(404).render('404')
)
app.listen(port, () => "Server listening on port: ${port}");