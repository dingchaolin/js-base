var cp = require('child_process');
let fs = require('fs');
var child = cp.fork(__dirname + '/dealImage.js');//每个请求都单独生成一个新的子进程
child.on('message', function(m) {
    console.log("返回结果为======",m.result + '\n');
    //child.kill();
});
for( let i = 1; i < 4; i++ ){
    var input = `./${i}.png`;
    //fs.readFile(input, (err, data) => {
        child.send({input : input});
    //});
}


