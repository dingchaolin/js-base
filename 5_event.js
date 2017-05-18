/**
 * Created by lenovo on 2017/5/16.
 */
//const EventEmitter = require('events');

//let emitter = new EventEmitter();
//
//emitter.on('myEvent', () => {
//    console.log('hi 1');
//});
//
//emitter.on('myEvent', () => {
//    console.log('hi 2');
//});
//
//emitter.emit('myEvent');



//#####################################################

//const EventEmitter = require('events');
//
//let emitter = new EventEmitter();
//
//emitter.on('myEvent', () => {//会导致死循环
//    console.log('hi');
//    emitter.emit('myEvent');
//});
//
//emitter.emit('myEvent');



//#########################################
const EventEmitter = require('events');

let emitter = new EventEmitter();

emitter.on('myEvent', function sth () {//打印一次退出
    emitter.on('myEvent', sth);
    console.log('hi');
});

emitter.emit('myEvent');