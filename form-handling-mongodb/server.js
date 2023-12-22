const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const {engine, create} = require("express-handlebars");
const handlers = require("./handlers");
const {render} = require("express/lib/application");
require('./db')
app.set('view cache', true)
const hbs = create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }}
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res) => res.render("home"));
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

const multiparty = require('multiparty')
app.get('/vacation-photo', handlers.vacationPhotoContest)
app.get('/vacation-photo-thank-you',handlers.vacationPhotoContestProcessThankYou)
app.post('/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(500).send({ error: err.message })
        handlers.api.vacationPhotoContest(req, res, fields, files)
    })
})
app.get('/create-vacations', handlers.createVacations)
app.get('/vacations', handlers.listVacations)
app.get('/notify-me-when-in-season', handlers.notifyWhenInSeasonForm)
app.post('/notify-me-when-in-season', handlers.notifyWhenInSeasonProcess)

app.use((err, req, res, next) => {
    console.error('** SERVER ERROR: ' + err.message)
    res.status(500).render('error',
        { message: "you shouldn't have clicked that!" })
})

app.use((req, res) =>
    res.status(404).render('404')
)
app.listen(port, () => "Server listening on port: ${port}");