//Karma configuration
//Generated on Fri Feb 21 2014 14:16:24 GMT-0700 (MST)

module.exports = function (config) {
  'use strict';

  config.set({

    // base path, that will be used to resolve files and exclude, relative to THIS config file!
    basePath: '..',

    // frameworks to use
    frameworks: ['mocha'],
    // frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [

      'bower_components/chai/chai.js',
      'test/test.conf.js',

      'node_modules/sinon/pkg/sinon.js',
      'node_modules/jquery/dist/jquery.js',
      {pattern: 'src/*.js'},
      {pattern: 'test/**/*.spec.js'}
    ],

    // list of files to exclude
    exclude: [],

    // For code coverage reporting
    preprocessors: {
      'src/**/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        {
          type : 'html',
          dir : 'docs/coverage/',
          file: 'coverage-report.html'
        },
        {type: 'text-summary'} /* Will output to console */
      ]
    },

    // web server port
    port: 9876,


    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    plugins: [
      'karma-mocha',
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher'
    ]
  });
};
