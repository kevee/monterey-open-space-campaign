'use strict';

module.exports = function(grunt) {

  var Prismic = require('prismic.io').Prismic,
      Promise = require('es6-promise').polyfill(),
      YAML = require('yamljs'),
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
            endorsement.url = endorsement.data['endorsement.firstName'].value.replace(/\s/g, '-') + '-' + endorsement.data['endorsement.lastName'].value.replace(/\s/g, '-');
            endorsement.url = endorsement.url.toLowerCase();
            endorsements.push(endorsement);

            var meta = {
              layout: 'endorsement-page',
              title: 'Join ' + endorsement.data['endorsement.firstName'].value + ' ' + endorsement.data['endorsement.lastName'].value + ' in support of Measure E',
              pageData: {}
            };
            _.each(endorsement.data, function(data, index) {
              index = index.split('.').pop();
              meta.pageData[index] = data;
            });
            var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
            grunt.file.write(that.data.target + '/' + endorsement.url + '.html', content);
            grunt.log.oklns('Saved ' + that.data.target + '/' + endorsement.url + '.html');

          });
          endorsements = _.sortBy(endorsements, 'sort');
          grunt.file.write(that.data.data, JSON.stringify(endorsements));
          done();
      });
    });
  });
};
