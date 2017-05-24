const pg = require("pg");
const zco = require("zco");
const query = function ( conString, sql, options ) {

    return zco( function * (next,defer) {
        let [err, client, done] = yield pg.connect( conString, next );

        defer(function *() {
            done&&done();
        });

        if( err ){
            throw err;
        }
        if( client ){
            //console.log( "postgres连接成功...")
        }

        let [errClient, result ] = yield client.query(sql, options,next);
        if( errClient ){
            //console.log( "errClient,postgres关闭连接...");

            throw errClient;
        }

        return result;
    });
};

module.exports = query;
