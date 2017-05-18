//let arr = [];
//arr.push();
//console.log( arr, arr.length );
//
//while( true ){
//    arr.push( new Buffer(1000) );
//    console.log( arr.length );
//}


var theThing = null
var replaceThing = function () {
    var originalThing = theThing
    var unused = function () {
        if (originalThing)
            console.log("hi")
    }
    theThing = {
        longStr: new Array(1000000).join('*'),
        someMethod: function () {
            console.log(someMessage)
        }
    };
};
setInterval(replaceThing, 1000)