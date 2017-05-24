/**
 * Created by lenovo on 2017/5/18.
 */
var Tesseract = require('tesseract.js');
let path = __dirname + `/2.png`;
console.log( path )
Tesseract.recognize( path,{
        lang: 'eng'
}).progress((res)=>{
    //console.log( res );
}).then(function(result){
       console.log(result.text)
})

