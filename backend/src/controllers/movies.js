
const axios = require('axios').default;
module.exports.controller = function(server, utils) {
    server.get('/api/'+ utils.API_VERSION +'/movies', function (req, res) {
        if (!req.query.search) {
            res.send({ code: 404, data: 'The search needs a valid string. Ex.: /api/v1/movies?search=text' });
        } else if(!req.query.page || !parseInt(req.query.page)) {
            res.send({ code: 404, data: 'Page must be a integer' });
        } else {
            axios.get(utils.URL_SEARCH + '?api_key=' + utils.API_KEY + '&language=' + utils.LANGUAGE + '&query=' + req.query.search + '&page=' + req.query.page)
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
    
    server.get('/api/'+ utils.API_VERSION +'/movies/upcoming', function (req, res) {
        if (!req.query.page || !parseInt(req.query.page)) {
            res.send({ code: 404, data: 'Page must be a integer' })
    
        } else {
            axios.get(utils.URL_BASE + 'upcoming?api_key=' + utils.API_KEY + '&language=' + utils.LANGUAGE + '&page=' + req.query.page)
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
    
    server.get('/api/'+ utils.API_VERSION +'/movies/:id', function (req, res) {
        if (!req.params.id || !parseInt(req.params.id)) {
            res.send({ code: 404, data: 'ID must be an integer' })
        } else {
            axios.get(utils.URL_BASE + req.params.id + '?api_key=' + utils.API_KEY + '&language=' + utils.LANGUAGE)
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
}