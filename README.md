# grunt-cfn-lint

> CloudFormation JSON and YAML Validator in grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cfn-lint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cfn-lint');
```

## The "cfn_lint" task

### Overview
In your project's Gruntfile, add a section named `cfn_lint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cfn_lint: {
      glob: {
        src: [
          'test/**/setup_resources.yaml',
          'stacks/rds_*.json',
          'template_*'  // automatically detects json or yaml files
          ],
      },
      with_options: {
        files: {
          src: ['test/valid/smoke.yaml'],
          src: ['test/invalid/invalid_arn.yaml'],
        },
        options: {
          parameters: {
            DBName: "Inventory"
          },
          pseudoParameters: {
            'AWS::Region': 'us-west-2'
          },
          guessParameters: []
        },
    },
  },
});
```

### Options
The options follows the syntax as used in cfn-lint's ValidationOptions (https://www.npmjs.com/package/cfn-lint#api).

#### options.parameters
Type: `Object`
Default value: undefined

A list of parameters get passed into the template's 'Parameters' before validation

#### options.pseudoParameters
Type: `Object`
Default value: undefined

`pseudoParameters` are used to override AWS' pseudo-parameters, like `AWS::Region`, `AWS::AccountId`, etc.

#### options.guessParameters
Type: `Object`
Default value: undefined

If `guessParameters` is set to a list of parameter names, a critical error will be raised if any Parameter with no Default is not specified in the `parameters` or `guessParameters` options. An empty list can be used to enforce that all parameters must be specified in `parameters`. Leaving as `undefined` preserves the default loose behaviour, where parameters are guessed as needed without causing an error.

```ts
options {
  parameters?: {
    Param1: Param1value,
    // ...
  }
  pseudoParameters?: {
    'AWS::Region': 'ap-southeast-2',
    // ...
  },
  guessParameters?: string[] | undefined // default undefined
}
```

### Usage Examples

#### Default Options
This example provides a simple use case where the templates are checked with default options.

```js
grunt.initConfig({
  cfn_lint: {
    glob: {
      src: [
        'test/**/setup_resources.yaml',
        'stacks/rds_*.json',
        'template_*'  // automatically detects json or yaml files
        ],
    },
  },
});
```

#### Passing Validation Options
In this example, validation options are passed to the template with parameters and pseudo parameters.  An empty list of guess parameters indicates that all parameters must be specified in `parameters` (as described in the Options section).

```js
grunt.initConfig({
  cfn_lint: {
    rds: {
      files: {
        src: ['test/cfn/rds.yaml'],
        src: ['test/cfn/lambda.yaml'],
      },
      options: {
        parameters: {
          Stage: "integration"
        },
        pseudoParameters: {
          'AWS::Region': 'us-west-2'
        },
        guessParameters: []
      },
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

