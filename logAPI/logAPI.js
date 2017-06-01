const zco = require( "zco" );
const pgConnectionStr = require( "./db/pgConfig" );
const pgClient = require( "./db/pgClient.js" );
const pgOptions = [];

/**
 * 检查是否存在该用户的记录
 * @param account, source
 * @return obj
 */


function isExist( account, status, source = "" ){
    return zco( function * ( next ){
        if( !account ){
            return {
                state: 0,
                msg:"account is NULL！"
            }

        }

        let currentDate = new Date();

        let time = ( currentDate.getFullYear() ) + "-"
            + (currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth()+1) : (currentDate.getMonth()+1)) + "-"
            + (currentDate.getDate() < 10 ? '0' + (currentDate.getDate()) : (currentDate.getDate())) ;

        let start = +( new Date( time + " 00:00:00") ), end = +( new Date( time + " 23:59:59") );

        let sqlStr = `select status from log where account = '${account}' and source = '${source}' and time_stamp < ${end} and time_stamp > ${start}`;
        console.log( sqlStr )
        let [err, data ] = yield pgClient( pgConnectionStr, sqlStr, pgOptions);
        console.log( data );
        let state = 0, msg = "status <= db.status";//状态落后于数据库中的状态
        // 0 不插入不更新 1插入 2更新
        if( err ){
            state = 0;
            msg = "查询出错"
        }else if( data.rows.length == 0  ){//不存在-插入
            state = 1;
            msg = "不存在"
        }else if( data.rows.length > 0  ){//存在
            if( data.rows[0].status < status ){//可更新
                state = 2;
                msg = "存在"
            }
        }

        return {
            state,
            msg
        }

    });
}

/**
 * 插入一条记录
 * @param {account, areacode, source, status, return_msg, type}
 * @return Obj
 */
function upsert( transaction ){
    return zco( function * ( next ){

        if( Object.keys( transaction ).length == 0 ){
            return {
                success: false,
                msg: "params Error from insert: params is Empty!",
                sql: "",
            }
        }

        let account = transaction.account,
            areacode = transaction.areacode,
            status = transaction.status,
            return_msg = transaction.return_msg,
            type = transaction.type,
            source = transaction.source || "";

        if( !account || !areacode || !status){
            return {
                success: false,
                msg: "params Error from insert: account or areacode or status is Empty!",
                sql: "",
            }

        }

        let [existErr, exist] = yield isExist(account, status, source);
        if( existErr ){
            console.log(`${account}-${account}，error from insert, exec isExist...`)
            throw existErr;
        }
        let sqlStr = "";
        let flag = false;
        let time_stamp = (+new Date());
        if( exist.state == 2){//存在-更新

            let currentDate = new Date();
            let time = ( currentDate.getFullYear() ) + "-" +
                (currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth()+1) : (currentDate.getMonth()+1)) + "-"
                + (currentDate.getDate() < 10 ? '0' + (currentDate.getDate()) : (currentDate.getDate())) ;
            let start = +( new Date( time + " 00:00:00") ),end = +( new Date( time + " 23:59:59") );

            sqlStr = `update log set status = ${status}, return_msg = '${return_msg}', update_time = now(), time_stamp = ${time_stamp} where account = '${account}'  and source = '${source}' and time_stamp < ${end} and time_stamp > ${start}`;

        }else if( exist.state == 1){//不存在-插入
            flag = true;
            sqlStr = `insert into log(account, areacode, source, status, return_msg, update_time, time_stamp, type) values('${account}','${areacode}', '${source}', ${status}, '${return_msg}', now(), ${time_stamp}, ${type} )`;

        }else {
            return {
                success: false,
                msg: "status behind or error!",
                sql: "",
            }
        }

        let [err, data ] = yield pgClient( pgConnectionStr, sqlStr, pgOptions);

        let success = true;
        let msg = flag ? "insert success" : "update success";

        if( err || data.rowCount <= 0 ){
            success = false;
            msg = flag ? "insert failed" : "update failed";
        }


        return {
            success: success,
            msg:msg,
            sql: sqlStr,
        }

    });
}





module.exports = { upsert };