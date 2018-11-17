/*
 * grunt-cfn-lint
 * https://github.com/gnattwc/grunt-cfn-lint
 *
 * Copyright (c) 2018 gnattwc
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    cfn_lint: {
      byExtension: {
        src: ['test/**/setup_resources.yaml', 'test/**/template.json'],
      },
      noExtension: {
        src: ['test/fixtures/valid/3_j_s_o_n', 'test/fixtures/valid/noExtension_y_a_m_l'],
      },
      single_options: {
        files: {
          src: ['test/fixtures/setup_resources.yaml'],
        },
        options: {
          parameters: {
            Param1: "Value1"
          },
          pseudoParameters: {
            'AWS::Region': 'us-west-2'
          },
          guessParameters: []

        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'cfn_lint', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
