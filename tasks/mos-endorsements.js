'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io').Prismic,
      Promise = require('es6-promise').polyfill(),
      _ = require('underscore');

  grunt.registerMultiTask('mos-endorsements', 'Add endorsements JSON file', function() {
    var that = this,
        endorsements = [],
        done = this.async();
    Prismic.Api(that.data.endpoint, function (err, Api) {
      Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at("document.type", "endorsement")).submit(function (err, response) {
          _.each(response.results, function(endorsement) {
            endorsement.sort = endorsement.data['endorsement.lastName'].value + endorsement.data['endorsement.firstName'].value;
            endorsements.push(endorsement);
          });
          endorsements = _.sortBy(endorsements, 'sort');
          grunt.file.write(that.data.data, JSON.stringify(endorsements));
          done();
      });
    });
  });
};
