/**
 * Created by dcl on 2017/5/24.
 */
let upsert = require('./logAPI').upsert;
let zco = require( "zco" );
let account = "5678",
    areacode = "01011",
    status = 5,
    return_msg = "第5部",
    source = "01110";

let test = function( ){
    return zco( function *( next ){

        let [err,data] = yield upsert(
            account,
            areacode,
            status,
            return_msg,
            source
        )(next);
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

