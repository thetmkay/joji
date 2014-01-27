module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['bower_components/jquery/jquery.js','bower_components/angular/angular.js','bower_components/angular-resource/angular-resource.js', 'src/js/lib/angular-ui-router.js', 'src/js/**/*.js', 'src/js/*.js'],
        dest: 'public/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      options: {
        // options here to override JSHint defaults
        ignores: ['src/js/lib/*.js'],
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          angular: true
        }
      },
      files: ['Gruntfile.js','src/js/**/*.js', 'test/**/*.js']
    },
    watch: {
      coffee: {
        files: ['src/coffee/*', 'src/stylus/*', 'Gruntfile.js'],
        tasks: ['build']
      }
    },
    coffee: {
        dev: {
            options: {
                join: true
            },
            files: {
                'src/js/coffee.js':['src/coffee/**/services/*.coffee','src/coffee/**/controllers/*.coffee','src/coffee/**/directives/*.coffee','src/coffee/app.coffee']
            }  
        }
    },
    concurrent : {
        dev: {
            tasks: ['nodemon', 'watch'],
            options: {
              logConcurrentOutput: true
            }
        },
        build: {
            tasks: ['coffee:dev', 'stylus'],
            options: {
              logConcurrentOutput: true
            }
        }
    },
    nodemon: {
        dev: {
            script: 'server.js',
            ignoredFiles: ['README.md', '.gitignore','node_modules/**', 'public/**', 'bower_components/**/*'],
            options: {
              nodeArgs: ['--debug']
            }
      }
    },
    stylus: {
        options: {
            compress: true,
            use: [
                require('nib')
            ] ,
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
            'public/css/<%= pkg.name %>.css': ['src/stylus/*.styl']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['concurrent:build', 'jshint', 'concat', 'uglify']);
  grunt.registerTask('default', ['build','concurrent:dev']);

};