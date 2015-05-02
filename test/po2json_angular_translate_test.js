'use strict';

var grunt = require('grunt');
var po = require('node-po');


/*
  ======== A Handy Little Nodeunit Reference ========
  Https://github.com/caolan/nodeunit

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

exports.po2json_angular_translate = {
  setUp: function(done) {
    done();
  },
    parse_po: function(test){
        test.expect(1);

        var generated = grunt.file.read('tmp/button.json');
        var expected = grunt.file.read('test/expected/button.json');

        test.strictEqual(generated, expected, 'Should be the same JSON objext, just msgid and msgstr.');

        test.done();
    },

    mantainFolder: function (test) {
        test.expect(3);

        var generated = grunt.file.read('tmp/mantainFolder/i18n/ca/main.json');
        var expected = grunt.file.read('test/expected/i18n/ca/main.json');
        test.strictEqual(generated, expected, 'Should be the same JSON objext, just msgid and msgstr.');

        generated = grunt.file.read('tmp/mantainFolder/i18n/en/main.json');
        expected = grunt.file.read('test/expected/i18n/en/main.json');
        test.strictEqual(generated, expected, 'Should be the same JSON objext, just msgid and msgstr.');

        generated = grunt.file.read('tmp/mantainFolder/i18n/es/main.json');
        expected = grunt.file.read('test/expected/i18n/es/main.json');
        test.strictEqual(generated, expected, 'Should be the same JSON objext, just msgid and msgstr.');

        test.done();
    }
};
