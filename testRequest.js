
let request = require('request');
let url = `https://clientaccess.10086.cn/biz-orange/DN/security/getSecurityId`;
let options = {
    url: url,
    method: 'POST',
    encoding:null,
    headers:{},
    /*
    {
        "xs": "15bde2cd91f96e51b674931bb3429962",
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": 602,
        "Host": "clientaccess.10086.cn",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.7.0"
    },*/
    form:JSON.stringify( {"ak":"F4AA34B89513F0D087CA0EF11A3277469DC74905","cid":"1++3osYUQOsVujA49oF8H/Lthmq4XgEOGBT4usLZNtERpvPsXDaB/BsISo3Alc5scxoGn/peKPjGz9p43Gd1bRiTsD96ZFgfnvANWpPApF4=","city":"","ctid":"1++3osYUQOsVujA49oF8H/Lthmq4XgEOGBT4usLZNtERpvPsXDaB/BsISo3Alc5scxoGn/peKPjGz9p43Gd1bRiTsD96ZFgfnvANWpPApF4=","cv":"3.8.0","en":"0","imei":"99000672531991","nt":"3","prov":"","reqBody":{"ssk":"1++3osYUQOsVujA49oF8H/Lthmq4XgEOGBT4usLZNtERpvPsXDaB/BsISo3Alc5scxoGn/peKPjGz9p43Gd1bRiTsD96ZFgfnvANWpPApF4="},"sb":"Xiaomi","sn":"Mi-4c","sp":"1080x1920","st":"1","sv":"5.1.1","t":"","tel":"99999999999","xc":"A2081","xk":""}),
    timeout:60*1000,
    gzip:true,
};

    request( options, ( err, response, body ) => {
        console.log( body.toString() );
    })
