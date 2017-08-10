import mongoose = require('mongoose');
import { IUser } from './User';
var projectSchema = new mongoose.Schema({

    title: { type: String, default: '默认标题' },
    summary: { type: String, default: '默认描述' },
    preview: { type: String, },
    //官网地址
    officeUrl: { type: String, default: '' },
    codeUrl: { type: String, default: '' },

    content: { type: String, default: "默认内容" },
    createDt: { type: Date, default: Date.now },
    startDt: { type: Date, default: Date.now },
    endDt: { type: Date, default: Date.now }

})

export interface IProject extends mongoose.Document {
    title: string;
    summary: string;
    preview: string;
    officeUrl: string;
    codeUrl: string;
    content: string;
    createDt: Date;
    startDt: Date;
    endDt: Date;
}

export var projectModel = mongoose.model<IProject>('Project', projectSchema);
