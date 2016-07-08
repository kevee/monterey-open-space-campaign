'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io');
  grunt.registerMultiTask('mos-endorsements', 'Add endorsements JSON file', function() {
    var that = this;
    var endorsements = {};

    Prismic.Api(this.data.endpoint, function (err, Api) {
      console.log(this);
      Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at("document.type", "endorsement")).submit(function (err, response) {
          console.log(response);
          grunt.file.write(that.data.data, JSON.stringify(response.results));
      });
    });

  });

};
