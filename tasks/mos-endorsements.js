'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io').Prismic,
  Promise = require('es6-promise').polyfill();

  grunt.registerMultiTask('mos-endorsements', 'Add endorsements JSON file', function() {
    var that = this,
        endorsements = {},
        done = this.async();
    Prismic.Api(that.data.endpoint, function (err, Api) {
      Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at("document.type", "endorsement")).submit(function (err, response) {
          grunt.file.write(that.data.data, JSON.stringify(response.results));
          done();
      });
    });
  });
};
