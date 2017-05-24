var Tesseract = require('tesseract.js');
process.on('message', function(m) {
    console.log( m )
    Tesseract.recognize(m.input, {
        lang: 'chi_sim'
    }).progress((res)=>{
        //console.log( res );
    }).then(function(result){
        console.log("处理完毕")
        process.send({result: result.text});
    })

});