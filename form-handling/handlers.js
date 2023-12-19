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

exports.api.vacationPhotoContest = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.send({ result: 'success' })
}