function o_03() {
    var remoteGet = function (cb) {
        return cb("ok");
    };

    for (var i = 0; i < 3; i++) {
        remoteGet(function (res) {
            console.log(res + ":" + i);
        });
    }
}
function o_04() {
    var remoteGet = function (cb) {
        setTimeout(() => {
            return cb("ok");
        }, 0);
    };

    for (var i = 0; i < 3; i++) {
        remoteGet(function (res) {
            console.log(res + ":" + i);
        });
    }
}
function o_05() {
    var remoteGet = function (cb) {
        setTimeout(() => {
            return cb("ok");
        }, 0);
    };

    for (let i = 0; i < 3; i++) {
        remoteGet(function (res) {
            console.log(res + ":" + i);
        });
    }
}

o_03();