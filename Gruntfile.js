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
      target : {
        data : '_dist/data/endorsements.json',
        endpoint : 'https://mprpd-campaign.prismic.io/api'
      }
    },
    'gh-pages': {
      options: {
        base: '_dist',
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
            '_dist/js/site.min.js']
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
    }
  });

  grunt.registerTask('default', ['clean', 'copy', 'compass', 'uglify', 'cssmin']);
  grunt.registerTask('setup', ['bower', 'default']);

  grunt.registerTask('deploy', ['default', 'gh-pages']);


  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-copy');
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
