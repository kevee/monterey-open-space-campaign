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
            if(typeof that.data.ignore !== 'undefined' && that.data.ignore.indexOf(page.uid) > -1) {
              return;
            }
            var layout = (typeof page.data['page.layout'] !== 'undefined') ? page.getText('page.layout') : that.data.layout;
            var meta = {
              layout: layout,
              slug: page.uid,
              title: page.getText(that.data.title),
              pageData: {}
            };
            _.each(page.data, function(data, index) {
              index = index.split('.').pop();
              meta.pageData[index] = data;
            });
            var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
            if(typeof that.data.content !== 'undefined') {
              var slices = page.getSliceZone(that.data.content);
              if(slices) {
                content += pretty(slices.asHtml());
              }
            }
            grunt.file.write(that.data.target + '/' + page.uid + '.html', content);
            grunt.log.oklns('Saved ' + that.data.target + page.uid + '.html');
          });
          done();
      });
    });
  });
};
