'use strict';

module.exports = function(grunt){
  // auto-load grunt tasks
  require('load-grunt-tasks')(grunt);

  var config = {
    src: './src',
    bower: './src/assets/bower_components',
    css: './src/assets/css',
    less: './src/assets/less',
    js: './src/assets/js'
  };

  grunt.initConfig({
    config: config,
    // CLEAN, TEST & COMPILE TASKS
    clean: {
      styles: '<%= config.css %>'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.js %>/**/*.js'
      ]
    },
    less: {
      dev: {
        files: {
          '<%= config.css %>/app.css' : '<%= config.less %>/app.less'
        }
      }
    },
    // WATCH TASKS
    watch: {
      styles: {
        files: ['<%= config.less %>/**/*.less'],
        tasks: ['less:dev']
      },
      scripts: {
        files: ['<%= config.js %>/**/*.js'],
        tasks: ['jshint:all']
      }
    },
    // SERVER
    connect: {
      dev: {
        options: {
          port: 8001,
          base: '<%= config.src %>'
        },
        // API Proxy
        proxies: [{
          context: '/api',
          host: '127.0.0.1',
          port: 3000,
          https: false,
          changeOrigin: true
        }]
      }
    },
    concurrent: {
      dev: ['watch:styles', 'watch:scripts']
    }
  });

  grunt.registerTask('server', function(){
    grunt.task.run([
      'clean:styles',
      'less:dev',
      'jshint:all',
      'configureProxies:dev',
      'connect:dev',
      'concurrent:dev'
    ]);
  });
};