//server_post.js
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const {engine} = require("express-handlebars");
app.set('view cache', true)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/thankYou", (req,res) => {res.render('thankYou')})

//uruchomic z żądaniem następującym:
// POST http://localhost:3000/process-contact
//     Accept: application/json
// Content-Type: application/json
//
// {
//     "name": "Mateusz Miotk",
//     "email": "mmiotk@pjwstk.edu.pl"
// }
// app.post('/process-contact', (req, res) => {
//     console.log(`received contact from ${req.body.name} <${req.body.email}>`)
//     console.log(req.body);
//     res.redirect(303, 'thankYou')
// })

//uruchomic z żądaniem następującym:
// POST http://localhost:3000/process-contact
//     Accept: application/json
// Content-Type: application/json
//
// {
//     "emails": "mmiotk@pjwstk.edu.pl"
// }
app.post('/process-contact', (req, res) => {
    try {
// here's where we would try to save contact to database or other
// persistence mechanism...for now, we'll just simulate an error
        if(!req.body.email) throw new Error("error saving contact!")
        console.log(`contact from ${req.body.name} <${req.body.email}>`)
        res.format({
            'text/html': () => res.redirect(303, '/thank-you'),
            'application/json': () => res.json({ success: true }),
        })
    } catch(err) {
// here's where we would handle any persistence failures
        console.error(`error processing contact from ${req.body.name} ` +
            `<${req.body.email}>`)
        res.format({
            'text/html': () => res.redirect(303, '/contact-error'),
            'application/json': () => res.status(500).json({
                error: 'error saving contact information' }),
        })
    }
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