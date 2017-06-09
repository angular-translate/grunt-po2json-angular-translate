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
var fs = require('fs');
var cldr = require('cldr');

//Taken from https://gist.github.com/liangzan/807712#comment-337828
var  rmDir = function(dirPath) {
    var files;
    try { files  = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0){
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()){
                fs.unlinkSync(filePath);
            }else{
                rmDir(filePath);
            }
        }

        fs.rmdirSync(dirPath);
    }
};

function getPluralForms(locale) {
    try {
        return Object.keys(cldr.extractUnitPatterns(locale).long.unit.lengthMeter);
    } catch (ex) {
        return;
    }
}

function convertPlural(forms, locale) {
    var pluralForms = getPluralForms(locale);
    if (!pluralForms || (pluralForms.length !== forms.length && pluralForms.length - 1 !== forms.length)) {
        return "";
    }

    if (forms.some(function(form) {return form === ""})) {
        return "";
    }

    var res = "{n, plural, ";
    for (var i = 0; i < forms.length; i++) {
        // if it's the last message form, take the last pluralForm ("other")
        var pluralForm = (i === forms.length - 1) ? pluralForms[pluralForms.length - 1] : pluralForms[i];
        res += pluralForm + " {" + forms[i].replace("%d", "{n}") + "}";
        if (i < forms.length - 1) {
            res += " ";
        }
    }
    return res + "}";
}

module.exports = function(grunt) {

    var replacePlaceholder = function(string, openingMark, closingMark,altEnabled){
        //if string is empty skip it
        if(string == "") {
            return
        }
        
        if (closingMark !== undefined &&
            altEnabled &&
           string.indexOf(closingMark !== -1)){
            if (string.indexOf(openingMark) !== -1){
                string = string.replace(openingMark,"{{");
            }
            if (string.indexOf(closingMark) !== -1){
                string = string.replace(closingMark,"}}");
            }
        }

         //If there is no closing mark, then we have standard format: %0,
        if(string.indexOf(closingMark === -1)){
            var pattern ="\\%([0-9]|[a-z])";
            var re = new RegExp(pattern,"g");
            var index = string.indexOf(re);
            var substr = string.substr(index,index+2);
            string = string.replace(re, "{{"+substr+"}}");
        }
        return string;
    };

    grunt.registerMultiTask('po2json_angular_translate', 'grunt plugin to convert po to angangular-translate format', function() {
        var options = this.options({
            pretty: false,
            fuzzy: false,
            cleanPrevStrings: false,
            upperCaseId : false,
            stringify : true,
            offset : 1,
            enableAltPlaceholders: true,
            placeholderStructure: ["{","}"]
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


            if (options.cleanPrevStrings){
                rmDir(f.dest);
            }

            var destPath = path.extname(f.dest);
            var dest;
            var singleFile = false;
             var singleFileStrings = {};

            if (destPath !== ""){ //It is just one file, we should put everything there
                singleFile = true;
            }

            filepaths.forEach(function(filepath){
                if (! singleFile ){
                    // Prepare the file name
                    var filename = path.basename(filepath, path.extname(filepath));
                    dest = path.join (f.dest, filename + ".json" );
                }
                // Read the file po content
                var file = grunt.file.read(filepath);
                var catalog = po.parse(file);
                 var strings = {};

                for (var i = 0; i < catalog.items.length; i++) {
                    var item = catalog.items[i];
                    if (options.upperCaseId){
                        item.msgid = item.msgid.toUpperCase();
                    }

                    if (item.msgid_plural!== null && item.msgstr.length > 1){
                        var pluralizedStr = convertPlural(item.msgstr, filename);
                        pluralizedStr = replacePlaceholder(pluralizedStr,options.placeholderStructure[0],options.placeholderStructure[1],options.enableAltPlaceholders);
                        strings[item.msgid] = pluralizedStr ;
                        if (singleFile){
                            singleFileStrings[item.msgid]=  pluralizedStr;
                        }

                    }else{
                        var message = item.msgstr.length === 1 ? item.msgstr[0] : item.msgstr;
                        message = replacePlaceholder(message,options.placeholderStructure[0],options.placeholderStructure[1],options.enableAltPlaceholders);
                        strings[item.msgid] = message;
                        if (singleFile){
                            singleFileStrings[item.msgid]=message;
                        }
                    }
                }

                if (!singleFile){
                    grunt.file.write(dest, (options.stringify) ? JSON.stringify(strings, null, (options.pretty) ? '   ':'') : strings );
                    grunt.log.writeln('JSON file(s) created: "' + dest +'"');
                }

            });


            if (singleFile){
                grunt.file.write(f.dest, (options.stringify) ? JSON.stringify(singleFileStrings, null, (options.pretty) ? '   ':'') : singleFileStrings );
                grunt.log.writeln('JSON file(s) created: "' + f.dest + '"');
            }
        });
    });

};
