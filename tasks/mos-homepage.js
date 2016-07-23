'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io').Prismic,
      YAML = require('yamljs'),
      _ = require('underscore'),
      pretty = require('pretty'),
      Promise = require('es6-promise').polyfill();

  grunt.registerMultiTask('mos-homepage', 'Add homepage', function() {
    var that = this,
        done = this.async();
    Prismic.Api(that.data.endpoint, function (err, Api) {
      Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at("document.type", 'homepage')).submit(function (err, response) {
          var page = response.results[0];
          var meta = {
            layout: 'homepage',
            title: 'Citizens for Parks &amp; Open Space',
            slug: 'index',
            isHome: true,
            pageData: {}
          };
          _.each(page.data, function(data, index) {
            index = index.split('.').pop();
            meta.pageData[index] = data;
          });
          var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
          content += pretty(page.getSliceZone('homepage.body').asHtml());
          grunt.file.write(that.data.target + '/index.html', content);
          grunt.log.oklns('Saved ' + that.data.target + 'index.html');
          done();
      });
    });
  });
};
