'use strict';

var grunt = require('grunt');
const validateFile = require('../tasks/lib/validateFile');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cfn_lint = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  smokeJson: function(test) {
    test.expect(1);

    let result = validateFile('test/fixtures/valid/template.json');
    test.ok(result.templateValid, 'this template should be valid');

    test.done();
  },
  smokeYaml: function(test) {
    test.expect(1);

    let result = validateFile('test/fixtures/valid/setup_resources.yaml');
    test.ok(result.templateValid, 'this template should be valid');

    test.done();
  },
  invalidJson: function(test) {
    test.expect(1);

    let result = validateFile('test/fixtures/invalid/1_missing_parameter_type.json');
    test.ok(!result.templateValid, 'this template should be invalid');

    test.done();
  },
  invalidYaml: function(test) {
    test.expect(1);

    let result = validateFile('test/fixtures/invalid/invalid_arn.yaml');
    test.ok(!result.templateValid, 'this template should be invalid');

    test.done();
  },
  invalidOptions: function(test) {
    let options = {
      pseudoParameters: {
        'AWS:Region': 'us-west-2'
      },
    };

    let result = validateFile('test/fixtures/valid/smoke.yaml', options);
    test.ok(!result.templateValid, 'this template should be invalid');
    test.ok(JSON.stringify(result.errors).includes('is not an allowed pseudo parameter'), 'should include invalid pseudo parameter text');

    test.done();
  },
};
