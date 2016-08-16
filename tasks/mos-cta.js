'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io').Prismic,
      Promise = require('es6-promise').polyfill(),
      _ = require('underscore');

  grunt.registerMultiTask('mos-cta', 'Add call to action JSON file', function() {
    var that = this,
        cta = [],
        done = this.async();
    Prismic.Api(that.data.endpoint, function (err, Api) {
      Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at("document.type", "call-to-action")).submit(function (err, response) {
          _.each(response.results, function(action) {
            action.sort = action.data['call-to-action.number'].value;
            cta.push(action);
          });
          cta = _.sortBy(cta, 'sort');
          grunt.file.write(that.data.data, JSON.stringify(cta));
          done();
      });
    });
  });
};
