let currentDate = new Date();
let today = "" ;

console.log( +currentDate )

let time = ( currentDate.getFullYear() ) + "-" +
    (currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth()+1) : (currentDate.getMonth()+1)) + "-"
    + (currentDate.getDate() < 10 ? '0' + (currentDate.getDate()) : (currentDate.getDate())) ;

console.log( time )

let start = new Date( time + " 00:00:00");
let end = new Date( time + " 23:59:59");

console.log( +start, +end )

let test = new Date( "2017-05-24 14:12:11.311382+08");
console.log( test )