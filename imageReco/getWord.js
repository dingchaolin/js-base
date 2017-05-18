/**
 * Created by lenovo on 2017/5/18.
 */
var Tesseract = require('tesseract.js');

Tesseract.recognize(`./jbxx.png`, {
        lang: 'chi_sim'
}).progress((res)=>{
    //console.log( res );
}).then(function(result){
       console.log(result.text)
})

/*
 注册用户名 denggan1 注册用户韦讥号 13879126662
 单位账号 0106666 单l立名称 南昌市财政统发单位
 职工账号 7014360440 职工姓名 邓钢

 账户状态 正常 酊件号码 三6010419760620045三
 个人缴存比例 12% 单位缴存比例 12%

 工资基放 6600 足否冻结 否

 开户日胆 2013一11一27 月缴存颉 2064

 上〒结辖金颉 6176992 账户佘颉 97，S7392
 */