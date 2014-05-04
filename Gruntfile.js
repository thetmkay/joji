module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev:  {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    bower : {
      install: {
        options: {
          targetDir: './bower_components'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['bower_components/jquery/dist/jquery.js', 'bower_components/QuickShare/dist/quickshare.js','bower_components/angular/angular.js','bower_components/angular-resource/angular-resource.js', 'src/js/lib/angular-ui-router.js', 'src/js/**/*.js', 'src/js/*.js'],
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
        files: ['src/coffee/**/**/*.coffee', 'src/stylus/**/**/*.styl', 'Gruntfile.js'],
        tasks: ['build']
      }
    },
    coffee: {
        dev: {
            options: {
                join: true
            },
            files: {
                'src/js/coffee.js':['src/coffee/!(ignore)/services/*.coffee','src/coffee/!(ignore)/controllers/*.coffee','src/coffee/!(ignore)/directives/*.coffee','src/coffee/app.coffee']
            }
        }
    },
    concurrent : {
        dev: {
            tasks: ['nodemon:dev', 'watch'],
            options: {
              logConcurrentOutput: true
            }
        },
        build: {
            tasks: ['coffee:dev', 'stylus:compile'],
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
      compile: {
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['concurrent:build', 'jshint', 'concat', 'uglify']);
  grunt.registerTask('production', ['env:prod','concurrent']);
  grunt.registerTask('default', ['build','env:dev','concurrent']);

};
