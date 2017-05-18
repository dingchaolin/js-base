const validator = require('validator');

let jsonStr = `{a:1,c:{b:{d:2}}}`;

let flag = validator.isJSON( jsonStr );

console.log( flag );

let regExp_left = /{/g;
console.log( jsonStr.match( regExp_left ) );

let regExp_right = /}/g;
console.log( (jsonStr.match( regExp_right )||[]).length );
