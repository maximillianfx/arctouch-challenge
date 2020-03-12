var express = require('express');
const axios = require('axios').default;
var app = express();

var API_KEY = '1f54bd990f1cdfb230adb312546d765d';
var URL_BASE = 'https://api.themoviedb.org/3/movie/';
var URL_SEARCH = 'https://api.themoviedb.org/3/search/movie';
var URL_BASE_IMAGE_POSTER = 'https://image.tmdb.org/t/p/w342/';
var URL_BASE_IMAGE_BACKDROP = 'https://image.tmdb.org/t/p/w780/';
var LANGUAGE = 'es-US';

app.get('/movies', function (req, res) {
    if (!req.query.search) {
        res.send({ code: 404, data: 'The search needs a valid string. Ex.: /api/v1/movies?search=text' });
    } else if(!req.query.page || !parseInt(req.query.page)) {
        res.send({ code: 404, data: 'Page must be a integer' });
    } else {
        axios.get(URL_SEARCH + '?api_key=' + API_KEY + '&language=' + LANGUAGE + '&query=' + req.query.search + '&page=' + req.query.page)
            .then(function (response) {
                //Handle success request
                res.send({ code: response.status, data: response.data });
            })
            .catch(function (error) {
                // Handle error from request
                res.send({ code: error.response.status, data: error.response.data.status_message })
            });
    }
});

app.get('/movies/upcoming', function (req, res) {
    if (!req.query.page || !parseInt(req.query.page)) {
        res.send({ code: 404, data: 'Page must be a integer' })

    } else {
        axios.get(URL_BASE + 'upcoming?api_key=' + API_KEY + '&language=' + LANGUAGE + '&page=' + req.query.page)
            .then(function (response) {
                //Handle success request
                res.send({ code: response.status, data: response.data });
            })
            .catch(function (error) {
                // Handle error from request
                res.send({ code: error.response.status, data: error.response.data.status_message })
            });
    }
});

app.get('/movies/:id', function (req, res) {
    if (!req.params.id || !parseInt(req.params.id)) {
        res.send({ code: 404, data: 'ID must be an integer' })
    } else {
        axios.get(URL_BASE + req.params.id + '?api_key=' + API_KEY + '&language=' + LANGUAGE)
            .then(function (response) {
                //Handle success request
                res.send({ code: response.status, data: response.data });
            })
            .catch(function (error) {
                // Handle error from request
                res.send({ code: error.response.status, data: error.response.data.status_message })
            });
    }
});

app.get('/backdrop/:imageLink', function (req, res) {

    if (!req.params.imageLink) {
        res.send({ code: 404, data: 'Invalid imagelink' });
    } else {

        const imageFile = req.params.imageLink;
        axios.get(URL_BASE_IMAGE_BACKDROP + imageFile,
            {
                responseType: 'arraybuffer'
            }).then((response) => {
                //Handle the success request for image poster or backdrop
                res.send({ code: response.status, data: Buffer.from(response.data, 'binary').toString('base64') });
            }).catch(function (error) {
                // Handle error from request
                res.send({ code: error.response.status, data: error.message })
            });

    }
});

app.get('/poster/:imageLink', function (req, res) {

    if (!req.params.imageLink) {
        res.send({ code: 404, data: 'ID must be an integer/Invalid imagelink' });
    } else {

        const imageFile = req.params.imageLink;
        axios.get(URL_BASE_IMAGE_POSTER + imageFile,
            {
                responseType: 'arraybuffer'
            }).then((response) => {
                //Handle the success request for image poster or backdrop
                res.send({ code: response.status, data: Buffer.from(response.data, 'binary').toString('base64') });
            }).catch(function (error) {
                // Handle error from request
                res.send({ code: error.response.status, data: error.message })
            });

    }
});

app.listen(3000, function () {
    console.log('Arctouch App listening on port 3000!');
});