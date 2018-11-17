/*
 * grunt-cfn-lint
 * https://github.com/gnattwc/grunt-cfn-lint
 *
 * Copyright (c) 2018 gnattwc
 * Licensed under the MIT license.
 */

'use strict';

const validateFile = require('./lib/validateFile.js');

module.exports = function (grunt) {

  grunt.registerMultiTask('cfn_lint', 'cfn-lint in grunt', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      parameters: undefined,
      pseudoParameters: undefined,
      guessParameters: undefined
    });

    this.filesSrc.forEach(f => {

      let result = validateFile(f, options);

      if (result.templateValid) {
        grunt.verbose.ok(`${f}: result=${JSON.stringify(result)}`);
      } else {
        grunt.verbose.error(`${f}: result=${JSON.stringify(result, null, 4)}`);
        grunt.warn(`validation of ${f} failed.`);
      }

      return result.templateValid;
    });

  });

};
