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
    nodemon: {
      dev: {
        script: 'server.js',
        ignoredFiles: ['README.md', '.gitignore','node_modules/**', 'public/**', 'bower_components/**/*'],
        options: {
          nodeArgs: ['--debug']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('production', ['env:prod','nodemon:dev']);
};
