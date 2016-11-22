// Generated on 2015-09-19 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    injector: 'grunt-asset-injector',
    ngconstant: 'grunt-ng-constant'
  });

  var compass = require('compass-importer')

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '/*jshint quotmark:false*/\n\n\'use strict\';\n\n {%= __ngModule %}',
        name: 'config',
        dest: 'client/components/config.js'
      },
      // Environment targets
      dev: {
        constants: {
          ENV: require('./local.env.json').dev
        }
      },
      dist: {
        constants: {
          ENV: require('./local.env.json').dist
        }
      }
    },

    yeoman: {
      dist: 'dist',
      client: 'client',
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      injectJS: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.js',
          '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
          '!<%= yeoman.client %>/app/app.js'
        ],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      jsTest: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all']
      },
      injectSass: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.{scss,sass}'
        ],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.{scss,sass}'
        ],
        tasks: ['sass', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
          '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
          '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= yeoman.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.client %>/{app,components}/**/*.js',
        '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
        '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
      ],
      test: {
        src: [
          '<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ]
      }
    },

    jsbeautifier: {
      modify: {
        src: ['*.js', 'client/**/*.js', '!client/bower_components/**/*.js', 'e2e/**/*.js',
          'client/**/*.scss', '!client/components/config.js', '!client/bower_components/**/*.scss',
          'client/**/*.html', '!client/bower_components/**/*.html'
        ],
        options: {
          css: {
            fileTypes: ['.scss']
          },
          config: '.jsbeautifyrc',
        },
      },
      verify: {
        src: ['*.js', 'client/**/*.js', '!client/bower_components/**/*.js', 'e2e/**/*.js',
          'client/**/*.scss', '!client/components/config.js', '!client/bower_components/**/*.scss',
          'client/**/*.html', '!client/bower_components/**/*.html'
        ],
        options: {
          mode: 'VERIFY_ONLY',
          css: {
            fileTypes: ['.scss']
          },
          config: '.jsbeautifyrc',
        },

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
      client: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= yeoman.client %>/index.html',
        ignorePath: '<%= yeoman.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/{,*/}*.js',
            '<%= yeoman.dist %>/{,*/}*.css',
            '!**/Chart.js/**',
            '!**/angular-chart.js/**'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.client %>/index.html'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/{,*/}*.js', '!**/Chart.js/**', '!**/angular-chart.js/**'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/assets/images'

        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '*/**.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'hikariApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.js'
      },
      main: {
        cwd: '<%= yeoman.client %>',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.client %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/assets/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css', '{app,components}/**/*.js']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      client: [
        'sass',
      ],
      test: [
        'sass',
      ],
      dist: [
        'sass',
        'imagemin',
        'svgmin'
      ]
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },

    // Compiles Sass to CSS
    sass: {
      options: {
        importer: compass
      },
      client: {
        options: {
          loadPath: [
            '<%= yeoman.client %>/bower_components',
            '<%= yeoman.client %>/app',
            '<%= yeoman.client %>/components'
          ],
          compass: true
        },
        files: {
          '.tmp/app/app.css': '<%= yeoman.client %>/app/app.scss'
        }
      }
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function (filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
            ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
              '!{.tmp,<%= yeoman.client %>}/app/app.js',
              '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
              '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js'
            ]
          ]
        }
      },

      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function (filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= yeoman.client %>/app/app.scss': [
            '<%= yeoman.client %>/{app,components}/**/*.{scss,sass}',
            '!<%= yeoman.client %>/app/app.{scss,sass}'
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function (filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
            '<%= yeoman.client %>/{app,components}/**/*.css'
          ]
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729,
        base: '<%= yeoman.client %>'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('./client')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('./client')
            ];
          }
        }
      },
      dist: {
        options: {
          port: 8081,
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:client',
      'ngconstant:dev',
      'injector:sass',
      'concurrent:client',
      'injector',
      'wiredep',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', function (target) {
    if (target === 'client') {
      return grunt.task.run([
        'newer:jshint',
        'clean:client',
        'ngconstant:dev',
        'injector:sass',
        'concurrent:test',
        'injector',
        'autoprefixer'
      ]);
    } else if (target === 'e2e') {
      return grunt.task.run([
        'clean:client',
        'ngconstant:dist',
        'injector:sass',
        'concurrent:test',
        'injector',
        'wiredep',
        'autoprefixer',
        'connect:test',
        'protractor'
      ]);
    } else if (target === 'dist') {
      return grunt.task.run([
        'clean:client',
        'ngconstant:dist',
        'injector:sass',
        'concurrent:test',
        'injector',
        'autoprefixer'
      ]);
    } else grunt.task.run([
      'test:client',
      'jsbeautifier:verify',
      'test:e2e'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:dist',
    'injector:sass',
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'jsbeautifier:modify',
    'test',
    'serve:dist'
  ]);
};
