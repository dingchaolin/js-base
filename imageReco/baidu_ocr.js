
/**
 登陆 百度bcs控制台中心 申请access key
 https://console.bce.baidu.com/iam/#/iam/accesslist
 **/
var ak = 'b7d11214c8fc452db3de12028cf46daa';
var sk = '64631fe987f4423bb0a117101bf90a45'
var ocr = require('baidu-ocr-api').create(ak,sk);
// 外部图片
//type: def text
/*
 text:'/v1/recognize/text', // 识别某张图中的所有文字
 line:'/v1/recognize/line', // 将结果作为单行文字去解析
 character:'/v1/recognize/character'
 */
//language CHE_ENG CHE ENG  def CHE_ENG
// merge def true
ocr.scan({
    url:'./jbxx.png', // 支持本地路径
    type:'text',
    merge:false,
}).then(function (result) {
    return console.log(JSON.stringify(result))
}).catch(function (err) {
    console.log('err', err);
})