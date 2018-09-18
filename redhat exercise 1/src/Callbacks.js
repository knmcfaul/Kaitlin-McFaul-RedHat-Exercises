exports.remoteMathService = function(cb) {
    let one, two;
    const promises = [
        callOneService(function(err, num) {
            one = num;
        }),
        callTwoService(function(err, num) {
            two = num;
        })
    ];
    Promise.all(promises).then(()=> {
        return cb(undefined, one + two);
    });
};

function callOneService(cb) {
    return new Promise((resolve)=> {
        setTimeout(function() {
            resolve(cb(undefined, 1));
        }, 1000);
    });
}

function callTwoService(cb) {
    return new Promise((resolve)=> {
        setTimeout(function() {
            resolve(cb(undefined, 2));
        }, 1500);
    });
}