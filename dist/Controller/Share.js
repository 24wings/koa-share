"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
let default_1 = class extends lib_1.Core.Route.BaseRoute {
    constructor() {
        super();
    }
    doAction(action, method, next) {
        switch (action) {
            case 'index': return this.index;
            case 'user': return this.user;
            case 'task': return this.task;
            case 'recruit-student': return this.recruitStudent;
            case 'person-center': return this.personCenter;
            case 'full-info': switch (method) {
                case 'get': return this.fullInfoPage;
                case 'post': return this.fixFullInfo;
            }
            case 'publish': switch (method) {
                case 'get': return this.publishPage;
                case 'post': return this.publishTask;
            }
            case 'payTaskMoney': return this.payTaskMoney;
            case 'shop-center': return this.shopCenter;
            case 'student-money': return this.studentMoney;
            case 'myMoney': return this.myMoney;
            case 'taskDetail': return this.taskDetail;
            case 'getMoney':
                switch (method) {
                    case 'get': return this.getMoney;
                    case 'post': return this.getMoneyDo;
                }
                ;
            case 'guide': return this.guide;
            case 'task-list':
                switch (method) {
                    case 'delete': return this.taskList;
                    case 'post': return this.taskList;
                    case 'put': return this.taskList;
                    default: return this.taskList;
                }
                ;
            // case 'qqGroup': return this.qqGroup;
            case 'get-money-record': return this.getMoneyRecord;
            case 'fans-money': return this.fansMoney;
            case 'money-log': return this.moneyLog;
            case 'share-money': return this.shareMoney;
            case 'task-page': return this.taskPage;
            case 'thumbsup': switch (method) {
                case 'get': return this.thumbsUp;
                case 'post': return this.thumbsUpDo;
            }
            default: return this.index;
        }
    }
    async task() {
        let task = await this.db.taskModel.findById(this.ctx.query._id).exec();
        this.ctx.body = { ok: true, data: task };
    }
    async user() {
        let user = await this.db.userModel.findOne({ openid: this.ctx.query.openid }).exec();
        this.ctx.body = { ok: true, data: user };
    }
    async thumbsUp() {
        /*
        let { url } = this.req.query;
        let thumb = await this.db.thumbsUpModel.findOne({ url }).exec();
        if (thumb) {
            this.res.json({ ok: true, data: thumb.num })
        } else {
            this.res.json({ ok: true, data: 0 });
            await new this.db.thumbsUpModel({ url, num: 0 }).save();
        }
*/
    }
    async thumbsUpDo() {
        /*
               let { url } = this.req.body;
               let thumb = await this.db.thumbsUpModel.findOne({ url }).update({ $inc: { num: 1 } }).exec();
               this.res.json({ ok: true, data: thumb });
       */
    }
    // async qqGroup() {
    //     this.display();
    // }
    async taskPage() {
        /*
       let page = this.req.query.page || 0;
       let taskTag = this.req.query.taskTag;
       let tasks = [];
       if (taskTag) {
           tasks = await this.db.taskModel.find({ taskTag }).skip(10 * page).limit(10).exec();
       } else {
           tasks = await this.db.taskModel.find().skip(10 * page).limit(10).exec();
       }
       this.res.json({ ok: true, data: tasks });
*/
    }
    async shareMoney() {
        /*
        let taskRecords = await this.db.taskRecordModel
            .find({ 'shareDetail.user': this.req.session.user._id.toString() })
            .populate('task').exec();
        if (taskRecords.length > 0) {
            console.log(JSON.stringify(taskRecords[0].shareDetail));
        } else {
            console.log('taskRecords')
        }
        this.render('share-money', { taskRecords });
        */
    }
    async before() {
        await this.next();
    }
    after() {
        this.next();
    }
    /**返回首页的内容 */
    async index() {
        let { taskTag } = this.ctx.query;
        let tasks = [];
        let banners = await this.service.db.bannerModel.find({ active: true }).populate('task').exec();
        let taskTags = await this.service.db.taskTagModel.find().exec();
        if (taskTag) {
            tasks = await this.service.db.taskModel.find({ taskTag }).limit(10).exec();
        }
        else {
            tasks = await this.service.db.taskModel.find().limit(10).exec();
        }
        this.ctx.body = { ok: true, data: { tasks, banners, taskTags } };
    }
    async recruitStudent() {
        /*
        var user = await this.db.userModel.findById(this.req.query.userId).exec();
        var authUrl = await this.service.wechat.getAuthorizeURL({ parent: this.req.query.userId });
        console.log(`authUrl:` + authUrl);
        await this.res.render('share/recruit-student', {
            authUrl,
            user
        });
        */
    }
    /**个人中心 */
    async personCenter() {
        /*
        let user = this.req.session.user;
        user = await this.service.db.userModel.findById(user._id.toString()).exec();

        console.log(user);
        this.res.render('share/person-center', {
            user
        });
        */
    }
    /**完善信息页面 */
    fullInfoPage() {
        /*
        this.res.render('share/full-info')
        */
    }
    /**
     *
     * 提交表单
     */
    async fixFullInfo() {
        /*
        let { qq, phone, weixinId } = this.req.body
        await this.service.db.userModel.findById(this.req.session.user._id.toString()).update({ qq, phone, weixinId, isFinish: true }).exec();
        this.res.redirect('/share/person-center')
        */
    }
    async publishPage() {
        /*
        let taskTags = await this.service.db.taskTagModel.find().exec();
        this.res.render('share/publish', { taskTags })
        */
    }
    /**商户中心 */
    async shopCenter() {
        /*
                var tasks = await this.service.db.taskModel.find({ publisher: this.req.session.user._id.toString() }).exec();
                let activeNum = tasks.filter(task => task.active).length;
                var totalClickNum = 0;
                var totalFee = 0;
                tasks.forEach(task => {
                    totalClickNum += task.clickNum || 0;
                    totalFee += task.totalMoney || 0;
                }
                );
                this.res.render('share/shop-center', {
                    user: this.req.session.user,
                    allTaskNum: tasks.length,
                    activeNum,
                    totalClickNum,
                    totalFee
                })
                */
    }
    /**
     * 检查openid是否存在,若用户已经存在,则登陆,若用户不存在,则创建新用户
     * 若有上级parentId存在则作为用户的师傅
     */
    checkOpenIdExisit() {
    }
    async publishTask() {
        /*
        let { title, content, imageUrl, taskTag, shareMoney, totalMoney, websiteUrl } = this.req.body;
        let newTask = await new this.service.db.taskModel({
            title, taskTag,
            content, imageUrl, totalMoney,
            fee: totalMoney, shareMoney, websiteUrl,
            publisher: this.req.session.user._id.toString(), active: true, msg: '审核通过'
        }).save();
        this.res.redirect('/share/index');
        */
    }
    async payTaskMoney() {
        /*
        let ip = this.service.tools.getClientIp(this.req);
        console.log(`ip:` + ip, this.req.ip);
        var order: WeixinOrder = {
            body: '支付活动费用',
            spbill_create_ip: ip,
            openid: this.req.session.user.openid,
            trade_type: 'JSAPI',
            total_fee: this.req.body.totalMoney * 100,
            attach: '任务费用',
            out_trade_no: 'kfc' + (+new Date),

        };

        let payargs = await config.wxPay.getBrandWCPayRequestParams({
            body: '支付活动费用',
            openid: this.req.session.user.openid,
            spbill_create_ip: ip,
            total_fee: this.req.body.totalMoney * 100
        });
        console.log(payargs);

        if (payargs) {
            order.user = this.req.session.user._id.toString();
            let newRechgaregeRecord = await new this.db.wxRechargeRecordModel(order).save();

            this.res.json({ ok: true, data: payargs });

        } else {
            this.res.json({ ok: false, data: '微信支付失败,查找系统 shareRoute  payTaskMoney 错误' })
        }

*/
    }
    /**
     * 三级分销
     *
     */
    async taskDetail() {
        /*
        var taskId = this.req.query.taskId;
        var shareUserId = this.req.query.shareUserId;
        // 如果是
        var user = this.req.session.user;
        // 若不是注册的用户 , 则跳转到登陆页面, 并转载parent,taskId, 该用户会自动注册,拜师,然后返回这个任务做任务
        if (!user) {
            var url = await this.service.wechat.getAuthorizeURL({ parent: shareUserId, taskId: this.req.params._id })
            this.res.redirect(url);

        } else {
            var params = await this.service.wechat.getJSSDKApiParams({ url: 'http://' + this.req.hostname + this.req.originalUrl });
            var userId = this.req.session.user._id.toString();
            let task = await this.service.db.taskModel.findById(taskId).exec();

            // let user = await service.db.userModel.findById(userId).populate('parent').exec();;
            var isHaveVisited = task.users.some(visitedUser => {
                return user._id.toString() == visitedUser;
            });
            // 新的观看的人
            if (!isHaveVisited) {
                console.log('新的观看的人');
                // 任务算新点击一次
                await task.update({ $inc: { clickNum: 1 } }).exec();

                user = await this.service.db.userModel.findById(this.req.session.user._id.toString()).exec();
                // 任务 增加点击数量,ip访问数量,任务消耗数量,
                /**
                 *
                 *
                 * 钱不够的情况下,不会有任何奖励,并且取消任务的活跃状态
                 */
        /*
        if (task.totalMoney - task.shareMoney < 0) {
            await task.update({ $set: { active: false } }).exec();
            console.log('钱不够');
        } else {
            console.log('任务被点击一次');

            //发布任务的人获得奖金 上级 5%   上上级 10% 上上上级 15%
            var taskAllMoney = task.shareMoney;
            if (user) {
                //
                console.log('有用户');
                var parents = [];
                /**
                 * 有师傅
                 */
        /*
        if (user.parent) {
            // 有师傅
            console.log('第一位师傅id:', user.parent);

            await user.populate('parent').execPopulate();

            parents.push(user.parent);
            if (user.parent.parent) {
                console.log('第二级师傅id:', user.parent.parent);

                parents.push(user.parent.parent);
                await user.parent.populate('parent').execPopulate();


                if (user.parent.parent.parent) {
                    await user.parent.parent.execPopulate();
                    console.log('第三为师傅id:', user.parent.parent);
                    parents.push(user.parent.parent.parent);
                }
            }
        }
        console.log(parents.length + '位师傅');
        switch (parents.length) {
            // 一个师傅都没有
            case 0:
                console.log('一个师傅都没有');
                // await user.update({ $inc: { totalMoney: taskAllMoney, todayMoney: taskAllMoney, historyMoney: taskAllMoney } }).exec();
                await this.service.dbDo.returnMoney([{ userId: this.req.session.user._id.toString(), money: 0, task: taskId }], 0);

                break;
            case 1: //5%
                console.log('一位师傅开始返利');
                let firstParent = parents[0];


                await this.service.dbDo.returnMoney([
                    { userId: userId, money: 0, task: taskId },
                    { userId: firstParent, money: taskAllMoney, task: taskId }
                ], task.shareMoney);
                await task.update({ $inc: { clickNum: 1 }, $push: { users: user._id.toString() }, $set: { totalMoney: task.totalMoney - task.shareMoney } }).exec();

                break
            //两个师傅  5% 10%     本人 85%
            case 2:
                let oneParent = parents[0];
                let twoParent = parents[1];
                let oneMoney = 0.95 * taskAllMoney;
                let twoMoney = 0.05 * taskAllMoney;

                await this.service.dbDo.returnMoney([
                    { money: 0, task: taskId, userId: userId },
                    { money: oneMoney, task: taskId, userId: oneParent },
                    { money: twoMoney, task: taskId, userId: twoParent },

                ], task.shareMoney);
                await task.update({ $inc: { clickNum: 1 }, $push: { users: user._id.toString() }, $set: { totalMoney: task.totalMoney - task.shareMoney } }).exec();

                break;
            case 3:
                let iParent = parents[0];
                let iiParent = parents[1];
                let iiiParent = parents[2];
                let iMoney = 0.85 * taskAllMoney;
                let iiMoney = 0.05 * taskAllMoney;
                let iiiMoney = 0.10 * taskAllMoney;

                // await service.db.userModel.findByIdAndUpdate(iParent._id.toString(), { $inc: { totalMoney: iMoney, todayMoney: iMoney, historyMoney: iMoney } }).exec();
                // await service.db.userModel.findByIdAndUpdate(iiParent._id.toString(), { $inc: { totalMoney: iiMoney, todayMoney: iiMoney, historyMoney: iiMoney } }).exec();
                // await service.db.userModel.findByIdAndUpdate(iiiParent._id.toString(), { $inc: { totalMoney: iiiMoney, todayMoney: iiiMoney, historyMoney: iiiMoney } }).exec();
                // await service.db.userModel.findByIdAndUpdate(user._id.toString(), { $inc: { totalMoney: taskAllMoney, todayMoney: taskAllMoney, historyMoney: taskAllMoney } }).exec();
                await this.service.dbDo.returnMoney([
                    { task: taskId, userId, money: 0 },
                    { task: taskId, userId: iParent, money: iMoney },
                    { task: taskId, userId: iiParent, money: iiMoney },
                    { task: taskId, userId: iiiParent, money: iiiMoney }
                ], task.shareMoney);
                await task.update({ $inc: { clickNum: 1 }, $push: { users: user._id.toString() }, $set: { totalMoney: task.totalMoney - task.shareMoney } }).exec();
                break;
            // 三个师傅
        }
    }
}


} else {
console.log('已经访问过了')
}
/**
* 若有推广人
*
await this.res.render('share/detail', { task, params });
}
*/
    }
    studentMoney() {
        /*
        var user = this.req.session.user;
        this.res.render('share/student-money', {
            user
        });
        */
    }
    async myMoney() {
        /*
        let user = await this.db.userModel.findById(this.req.session.user._id.toString());
        this.res.render('share/myMoney', { user });
        */
    }
    /**
     *
     *
     * 提现
     */
    async getMoney() {
        /*
        this.res.render('share/getMoney', { user: this.req.session.user });
        */
    }
    async getMoneyDo() {
        /*
        let { money } = this.req.body;
        let userId = this.req.session.user._id.toString();
        let user = await this.db.userModel.findById(userId).exec();
        if (typeof money == 'string') money = parseFloat(money);
        if (user.totalMoney >= money) {



            let result = await this.service.pay.payToOne({
                partner_trade_no: new Date().getTime().toString(),
                amount: money * 100,
                openid: user.openid,
                desc: '提现'
            });
            if (result.ok) {
                let action = await this.db.userModel.findByIdAndUpdate(userId, { $inc: { totalMoney: -money, } }).exec();
                this.req.session.user = this.res.locals.user = await this.db.userModel.findById(userId).exec();
                // 请求,钱就会减少

                let newRequest = await new this.db.getMoneyRequestModel({ user: userId, money }).save();

                await this.display({ msg: '提款成功' });
            } else {
                console.log(result.data);
                this.display({ msg: result.data });
            }
        } else {
            this.render('getMoney', { msg: '用户金额不足' });

        }

*/
    }
    async guide() {
        /*
        this.res.render('share/guide', {})
        */
    }
    async taskList() {
        /*
        var active = !this.req.query.active;
        let tasks = [];
        if (active) {
            tasks = await this.service.db.taskModel.find({ publisher: this.req.session.user._id.toString() }).exec();
        } else {
            tasks = await this.service.db.taskModel.find({ publisher: this.req.session.user._id.toString(), active: true }).exec();
        }
        this.res.render('share/task-list', { tasks });
        */
    }
    /**钱的记录 */
    async getMoneyRecord() {
        /*
        let getMoneyRecords = await this.db.getMoneyRequestModel.find({ user: this.req.session.user._id }).exec();
        this.render('get-money-record', { user: this.req.session.user, getMoneyRecords });
       */
    }
    async fansMoney() {
        /*
        let now = new Date().getTime();
        let before24h = now - 24 * 60 * 60 * 1000;
        let taskRecords = await this.db.taskRecordModel
            .find({ 'shareDetail.user': { $in: [this.req.session.user._id.toString()] } })
            .where('createDt').gt(before24h).lt(now).sort({ createDt: -1 }).populate('task').exec();

        /** 总收益
        let allMoney = 0;
        // 本身收益
        let allMyMoney = 0;
        // 1级收益
        let level1 = {
            num: 0,
            money: 0
        };
        let level2 = {
            num: 0,
            money: 0
        };
        let level3 = {
            num: 0,
            money: 0
        };


        taskRecords.forEach(taskRecord => {
            let order = taskRecord.shareDetail.find(order => order.user == this.req.session.user._id);
            allMyMoney += taskRecord.shareDetail[0].user == this.req.session.user._id ? taskRecord.shareDetail[0].money : 0;
            let index = taskRecord.shareDetail.indexOf(order);
            //
            switch (index) {
                case 0:
                    break;
                case 1:
                    level1.money += taskRecord.shareDetail[0].money;
                    level1.num++;
                    break;
                case 2:
                    level1.money += taskRecord.shareDetail[0].money;
                    level2.money += taskRecord.shareDetail[1].money;
                    level1.num++;
                    level2.num++;
                    break;
                case 3:
                    level1.money += taskRecord.shareDetail[0].money;
                    level2.money += taskRecord.shareDetail[1].money;
                    level3.money += taskRecord.shareDetail[2].money;

                    level1.num++;
                    level2.num++;
                    level3.num++;
                    break;
            }
            allMoney += order.money;
        });




        this.res.render('share/fans-money', {
            user: this.req.session.user,
            allMoney, allMyMoney,
            level1,
            level2,
            level3


        })
        */
    }
    async moneyLog() {
        /*
        let now = new Date().getTime();
        let before24h = now - 24 * 60 * 60 * 1000;
        let taskRecords = await this.db.taskRecordModel
            .find({ 'shareDetail.user': { $in: [this.req.session.user._id.toString()] } })
            .where('createDt').gt(before24h).lt(now).sort({ createDt: -1 }).populate('task').exec();

        this.res.render('share/money-log', { taskRecords });
        */
    }
};
default_1 = __decorate([
    lib_1.Core.Route.Controller({
        service: 'share',
    })
], default_1);
exports.default = default_1;
