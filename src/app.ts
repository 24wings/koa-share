import koa = require('koa');
import fs = require('fs');
import crypto = require('crypto');
import service = require('./services');
import Router = require('koa-router');
import staticServer = require('koa-static');
import bodyparser = require('koa-bodyparser');
import path = require('path');
import compress = require('koa-compress');
import { Core } from './lib';
import config from './app.config';
var app = new koa();
let routes = Core.Route.RouteBuilder.scannerRoutes(path.resolve(__dirname, './Controller'));
let router = new Router();
// router.ge('/', (ctx, next) => {
//     let { signature, timestamp, nonce, echostr } = ctx.query;
//     let token = config.wechat.token
//     let sha1 = crypto.createHash('sha1');


//     let sign = sha1.update(nonce + timestamp + token).digest('hex');

//     ctx.body = echostr;





// })

router.all('/:service.:action.go', ...routes)
    
    .all('/share/:action', async (ctx, next) => {
        let { parent, taskId } = ctx.query;

        if (parent && ctx.params.action == 'taskDetail') {
            let url = await config.wxOauth.getOauthUrl('http://wq8.youqulexiang.com/wechat/oauth', { parent, taskId });
            console.log('share-detail', url);
            // await ctx.response.redirect(url);
            ctx.redirect(url)
        } else {
            let html = await new Promise(async (resolve, reject) => {
                fs.readFile(path.resolve(__dirname, '../public/index.html'), 'utf-8', (err, data) => {
                    if (err) console.error(data)

                    resolve(data)
                });
            });
            ctx.body = html;
        }
    })
    .all('/advert/:action', async (ctx, next) => {
        let html = await new Promise(async (resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../advert/advert/index.html'), 'utf-8', (err, data) => {
                if (err) console.error(data)

                resolve(data)
            });
        });
        ctx.body = html
    })
    .all('/admin/:action', async (ctx, next) => {
        let html = await new Promise(async (resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../advert/advert/index.html'), 'utf-8', (err, data) => {
                if (err) console.error(data)

                resolve(data)
            });
        });
        ctx.body = html
    })
    .all('/login', async (ctx, next) => {
        let html = await new Promise(async (resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../advert/advert/index.html'), 'utf-8', (err, data) => {
                if (err) console.error(data)
                resolve(data)
            });
        });
        ctx.body = html
    })
router.get('/wechat/oauth', async (ctx, next) => {
    let { code, parent, taskId } = ctx.query;
    console.log(`query:`, ctx.query);
    /**获取用户的openid */
    let token = await config.wxOauth.getAccessToken(code);
    let user = await service.db.userModel.findOne({ openid: token.openid }).exec();
    if (user) {
        console.log('有用户 ');
        await user.update({ access_token: token.access_token }).exec();
        if (taskId) {
            ctx.redirect(`/share/taskDetail?taskId=${taskId}&shareUserId=${user._id}`);
        } else {
            ctx.redirect(`/share/index?openid=` + token.openid);
        }
    } else {
        let newUser = await config.wxOauth.getUserByTokenAndOpenId(token.access_token, token.openid);
        newUser.accessToken = token.access_token;
        newUser.openid = token.openid;
        if (parent) {
            newUser.parent = parent;
            console.log('新用户的师傅是' + parent);
            await service.db.userModel.findByIdAndUpdate(parent, { $inc: { todayStudent: 1, totalStudent: 1 } }).exec();
        } else {
            console.log('新用户没有师傅');
        }
        let saveUser = await new service.db.userModel(newUser).save();
        if (taskId) {
            ctx.redirect(`/share/taskDetail?taskId=${taskId}&shareUserId=${saveUser._id}`);
        } else {
            ctx.redirect('/share/index?openid=' + token.openid);
        }
    };
});
let server = app
    .use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        ctx.set("X-Powered-By", ' 3.2.1')
        if (ctx.method == "OPTIONS") ctx.body = 200;/*让options请求快速返回*/
        else {
            await next();
        }
    })
    .use(compress({
        filter: function (content_type) {
            return /.js$/i.test(content_type)
        },
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }))

    .use(async (ctx, next) => {
        let start = new Date().getTime();
        await next();
        let time = new Date().getTime() - start;
        ctx.set('x-response-time', time + 'ms');
        console.log(`${ctx.method}   ${ctx.url}  ${time}ms`);
    })

    .use(staticServer(path.resolve(__dirname, '../public')))
    .use(staticServer(path.resolve(__dirname, '../pppp')))
    .use(staticServer(path.resolve(__dirname, '../advert')))
    .use(bodyparser({ jsonLimit: '50mb', formLimit: '50mb' }))
    .use(router.routes())
    .use(router.allowedMethods());


const cluster = require('cluster');

const numCPUs = require('os').cpus().length;

if (false//cluster.isMaster
) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    server.listen(80, () => {
        console.log('server is running on 80')
    })

    console.log(`Worker ${process.pid} started`);
}



