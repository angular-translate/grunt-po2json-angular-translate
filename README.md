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
                 files: {
                     'tmp/dest.json' : ['test/fixtures/*.po'], // This will generate a single json file with all the specified strings
                     'tmp/dest' : ['test/fixtures/*.po'] //this will create several json files with its own strings
                        }
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

#### options.cleanPrevStrings
Type: `Boolean`
Default value:  false
It will remove all the previous generated files on the destination specified before creating the new ones.

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

#### Pluralization

To get the angular-translate format of [pluralizations](http://pascalprecht.github.io/angular-translate/docs/en/#/guide/12_pluralization),
we need to have a po file with the [standard format](http://www.gnu.org/software/gettext/manual/html_node/Translating-plural-forms.html), which
would look something like:

```po
msgid "button/save-change"
msgid_plural "button/save-changes"
msgstr[0] "Save %d Change"
msgstr[1] "Save %d Changes"
```

Which will be converted into:

```json
  {"button/save-change": "Save {PLURALIZE, plural, offset:1 =2{# Change} other{# Changes}}"}
```

Please, for complex language pluralizations, like in German, I would recommend to make a quick scann, to make sure
that everything makes sense.

Be sure that both (singular and plural) contain the same length, otherwise, the output won't be the desired one

*Not*

```po
msgid "button/save-change"
msgid_plural "button/save-changes"
msgstr[0] "Save %d Change"
msgstr[1] "Save Changes"
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).



## Release History

0.0.1 First basic functionality. Just convert the po files into JSON objects compatible with angular-translate


## Features planned

* Support for interpolation
* Improve pluralizations.
* Replace placeholders from %d to {{ d }}. With option to set custom placeholders in the options
* Posibility to escape special characters
* Option to generate the result either as a json file, as it is done currently, or directly in angular format

###  Changelog

*v 0.0.3 *
* Added support for creation of a single .json file with strings beloging to several po files
* Added option " cleanPrevStrings: true ", it will clean all the previous generated files before creating the new ones. Defaults false.