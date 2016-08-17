'use strict';

module.exports = function(grunt) {

  var Airtable = require('airtable'),
      Promise = require('es6-promise').polyfill(),
      YAML = require('yamljs'),
      _ = require('underscore');

  grunt.registerMultiTask('mos-endorsements', 'Add endorsements JSON file', function() {
    var that = this,
        endorsements = [],
        done = this.async();
    var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appJFr26GTasPvrXf');

    base('Endorsements').select({
        maxRecords: 1500,
        view: "Main View",
        sort: [
          {field: "Last name"},
          {field: "First name"},
        ]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          endorsements.push(record.fields);
          var meta = {
            layout: 'endorsement-page',
            title: 'Join ' + record.get('First name') + ' ' + record.get('Last name') + ' in support of Measure E',
            pageData: record.fields
          };
          var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
          grunt.file.write(that.data.target + '/' + record.get('Slug') + '.html', content);
          grunt.log.oklns('Saved ' + that.data.target + '/' + record.get('Slug') + '.html');
        });
        fetchNextPage();
    }, function(error) {
        grunt.file.write(that.data.data, JSON.stringify(endorsements));
        var org_endorsements = [];
        base('Organizations').select({
            maxRecords: 1500,
            view: "Main View",
            sort: [
              {field: "Name"},
            ]
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
              org_endorsements.push(record.fields);
              var meta = {
                layout: 'endorsement-org-page',
                title: 'Join ' + record.get('Name') + ' in support of Measure E',
                pageData: record.fields
              };
              var content = '---' + "\n" + YAML.stringify(meta) + '---' + "\n";
              grunt.file.write(that.data.target + '/' + record.get('Slug') + '.html', content);
              grunt.log.oklns('Saved ' + that.data.target + '/' + record.get('Slug') + '.html');
            });
            fetchNextPage();
        }, function(error) {
            grunt.file.write(that.data.dataorgs, JSON.stringify(org_endorsements));
            done();
            if (error) {
                console.log(error);
            }
        });
        if (error) {
            console.log(error);
        }
    });
  });
};
