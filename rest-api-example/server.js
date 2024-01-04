const express = require('express');
const app = express()
const port = process.env.PORT || 3000
app.set('view cache', true)
const api = require('./api.js')
const cors = require('cors')
app.use('/api', cors())
app.get('/api/createVacations', api.createVacations)
app.get('/api/vacations', api.getVacationsApi)
app.get('/api/vacation/:sku', api.getVacationBySkuApi)
app.post('/api/vacation/:sku/notify-when-in-season', api.addVacationInSeasonListenerApi)
app.delete('/api/vacation/:sku', api.requestDeleteVacationApi)

app.use((err, req, res, next) => {
    console.error('** SERVER ERROR: ' + err.message)
    res.status(500).render('error',
        { message: "you shouldn't have clicked that!" })
})

app.use((req, res) =>
    res.status(404).render('404')
)
app.listen(port, () => "Server listening on port: ${port}");