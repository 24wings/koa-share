
//用户登录表
import mongoose = require('mongoose');

let advertSchema = new mongoose.Schema({
    phone: Number,
    password: String,

});
export interface IAdvert extends mongoose.Document {
    phone: Number,
    password: String,

}
export var advertModel = mongoose.model<IAdvert>('advert', advertSchema); 