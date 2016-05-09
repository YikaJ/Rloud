/**
 * Created by YikaJ on 15/11/18.
 */
'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* 定义数据模型 */
let UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: (value)=>{
        return /^\w{2,16}$/.test(value);
      },
      message: "{VALUE}应该2<v<16且为字符型"
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value)=>{
        return /^\w{6,16}$/.test(value);
      },
      message: "{VALUE}应该6<v<16且为字符型"
    }
  },
  devices: [{type: Schema.Types.ObjectId, ref: 'Device'}],
  tel: Number
});

/* 定义模型实例所带方法 */
UserSchema.method("someMethod", ()=>{
  // your codes...
});

module.exports = mongoose.model('User', UserSchema);