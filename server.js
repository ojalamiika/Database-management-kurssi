import express from "express";

var app = express();

app.listen(3001, () => {
    console.log('Running!n')
})

app.get('/', (req, res) => {
    res.send('LiibaLaaba')
})

app.get('/user', (req, res) => {
    res.send('Getting user information')
})