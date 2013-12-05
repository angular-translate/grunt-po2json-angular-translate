# grunt-po2json-angular-translate

> grunt plugin to convert po to angangular-translate format

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-po2json-angular-translate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-po2json-angular-translate');
```

## The "po2json_angular_translate" task

### Overview
In your project's Gruntfile, add a section named `po2json_angular_translate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  po2json_angular_translate: {
  options: {
     pretty: false,
     upperCaseId : false
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.pretty
Type: `Boolean`
Default value:  false
If you want to pretty print the result


#### options.upperCaseId
Type: `Boolean`
Default value:  false
If you want to convert the ids to uppercase


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  po2json_angular_translate: {
    options: {},
    files: {
      'dest/': ['src/**/*.po'],
    },
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).



## Release History

0.0.1 First basic functionality. Just convert the po files into JSON objects compatible with angular-translate


## Features planned

* Support for angular-translate pluralization and interpolation
* Replace placeholders from %d to {{ d }}. With option to set custom placeholders in the options
* Posibility to escape special characters
* Option to generate the result either as a json file, as it is done currently, or directly in angular format
