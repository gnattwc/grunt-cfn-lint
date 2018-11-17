'use strict';

const cfnLintLib = require('cfn-lint');

function validateFile(fileName, options) {
  return cfnLintLib.validateFile(fileName, options);
}

module.exports = validateFile;