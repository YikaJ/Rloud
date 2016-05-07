/**
 * Created by YikaJ on 15/11/18.
 */
'use strict';

let mongoose = require('mongoose');
let config = require('../config');
let debug = require('debug')("database");

let db = mongoose.connect(config.db.mongodb).connection;

db.once('open', function () {
  debug("MongoDB数据库已连接");
});

db.on("error", (err)=>{
  throw new Error("MongoDB数据库连接失败:" + err);
});

module.exports = db;

