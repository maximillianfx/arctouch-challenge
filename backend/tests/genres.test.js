var should = require('should');
var request = require('request');   
var chai = require("chai");
var expect = chai.expect;
var utils = require('../src/config/utils');

describe("GET Genres", function () {
    it("should retrive genres from TMDB", function (done) {
        request.get(
            {
                url: utils.URL_BASE_GENRE + '?api_key=' + utils.API_KEY + '&language=' + utils.LANGUAGE
            },
            function (error, response, body) {

                //Converts the body result in an object
                var _body = {};
                try {
                    _body = JSON.parse(body);
                }
                catch (e) {
                    _body = {};
                }
                //Expect 200 from result
                expect(response.statusCode).to.equal(200);

                // Check if results field exists
                if (_body.should.have.property('genres')) {
                    //Verify length of results field
                    expect(_body.genres).to.have.lengthOf.greaterThan(5);
                }

                done();
            }
        );
    });
});