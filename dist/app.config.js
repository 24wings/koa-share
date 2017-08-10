"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const lib_1 = require("./lib");
exports.default = new class {
    constructor() {
        this.adverster = {};
        //随机字符串
        this.randomStr = 'random';
        /**
         * 商户名称
         */
        this.wechatName = '武汉铭禄科技有限公司';
        this.oldAuth = 'shop.xxbuy.net';
        this.uploadDir = path.resolve(__dirname, '../public/upload');
        this.newAuth = '';
        this.domain = 'http://wq8.youqulexiang.com';
        this.oauthPath = '/wechat/oauth';
        this.IP = 'http://47.92.87.28';
        this.wechatPay = {
            partnerKey: "minglu12minglu12minglu12minglu12",
            appId: 'wx8bdcc982b8477839',
            mchId: "1447732502",
            notifyUrl: "http://wq8.youqulexiang.com/payment/",
            pfx: fs.readFileSync(path.resolve(__dirname, '../temp/apiclient_cert.p12'))
        };
        this.wechatPayment = {
            appid: 'wx8bdcc982b8477839',
            mch_id: '1447732502',
            apiKey: 'minglu12minglu12minglu12minglu12',
            notify_url: 'http://wq8.youqulexiang.com/payment/',
            trade_type: 'APP',
            pfx: fs.readFileSync(path.resolve(__dirname, '../temp/apiclient_cert.p12')) //微信商户平台证书 (optional，部分API需要使用) 
        };
        this.servicePayment = {
            much_appId: '1485776572',
        };
        this.jssdk = {
            "wechatToken": "sbnEzLbl77Gqnovb7Gqljj7TqYbRPprR",
            "appId": "wx07a1ef24ca488840",
            "appSecret": "ffe69aaff2487a7f1557f4e2e33952e6",
        };
        // wechatClient: ''
        // 静态文件服务器
        this.publicDirs = [path.resolve(__dirname, '../public')];
        this.port = 8080;
        this.wechat = {
            appid: 'wx8bdcc982b8477839',
            token: 'sbnEzLbl77Gqnovb7Gqljj7TqYbRPprR',
            appsecret: 'ffe69aaff2487a7f1557f4e2e33952e6',
            encodingAESKey: 'A985jVM2v8QeiVHi85ILizNeLNqjI68yHmUjn46I2JM',
            checkSignature: true,
            apiKey: 'minglu12minglu12minglu12minglu12',
            notifyUrl: "http://wq8.youqulexiang.com/payment/",
            mchId: "1447732502",
            pfx: fs.readFileSync(path.resolve(__dirname, '../temp/apiclient_cert.p12'))
        };
        /**
         *
         * 微信授权登陆
         * 具体使用方法看类说明
         */
        this.wxOauth = new lib_1.WechatOauth(this.wechat.appid, this.wechat.appsecret);
        this.wxPay = new lib_1.WechatPay({
            apiKey: this.wechat.apiKey,
            appid: this.wechat.appid,
            trade_type: 'APP',
            notify_url: this.wechat.notifyUrl,
            mch_id: this.wechat.mchId,
            pfx: this.wechat.pfx
        });
        this.wxApi = new lib_1.WechatApi(this.wechat.appid, this.wechat.appsecret);
    }
};
Object.seal(exports.default);
