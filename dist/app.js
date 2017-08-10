"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa = require("koa");
const fs = require("fs");
const Router = require("koa-router");
const staticServer = require("koa-static");
const bodyparser = require("koa-bodyparser");
const path = require("path");
const lib_1 = require("./lib");
var app = new koa();
let routes = lib_1.Core.Route.RouteBuilder.scannerRoutes(path.resolve(__dirname, './Controller'));
let router = new Router();
router.all('/:service.:action.go', ...routes);
router.all('/share/:act', async (ctx, next) => {
    let html = await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, '../public/index.html'), 'utf-8', (err, data) => {
            if (err)
                console.error(data);
            resolve(data);
        });
    });
    ctx.body = html;
});
app.use(async (ctx, next) => {
    let start = new Date().getTime();
    await next();
    let time = new Date().getTime() - start;
    ctx.set('x-response-time', time + 'ms');
    console.log(`${ctx.method}   ${ctx.path}  ${time}ms`);
})
    .use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("X-Powered-By", ' 3.2.1');
    if (ctx.method == "OPTIONS")
        ctx.res.end(200); /*让options请求快速返回*/
    else {
        await next();
    }
})
    .use(staticServer(path.resolve(__dirname, '../public')))
    .use(bodyparser({ jsonLimit: '50mb', formLimit: '50mb' }))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(8080, () => {
    console.log('server is running on 8080');
});
