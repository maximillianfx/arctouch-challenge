const axios = require('axios').default;
module.exports.controller = function(server, utils) {
    server.get('/api/'+ utils.API_VERSION +'/backdrop/:imageLink', function (req, res) {

        if (!req.params.imageLink) {
            res.send({ code: 404, data: 'Invalid imagelink' });
        } else {
    
            const imageFile = req.params.imageLink;
            axios.get(utils.URL_BASE_IMAGE_BACKDROP + imageFile,
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
    
    server.get('/api/'+ utils.API_VERSION +'/poster/:imageLink', function (req, res) {
    
        if (!req.params.imageLink) {
            res.send({ code: 404, data: 'ID must be an integer/Invalid imagelink' });
        } else {
    
            const imageFile = req.params.imageLink;
            axios.get(utils.URL_BASE_IMAGE_POSTER + imageFile,
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
}