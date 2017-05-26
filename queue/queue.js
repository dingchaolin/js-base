let zco = require('zco');
function Queue(){
    this._handler=null;//处理事务的句柄
    this._queue=[];
    this._mutex=false;
}

Queue.prototype.add=function (transaction) {
    this._queue.push(transaction);
    this._awake();
}

Queue.prototype.setHandler=function (func) {
    this._handler=func;
}

Queue.prototype._awake=function(){
    if(this._queue.length>0&& false===this._mutex){
        this._mutex=true;
        let transaction=this._queue.shift();
        var self=this;
        let done=function () {
            self._mutex=false;
            self._awake();
        }
        this._handler( transaction )((err,data)=>{
            console.log(data);
            done();
        });

    }
}

let queue=new Queue();
let fs = require("fs");
function zcoCB(){
    return zco( function *(next) {
        let [err,data] = yield fs.readFile( "./test.txt", next);
        return data.toString();
    });
};

let upsert = function( logInfo ){
    return zco( function *(next) {
        let [err,data] = yield zcoCB();

        return { data:data, logInfo:logInfo };
    })

}

queue.setHandler( upsert );

for( let i = 0; i < 10; i ++ ){
    queue.add( {a:i} );
}




