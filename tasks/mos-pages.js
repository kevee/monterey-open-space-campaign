'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io').Prismic,
      YAML = require('yamljs'),
      _ = require('underscore'),
      pretty = require('pretty'),
      Promise = require('es6-promise').polyfill();

  grunt.registerMultiTask('mos-pages', 'Add pages', function() {
    var that = this,
        endorsements = {},
        done = this.async();
    Prismic.Api(that.data.endpoint, function (err, Api) {
      Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at("document.type", that.data.documentType)).submit(function (err, response) {
          _.each(response.results, function(page) {
            var meta = {
              layout: that.data.layout,
              title: page.getText(that.data.title),
              data: {}
            };
            _.each(page.data, function(data, index) {
              index = index.split('.').pop();
              meta.data[index] = data;
            });
            var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
            if(typeof that.data.content !== 'undefined') {
              content += pretty(page.getSliceZone(that.data.content).asHtml());
            }
            grunt.file.write(that.data.target + '/' + page.uid + '.html', content);
            grunt.log.oklns('Saved ' + that.data.target + page.uid + '.html');
          });
          done();
      });
    });
  });
};
