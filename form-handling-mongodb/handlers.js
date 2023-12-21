//handlers.js
const pathUtils = require('path')
const fs = require('fs')
// create directory to store vacation photos (if it doesn't already exist)
const dataDir = pathUtils.resolve(__dirname, '..', 'data')
const vacationPhotosDir = pathUtils.join(dataDir, 'vacation-photos')
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
if(!fs.existsSync(vacationPhotosDir)) fs.mkdirSync(vacationPhotosDir)
function saveContestEntry(contestName, email, year, month, photoPath) {
// TODO...this will come later
}
// we'll want these promise-based versions of fs functions later
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const rename = promisify(fs.rename)

const db = require('./db')

exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}
exports.newsletterSignupProcess = (req, res) => {
    console.log('Form (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req, res) =>
    res.render('newsletter-signup-thank-you')

exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}

exports.api = {
    newsletterSignup: (req, res) => {
        console.log('Token CSRF (z ukrytego pola formularza): ' + req.body._csrf)
        console.log('Imię (z widocznego pola formularza): ' + req.body.name)
        console.log('Email (z widocznego pola formularza): ' + req.body.email)
        res.send({ result: 'success' })
    },
}

exports.vacationPhotoContest = (req, res) => {
    const now = new Date()
    res.render('vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestProcessThankYou = (req, res) => {
    res.render('vacation-photo-thank-you')
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.redirect(303, '/vacation-photo-thank-you')
}

exports.api.vacationPhotoContest = async (req, res, fields, files) => {
    const photo = files.photo[0]
    const dir = vacationPhotosDir + '/' + Date.now()
    const path = dir + '/' + photo.originalFilename
    await mkdir(dir)
    await rename(photo.path, path)
    saveContestEntry('vacation-photo', fields.email,
        req.params.year, req.params.month, path)
    res.send({ result: 'success' })
}

exports.listVacations = async (req, res) => {
    const vacations = await db.getVacations({ available: true })
    const context = {
        vacations: vacations.map(vacation => ({
            sku: vacation.sku,
            name: vacation.name,
            description: vacation.description,
            price: '$' + vacation.price.toFixed(2),
            inSeason: vacation.inSeason,
        }))
    }
    res.render('vacations', context)
}

exports.notifyWhenInSeasonForm = (req, res) =>
    res.render('notify-me-when-in-season', { sku: req.query.sku })
exports.notifyWhenInSeasonProcess = async (req, res) => {
    const { email, sku } = req.body
    await db.addVacationInSeasonListener(email, sku)
    return res.redirect(303, '/vacations')
}