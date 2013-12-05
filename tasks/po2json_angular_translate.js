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

                   if (item.msgid_plural!== null && item.msgstr.length !== 1){
                        var singular_words = item.msgstr[0].split(" ");
                        var plural_words = item.msgstr[1].split(" ");

                        var pluralizedStr = "";

                        for (var x = 0; x < singular_words.length; x++){

                            if (singular_words.length !== plural_words.length){
                                grunt.log.writeln('I found an irregular pluralization in the msgid: ' + item.msgid + ', please have a look on it on the resulting json file');
                            }


                            if (singular_words[x] !== plural_words[x] && singular_words[x] !== undefined &&  plural_words[x] !== undefined){

                                pluralizedStr += "{PLURAL, select, singular{" + singular_words[x]+"}  plural{"+ plural_words[x] +"}}";

                            }else{
                                if (singular_words[x] !== undefined && plural_words[x] === undefined){
                                    pluralizedStr += singular_words[x];
                                } else if (singular_words[x] === undefined && plural_words[x] !== undefined){
                                    pluralizedStr += plural_words[x];
                                }else{
                                    pluralizedStr += singular_words[x];
                                }
                            }

                            if (x !== singular_words.length - 1 ){
                                pluralizedStr += " ";
                            }
                        }
                        strings[item.msgid] = pluralizedStr ;
                    }else{
                        strings[item.msgid] = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                    }
                }

                grunt.file.write(dest, (options.stringify) ? JSON.stringify(strings, null, (options.pretty) ? '   ':'') : strings );
                grunt.log.writeln('JSON file(s) created in "' + f.dest + '"');

            });

        });
    });

};
