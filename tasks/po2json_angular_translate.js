/*
 * grunt-po2json-angular-translate
 * https://github.com/root/grunt-po2json-angular-translate
 *
 * Copyright (c) 2013 danielavalero
 * Licensed under the MIT license.
 */

'use strict';

var po = require('node-po');
var path = require('path');


/*            var template = function (module, body) {
              return "angular.module(\"" + module + "\").run(['gettextCatalog', function (gettextCatalog) {\n" + body + "\n}]);";
              };
*/


module.exports = function(grunt) {

    grunt.registerMultiTask('po2json_angular_translate', 'grunt plugin to convert po to angangular-translate format', function() {
        var options = this.options({
            pretty: false,
            fuzzy: false,
            upperCaseId : false,
            stringify : true
        });

        this.files.forEach(function(f) {


            var filepaths = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Po file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;

                }
            });

            if (filepaths.length === 0) {
                grunt.log.warn('Destination (' + f.dest + ') not written because src files were empty.');
                return;
            }

            filepaths.forEach(function(filepath){
                // Prepare the file name
                var filename = path.basename(filepath, path.extname(filepath));
                var dest = path.join (f.dest, filename + ".json" );

                // Read the file content
                var file = grunt.file.read(filepath);
                var catalog = po.parse(file);
                var strings = {};

                for (var i = 0; i < catalog.items.length; i++) {
                    var item = catalog.items[i];
                    if (options.upperCaseId){
                        item.msgid = item.msgid.toUpperCase();
                    }

                    //Replace variables

                   strings[item.msgid] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;

                }

                grunt.file.write(dest, (options.stringify) ? JSON.stringify(strings, null, (options.pretty) ? '   ':'') : strings );

                grunt.log.writeln('File "' + f.dest + '" created.');

            });

        });
    });

};
