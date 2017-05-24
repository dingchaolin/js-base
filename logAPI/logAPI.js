const zco = require( "zco" );
const pgConnectionStr = require( "./db/pgConfig" );
const pgClient = require( "./db/pgClient.js" );
const pgOptions = [];

/**
 * 检查是否存在该用户的记录
 * @param account, source
 * @return obj
 */


function isExist( account, source = "" ){
    return zco( function * ( next ){
        if( !account ){
            return {
                isExist: false,
                msg:"account is NULL！"
            }

        }

        let sqlStr = `select count(*) as num from log where account = '${account}' and source = '${source}'`;

        let [err, data ] = yield pgClient( pgConnectionStr, sqlStr, pgOptions);
        let isExist = true, msg = "Exist!";
        if( err || data.rows[0].num <= 0 ){
            isExist = false;
            msg = "Not Exist!"
        }

        return {
            isExist,
            msg
        }

    });
}

/**
 * 插入一条记录
 * @param account, areacode, source, status, return_msg
 * @return Obj
 */
function upsert( account, areacode, status, return_msg, source = "" ){
    return zco( function * ( next ){
        if( !account || !areacode || !status){
            return {
                success: false,
                msg: "params Error from insert: account or areacode or status is Empty!",
                sql: "",
            }

        }

        let [existErr, exist] = yield isExist(account, source);
        if( existErr ){
            console.log(`${account}-${account}，error from insert, exec isExist...`)
            throw existErr;
        }
        let sqlStr = "";
        let flag = false;
        if( exist.isExist ){//存在-更新

            sqlStr = `update log set status = ${status}, return_msg = '${return_msg}', update_time = now() where account = '${account}'  and source = '${source}' `;

        }else{//不存在-插入
            flag = true;
            sqlStr = `insert into log(account, areacode, source, status, return_msg, update_time) values('${account}','${areacode}', '${source}', ${status}, '${return_msg}', now() )`;

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