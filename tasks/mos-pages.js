'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io').Prismic,
      YAML = require('yamljs'),
      _ = require('underscore');

  grunt.registerMultiTask('mos-pages', 'Add pages', function() {
    var that = this,
        endorsements = {},
        done = this.async();
    Prismic.Api(that.data.endpoint, function (err, Api) {
      Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at("document.type", "page")).submit(function (err, response) {
          _.each(response.results, function(page) {
            var meta = {
              layout: 'page',
              title: page.data['page.title'].value,
              data: page.data
            };
            var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
            grunt.file.write(that.data.target + '/' + page.slug + '.html', content);
          });
          done();
      });
    });
  });
};
