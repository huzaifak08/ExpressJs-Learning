const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/about', (req, res) => {
    // res.send('This is about page');
    // res.sendFile(path.join(__dirname, 'index.html'));
    // res.status(500);
    res.json({ "Hunny": 34 });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

// Serve a static folder(public) using express:
app.use(express.static(path.join(__dirname, 'public')));

/*
// Use and create middleware:
const hunnyMiddleWare = (req, res, next) => {
    console.log(req);
    next();
}

app.use(hunnyMiddleWare);
*/

// Get name in url:
app.get('/hello/:name', (req, res) => {
    res.send('Helloworld' + req.params.name);
});