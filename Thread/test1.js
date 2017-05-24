var cp = require('child_process');
var child = cp.fork(__dirname + '/dealImage.js');//每个请求都单独生成一个新的子进程
child.on('message', function(m) {
    console.log("返回结果为======",m.result + '\n');
    child.kill();
});
for( let i = 1; i < 6; i++ ){
    var input = i;
    child.send({input : input});
}


