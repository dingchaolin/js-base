/**
 * Created by dcl on 2017/6/5.
 */

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '1124373818@qq.com',
        pass: 'mydtxxhrgfcqihje' //授权码,通过QQ获取

    }
});

var mailOptions = {
    from: '1124373818@qq.com', // 发送者
    to: '18810042351@163.com', // 接受者,可以同时发送多个,以逗号隔开
    subject: '2017-06-0x日报', // 标题
    html: html
};


transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('发送成功');
});