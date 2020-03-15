const axios = require('axios').default;
const utils = require('../config/utils')


module.exports.controller = function(server, utils) {
    getGenres();
    server.get('/api/'+ utils.API_VERSION +'/genres', function (req, res) {
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
    
    server.post('/api/'+ utils.API_VERSION +'/genres', function (req, res) {
    
        if (!req.body.ids) {
            res.send({ code: 404 , data: 'No ids provided' });
        } else if (req.body.ids.length == 0) {
            res.send({ code: 404 , data: 'No ids provided' });
        } else {
            var resultado = [];
            req.body.ids.forEach((value) => {
                const genreName = getGenreName(value);
                resultado.push({ id: value, name: genreName});
            });
            res.send({ code: 200, data: resultado });
        }
    });   
}

var genres = [];

var getGenres = async() => {
    let res = await axios.get(utils.URL_BASE_GENRE + '?api_key=' + utils.API_KEY + '&language=' + utils.LANGUAGE);
    let data = res['data']['genres'];
    genres = data;
}