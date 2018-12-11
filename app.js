const request = require('request');
const express = require('express');
const hbs = require('hbs');
const pixabay = require('./pixbay')

var app = express();

const port process.env.PORT || 8080;

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (request, response) => {
    response.redirect('/home');
});

app.get('/home', (request, response) => {
    response.render('home.hbs');
});

app.get('/image', (request, response) => {
    response.render('img.hbs', {
        parsed: ''
    });
});

app.post('/image', (request, response) => {
    pixabay.getImages(request.body.searchQuery).then((result) => {
        response.render('img.hbs', {
            parsed: pixabay.parseImages(result)
        }).catch((error) => {
            response.render('img.hbs', {
                parsed: error
            });
        });
    });
});

app.get('/weather', (request, response) => {
    response.render('weather.hbs', {
        parsed: ''
    });
});

app.listen(port, () => {
    console.log('Server is up on the port 8080');
});



