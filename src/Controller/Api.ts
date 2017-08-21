import { Core } from '../lib';
import path = require('path');
import fs = require('fs');
import config from '../app.config';
@Core.Route.Controller({
    service: 'api',
})
export default class extends Core.Route.BaseRoute implements Core.Route.IRoute {
    doAction(action: string, method: string, next) {
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
        if (!type) type = 'png';
        let base64 = await config.picture.urlToQrcode(url, type);
        base64 = 'data:image/png;base64,' + base64;
        this.ctx.body = { ok: true, data: base64, url };
    }
    async before() {
        await this.next()
    }
    after() { }

    index() {
        this.ctx.body = 'hello';
    }
    async  uploadBase64() {
        let base64 = this.ctx.request.body.base64;
        var ctrl = this;
        function uploadFile(file, filename) {
            return new Promise((resolve, reject) => {
                if (file.indexOf('base64,') != -1) {
                    file = file.substring(file.indexOf('base64,') + 7);
                }
                let randomFilename = new Date().getTime() + filename;
                let distpath = path.resolve(config.uploadDir + '/' + randomFilename);

                fs.writeFile(distpath, new Buffer(file, 'base64'), (err) => {
                    err ? resolve(false) : resolve('/upload/' + randomFilename);
                });
            })
        }
        let url = await uploadFile(base64, this.ctx.request.body.filename || 'test.png');
        console.log('上传图片:' + url);
        this.ctx.body = { ok: true, data: config.IP + url };

    }

} 