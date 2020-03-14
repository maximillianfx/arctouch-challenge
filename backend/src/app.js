var express = require('express');
const cors = require('./config/cors')
var bodyParser = require("body-parser");
const axios = require('axios').default;
var server = express();

server.use(cors);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

var API_KEY = '1f54bd990f1cdfb230adb312546d765d';
var URL_BASE = 'https://api.themoviedb.org/3/movie/';
var URL_SEARCH = 'https://api.themoviedb.org/3/search/movie';
var URL_BASE_IMAGE_POSTER = 'https://image.tmdb.org/t/p/w342/';
var URL_BASE_IMAGE_BACKDROP = 'https://image.tmdb.org/t/p/w300/';
var URL_BASE_GENRE = 'https://api.themoviedb.org/3/genre/movie/list';
var LANGUAGE = 'es-US';

var genres = [];

var getGenres = async() => {
    let res = await axios.get(URL_BASE_GENRE + '?api_key=' + API_KEY + '&language=' + LANGUAGE);
    let data = res['data']['genres'];
    genres = data;
}

server.get('/genres', function (req, res) {
    if (genres) {
        res.send({code: 200, data: genres});
    } else {
        res.send({code: 500, data: 'Failure to obtain genres'});
    }
    
});

function getGenreName(id) {
    var obj = genres.find((value) => {
        if (value.id == id) {
            return value.name;
        }
    });
    return obj.name;
}

server.post('/genres', function (req, res) {

    if (!req.body.ids) {
        res.send({ code: 404 , data: 'No ids provided' });
    } else if (req.body.ids.length == 0) {
        res.send({ code: 404 , data: 'No ids provided' });
    } else {
        var resultado = [];
        req.body.ids.forEach((value) => {
            const genreName = getGenreName(value.value);
            resultado.push({ id: value.value, name: genreName});
        });
        res.send({ code: 200, data: resultado });
    }
});


server.get('/movies', function (req, res) {
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

server.get('/movies/upcoming', function (req, res) {
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

server.get('/movies/:id', function (req, res) {
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

server.get('/backdrop/:imageLink', function (req, res) {

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

server.get('/poster/:imageLink', function (req, res) {

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

server.listen(3000, function () {
    getGenres();
    console.log('Arctouch App listening on port 3000!');
});