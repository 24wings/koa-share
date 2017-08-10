import mongoose = require('mongoose');
import { taskModel } from './Task';
import { userModel } from './User';
import { taskTagModel } from './TaskTag';
import { taskRecordModel } from './TaskRecord';
import { wxRechargeRecordModel } from './WXRechargeRecord';
import { wxGetMoneyRecordModel } from './WXGetMoneyRecord';
import { getMoneyRequestModel } from './GetMoneyRequest';
import { boardModel } from './Board';
import { boardRecordModel } from './BoardRecord';
import { bannerModel } from './Banner';
import { taskTemplateModel } from './TaskTemplate';
import { advertModel } from './advert';
import { projectModel } from './Project';
import { wxPayToOneModel } from './WXPayToOne';
import { thumbsUpModel } from './ThumbsUp';
mongoose.connect('mongodb://moon:moon@47.92.87.28:27017/test');


export var db = {
    userModel,
    taskModel,
    taskTagModel,
    taskRecordModel,
    wxGetMoneyRecordModel,
    wxRechargeRecordModel,
    getMoneyRequestModel,
    bannerModel,
    taskTemplateModel,
    advertModel,
    projectModel,
    wxPayToOneModel,
    thumbsUpModel
}