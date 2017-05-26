/**
 * Created by lenovo on 2017/5/25.
 */
//单利模式

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
        this._handler(transaction,done);
    }
}

const queue=new Queue();

const Instance=function () {
    return queue;
}

exports.instance=Instance;