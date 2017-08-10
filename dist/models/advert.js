"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//用户登录表
const mongoose = require("mongoose");
let advertSchema = new mongoose.Schema({
    phone: Number,
    password: String,
});
exports.advertModel = mongoose.model('advert', advertSchema);
