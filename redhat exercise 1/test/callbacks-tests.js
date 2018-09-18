var Callbacks = require('../src/Callbacks');
var assert = require('assert');

describe('Callbacks', function() {
    describe('remoteMathsService', function() {
        it('should return 3 after awaiting services', function() {
            Callbacks.remoteMathService((err, answer)=> {
                assert.equal(3, answer);
            })
        });
    });
});