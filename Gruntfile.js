module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
         targetDir : 'bower_components/'
        }
      }
    },
    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true
      },
      dist: {
        options: {
          environment: 'production',
          imagesDir: 'img',
          force: true,
          outputStyle: 'compressed',
        }
      }
    },
    'mos-endorsements': {
      endorsements : {
        data : '_dist/_data/endorsements.json',
        endpoint : 'https://citizens-parks-open-space.prismic.io/api'
      }
    },
    'mos-pages': {
      pages : {
        target : '_dist/',
        endpoint : 'https://citizens-parks-open-space.prismic.io/api',
        layout: 'page',
        documentType : 'page',
        title: 'page.title',
        content: 'page.body',
        ignore: [

        ]
      }
    },
    'mos-homepage': {
      homepage : {
        target : '_dist/',
        endpoint : 'https://citizens-parks-open-space.prismic.io/api'
      }
    },
    'gh-pages': {
      options: {
        base: '_dist',
        message: 'Update on build #' + process.env.TRAVIS_BUILD_NUMBER,
        repo: (process.env.GITHUB_TOKEN) ? 'https://' + process.env.GITHUB_TOKEN + '@github.com/kevee/monterey-open-space-campaign.git' : false
      },
      src: ['**']
    },
    copy: {
      layouts: {
        files: [
          {
            expand: true,
            cwd: 'src/layouts/',
            src: ['*.html'],
            dest: '_dist/_layouts/'
          },
          {
            expand: true,
            cwd: 'src/includes/',
            src: ['*.html'],
            dest: '_dist/_includes/'
          }
        ]
      }
    },
    watch: {
      all: {
        files: ['src/**'],
        tasks: ['default']
      }
    },
    clean : ['_dist'],
    uglify : {
      options: {
        compress: {
          drop_console: true
        },
        mangle: false
      },
      compiled : {
        files : {
          '_dist/js/site.min.js' : [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/moment/dist/moment.js',
            'bower_components/smart-underline/js/smart-underline.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'src/js/site.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          src: [
            'src/fonts/fonts.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            '.grunt/style.css'
          ],
          dest: '_dist/css/style.min.css'
        }]
      }
    },
    watch: {
      all: {
        files: ['src/**'],
        tasks: ['default']
      },
      src: {
        files: ['src/**'],
        tasks : ['copy', 'compass', 'uglify', 'cssmin']
      }
    },
  });

  grunt.registerTask('default', ['copy', 'compass', 'uglify', 'cssmin', 'mos-endorsements', 'mos-homepage', 'mos-pages']);
  grunt.registerTask('setup', ['bower', 'clean', 'default']);

  grunt.registerTask('deploy', ['default', 'gh-pages']);


  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower-task');

};
