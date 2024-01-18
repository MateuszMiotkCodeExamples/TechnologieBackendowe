const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`processing request for ${req.url}....`)
    next()
})
app.use((req, res, next) => {
    console.log('terminating request')
    res.send('thanks for playing!')
    // zauważ, że tutaj NIE wywołujemy next()...to kończy żądanie
})
app.use((req, res, next) => {
    console.log(`whoops, i'll never get called!`)
})

const port = 3000;
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});