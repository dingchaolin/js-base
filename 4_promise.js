/**
 * Created by dcl on 2017/5/16.
 */
setTimeout(function() {
    console.log(1)
}, 0);//会把要执行的事件放在队列的最后
new Promise(function executor(resolve) {
    console.log(2);
    for( var i=0 ; i<1000000 ; i++ ) {
        i == 999999 && resolve();
    }
    console.log(3);
}).then(function() {
    console.log(4);
});
console.log(5);

// 23541