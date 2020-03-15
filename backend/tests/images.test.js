var should = require('should');
var request = require('request');   
var chai = require("chai");
var expect = chai.expect;
var utils = require('../src/config/utils');

describe("GET Images", function () {
    it("should retrive poster from TMDB", function (done) {
        request.get(
            {
                url: utils.URL_BASE_IMAGE_POSTER + 'A7hhUj9Fq6E6FhGsENJTCmnCmt4.jpg'
            },
            function (error, response, body) {

                //Expect 200 from result
                expect(response.statusCode).to.equal(200);

                done();
            }
        );
    });

    it("should retrive backdrop from TMDB", function (done) {
        request.get(
            {
                url: utils.URL_BASE_IMAGE_BACKDROP + 'xPP1eeeDh9YEMw8q1xcbH29InX9.jpg'
            },
            function (error, response, body) {
                //Expect 200 from result
                expect(response.statusCode).to.equal(200);

                done();
            }
        );
    });
});