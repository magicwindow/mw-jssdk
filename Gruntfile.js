// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var config = {
      tmp: '.tmp',
      app: 'src',
      test: 'test',
      dist: 'dist'
  };

  grunt.registerMultiTask('echo', 'Echo back input', function(){
    var data = this.data;

    if (typeof (data) === 'string') {
      if (grunt.file.exists(data)) {
        grunt.log.writeln(grunt.file.read(data));
      } else {
        grunt.log.writeln(data);
      }
    }

    if (typeof (data) === 'object') {
      var key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          grunt.log.writeln(data[key]);
        }
      }
    }
  });

  var pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    pkg: pkg,
    config: config,

    echo: {
      help: 'README.md'
    },

    clean: {
      options: {
        force: true
      },
      links: ["dist/**", "coverage/**"]
    },
    // 监视项目内的文件，若有更改则自动执行编译或刷新浏览器
    watch: {
      js: {
        files: [
          '<%= config.app %>/**/*.com',
          '<%= config.app %>/**/*.js'
        ],
        tasks: ['concat', 'uglify']
      },
      package: {
        files: ['package.json', 'bower.json'],
        tasks: ['version']
      }
    },

    jsdoc : {
      dist : {
        src: ['<%= config.app %>/*.js', '<%= config.app %>/**/*.js'],
        options: {
          destination: 'docs/jsdoc'
        }
      }
    },

    jsduck: {
      main: {
        // source paths with your code
        src: [
          '<%= config.app %>/**/*.com',
          '<%= config.app %>/**/*.js'/*,
          '<%= config.app %>/!*.com'*/
        ],

        // docs output dir
        dest: 'docs/jsduck',

        // extra options
        options: {
          //'builtin-classes': true,
          'warnings': ['-no_doc', '-dup_member', '-link_ambiguous'],
          'external': ['XMLHttpRequest']
        }
      }
    },

    //copy: {
    //  dist: {
    //    src: '<%= config.dist %>/<%= pkg.name %>.js',
    //    dest: '<%= config.dist %>/<%= pkg.name %>-<%= pkg.version %>.js',
    //    options: {
    //      process: function (content) {
    //        return content;
    //      },
    //    },
    //  }
    //},

    concat: {
      client: {
        src: [
          '<%= config.app %>/header',
          '<%= config.app %>/mw.sdk.com',
          '<%= config.app %>/*.js',
          '<%= config.app %>/apis/api.com',
          '<%= config.app %>/apis/*.js',
          '<%= config.app %>/footer'
        ],
        dest: '<%= config.dist %>/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/* \n'+
            ' <%= pkg.name %> v<%= pkg.version %>\n'+
            ' <%= grunt.template.today("yyyy-mm-dd") %>\n'+
            ' Copyright 2015, magicwindow.cn\n'+
            ' */\n'
      },
      build: {
        src: '<%= config.dist %>/<%= pkg.name %>.js',
        dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
      }
    },

    jshint: {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: [
            'Gruntfile.js',
            '<%= config.app %>/**/*.js',
            '<%= config.app %>/**/*.com'
        ]
    },

    karma: {
      unit: {
        configFile: '<%= config.test %>/karma.conf.js',
        singleRun: false,
        autoWatch: false,
        keepalive: true,
        colors: false,
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage']
      },
      watch: {
        options: {
          configFile: '<%= config.test %>/karma.conf.js'
        },
        //browsers: ['PhantomJS'],
        browsers: ['Chrome'],
        reporters: ['progress']
      },
      unit_phantomjs: {
        configFile: '<%= config.test %>/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
        reporters: ['dots', 'coverage']
      }
    },

    version: {
      project: {
        src: ['package.json', 'bower.json']
      }
    },

    checkDependencies: {
      'this': {
        options: {
          npmInstall: true
        }
      }
    },

    // 对任务构建的状态或结果显示桌面提示
    'notify_hooks': {
        options: {
            enabled: true,
            title: 'MW JSSDK Grunt',
            'max_jshint_notifications': 5 // 最多显示5条jshint提示
        }
    },

    notify: {
        // karma: {
        //   options: {
        //     title: '已经重新编译',  // 可选
        //     message: '应用“MagicScenes”文件已经重新编译.' // 必须
        //   }
        // }
    },
  });

  // Print help
  grunt.registerTask('help', ['echo:help']);

  // Verify installation
  grunt.registerTask('verify', ['checkDependencies']);

  // Unit test
  grunt.registerTask('test', ['verify', 'jshint', 'karma:unit_phantomjs']);
  grunt.registerTask('test:chrome', ['karma:unit']);

  // Build
  grunt.registerTask('build', [
    'clean',
    'version',
    'jshint',
    'karma:unit_phantomjs',
    'concat',
    //'copy:dist',
    'uglify',
    'jsduck'
  ]);

  // Setup default task that runs when you just run 'grunt'
  grunt.registerTask('default', ['build']);

};
