'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env.sample');
    localConfig.PUBLIC_KEY_PATH = process.env.PUBLIC_KEY_PATH || localConfig.PUBLIC_KEY_PATH;
    localConfig.PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH || localConfig.PRIVATE_KEY_PATH;
    localConfig.POSTGRES_DEVELOPEMENT_URL = process.env.POSTGRES_DEVELOPEMENT_URL || localConfig.POSTGRES_DEVELOPEMENT_URL;
    localConfig.POSTGRES_PRODUCTION_URL = process.env.POSTGRES_PRODUCTION_URL || localConfig.POSTGRES_PRODUCTION_URL;
    localConfig.POSTGRES_TEST_URL = process.env.POSTGRES_TEST_URL || localConfig.POSTGRES_TEST_URL;
    localConfig.DATABASE_POOL_SIZE = process.env.DATABASE_POOL_SIZE || localConfig.DATABASE_POOL_SIZE;
    // Control debug level for modules using visionmedia/debug
    DEBUG: ''
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      dist: 'dist'
    },
    express: {
      options: {
        port: process.env.PORT || 3000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    watch: {
      mochaTest: {
        files: ['server/**/*.spec.js'],
        tasks: ['env:test', 'mochaTest']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: 35730,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    jsbeautifier: {
      modify: {
        src: ['server/**/*.js'],
        options: {
          config: '.jsbeautifyrc',
        },
      },
      verify: {
        src: ['server/**/*.js'],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc',
        },
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc',
          reporterOutput: ""
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec',
          reporterOutput: ""
        },
        src: ['server/**/*.spec.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk', '--harmony'],
          env: {
            PORT: process.env.PORT || 3000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          }
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dest: '<%= yeoman.dist %>',
          src: [
            'package.json',
            '.dockerignore',
            'server/**/*'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
    },

    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    }
  });

  grunt.registerTask('schema', function (){
    try {
      var done = this.async();
      var pg = require('pg');

      pg.connect(localConfig.POSTGRES_DEVELOPEMENT_URL, function (err, client, pgDone) {
        if (err) {
          console.error(err); pgDone(); return done();
        }
        client.query(`select * from information_schema.columns where table_schema = 'public'`, function (err, result){
           require('fs').writeFileSync('./server/schema.json', JSON.stringify(result.rows, null, 2) , 'utf-8')
           pgDone(); done()
        })
      });
    } catch (e){
      console.log("Error Connecting");
      done();
    }

  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'express-keepalive']);
    }

    if (target === 'docker'){
      return grunt.task.run([
        'schema',
        'clean:server',
        'express:dev',
        'wait',
        'watch'
      ]);
    }
    if (target === 'debug') {
      return grunt.task.run([
        'schema',
        'clean:server',
        'env:all',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'schema',
      'clean:server',
      'env:all',
      'express:dev',
      'wait',
      'watch'
    ]);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'schema',
        'env:all',
        'env:test',
        'mochaTest',
        'jsbeautifier:verify'
      ]);
    }

    else grunt.task.run([
      'test:server',
    ]);
  });

  grunt.registerTask('build', [
    'schema',
    'clean:dist',
    'copy:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'jsbeautifier:modify',
    'test',
    'env:dev',
    'env:all',
    'build',
    'serve'
  ]);
};
