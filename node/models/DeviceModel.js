/**
 * Created by YikaJ on 15/11/18.
 * 设备的模型
 * userId 用户的id
 * name 设备名称
 * desc 设备描述
 * type 设备展示类型(柱状图/折线图)
 */
'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DeviceSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, unique: true, required: true},
  name: {type: String, required: true},
  desc: {type: String},
  type: {type: String, required: true}
});



module.exports = mongoose.model('Device', DeviceSchema);