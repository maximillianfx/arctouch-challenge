var should = require('should');
var request = require('request');
var chai = require("chai");
var expect = chai.expect;
var utils = require('../src/config/utils');

describe("GET Movies", function () {
    it("should retrive movies from TMDB", function (done) {
        request.get(
            {
                url: utils.URL_BASE + 'upcoming?api_key=' + utils.API_KEY + '&language=' + utils.LANGUAGE + '&page=1'
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
                if (_body.should.have.property('results')) {
                    //Verify length of results field
                    expect(_body.results).to.have.lengthOf.at.most(20);
                }

                done();
            }
        );
    });

    it("should retrive movie by ID from TMDB", function (done) {
        request.get(
            {
                url: utils.URL_BASE + '454626' + '?api_key=' + utils.API_KEY + '&language=' + utils.LANGUAGE
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

                // Check if id field exists
                if (_body.should.have.property('id')) {
                    //Verify if id is a number
                    expect(_body.id).to.be.a('number');
                }

                done();
            }
        );
    });
});