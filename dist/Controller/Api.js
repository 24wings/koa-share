"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const path = require("path");
const fs = require("fs");
const app_config_1 = require("../app.config");
let default_1 = class extends lib_1.Core.Route.BaseRoute {
    doAction(action, method, next) {
        switch (action) {
            case 'uploadBase64': return this.uploadBase64;
            case 'url2Qrcode': return this.url2Qrcode;
            case 'videoBase64': return this.videoBase64;
        }
    }
    async videoBase64() {
    }
    async url2Qrcode() {
        let { url, type } = this.ctx.request.body;
        if (!type)
            type = 'png';
        let base64 = await app_config_1.default.picture.urlToQrcode(url, type);
        base64 = 'data:image/png;base64,' + base64;
        this.ctx.body = { ok: true, data: base64, url };
    }
    async before() {
        await this.next();
    }
    after() { }
    index() {
        this.ctx.body = 'hello';
    }
    async uploadBase64() {
        let base64 = this.ctx.request.body.base64;
        var ctrl = this;
        function uploadFile(file, filename) {
            return new Promise((resolve, reject) => {
                if (file.indexOf('base64,') != -1) {
                    file = file.substring(file.indexOf('base64,') + 7);
                }
                let randomFilename = new Date().getTime() + filename;
                let distpath = path.resolve(app_config_1.default.uploadDir + '/' + randomFilename);
                fs.writeFile(distpath, new Buffer(file, 'base64'), (err) => {
                    err ? resolve(false) : resolve('/upload/' + randomFilename);
                });
            });
        }
        let url = await uploadFile(base64, this.ctx.request.body.filename || 'test.png');
        console.log('上传图片:' + url);
        this.ctx.body = { ok: true, data: app_config_1.default.IP + url };
    }
};
default_1 = __decorate([
    lib_1.Core.Route.Controller({
        service: 'api',
    })
], default_1);
exports.default = default_1;
