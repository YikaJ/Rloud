"use strict";

var express = require('express');
let co = require('co');
var router = express.Router();
let UserModel = require('../models/UserModel');
let filter = require('../filter');

/* 路由 */
let register = require('./register');
let login = require('./login');
let api = require('./api');

/* GET home page. */
router.get('/', function (req, res, next) {
  let data = {user: req.session.user};
  res.render('index', data);
});

/* 注册用户 */
router.get("/register", filter.authorize.needLogout, register.get);
router.post("/register", register.post);

/* 用户登陆 */
router.get("/login", filter.authorize.needLogout, login.get);
router.post("/login", login.post);
router.get("/logout", filter.authorize.needLogin, login.logout);

module.exports = router;
