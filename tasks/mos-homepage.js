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
            slug: 'index',
            isHome: true,
            pageData: {}
          };
          _.each(page.data, function(data, index) {
            index = index.split('.').pop();
            meta.pageData[index] = data;
          });
          var group = page.getGroup('homepage.homepageContent');
          var docs = group ? group.toArray() : [];
          _.each(docs, function(section, index) {
            meta.pageData.homepageContent.value[index].text = section.getStructuredText('text').asHtml();
          });
          var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
          grunt.file.write(that.data.target + '/index.html', content);
          grunt.log.oklns('Saved ' + that.data.target + 'index.html');
          done();
      });
    });
  });
};
