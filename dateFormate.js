/**
 * Created by lenovo on 2017/6/2.
 */
function formatDate( timeStamp ){
    let currentDate = new Date( timeStamp );
    let time = ( currentDate.getFullYear() ) + "-" +
        (currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth()+1) : (currentDate.getMonth()+1)) + "-"
        + (currentDate.getDate() < 10 ? '0' + (currentDate.getDate()) : (currentDate.getDate())) ;

    return time;
}

function getDate( showDate ){
    let date = [];
    let day = 1000*60*60*24;
    let currentDate = +new Date();
    for( let i = 0; i < 400 ; i ++ ){
        currentDate = new Date( currentDate - day ) ;
        let time = ( currentDate.getFullYear() ) + "-" +
            (currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth()+1) : (currentDate.getMonth()+1)) + "-"
            + (currentDate.getDate() < 10 ? '0' + (currentDate.getDate()) : (currentDate.getDate())) ;
        date.push( time );
        if( time == showDate ){
            break;
        }
    }
    return date;

};

console.log( formatDate(1496289600000));