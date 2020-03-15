var express = require('express');
const cors = require('./config/cors')
var bodyParser = require("body-parser");
const axios = require('axios').default;
var server = express();
const utils = require('./config/utils')

server.use(cors);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const movies = require('./controllers/movies');
movies.controller(server, utils);

const images = require('./controllers/images');
images.controller(server, utils);

const genres = require('./controllers/genres');
genres.controller(server, utils);

server.listen(3000, function () {
    
    console.log('Arctouch App listening on port 3000!');
});