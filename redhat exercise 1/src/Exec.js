var Callbacks = require('./Callbacks');

Callbacks.remoteMathService(function(err, answer) {
    if (err) console.log('error ', err);
    if (answer !== 3) console.log('wrong answer', answer);
    else console.log('correct');
});