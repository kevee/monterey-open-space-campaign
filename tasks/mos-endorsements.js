'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io');

  grunt.registerMultiTask('mos-endorsements', 'Add endorsements JSON file', function() {
    var that = this;
    var endorsements = {};
    Prismic.api(this.data.endpoint, function (err, api) {
      var options = {};
      console.log(api);
      api.query("", options, function(error, response) { // An empty query will return all the documents
        if (error) {
          console.log("Something went wrong: ", err);
        }
        console.log("Documents: ", response.documents);
      });
    });
  });
};
