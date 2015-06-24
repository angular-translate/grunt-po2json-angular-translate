'use strict';

var grunt = require('grunt');
var po = require('pofile');


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
        //git adds the CRLF meanwhile the grunt doesn't, so we remove the \r
        var expected = grunt.file.read('test/expected/button.json').replace(/\r\n/g, '\n');

        test.strictEqual(generated, expected, 'Should be the same JSON objext, just msgid and msgstr.');

        test.done();
    }
};
