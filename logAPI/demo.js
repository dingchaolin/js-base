/**
 * Created by dcl on 2017/5/24.
 */
let upsert = require('./logAPI').upsert;
let zco = require( "zco" );
let account = "231425",
    areacode = "01011",
    status = 6,
    return_msg = "第6部",
    source = "01110";
let transaction = {account,areacode,status,return_msg,source};
let test = function( ){
    return zco( function *( next ){

        let [err,data] = yield upsert( transaction )(next);
        if( err ){

            throw err;
        }
        return data;
    })
};

test()( ( err,data ) => {
    if( err ){
        console.log( err );
    }
    if( data ){

        console.log("返回信息为====", data );

    }
})

