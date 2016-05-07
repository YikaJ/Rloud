/**
 * Created by YikaJ on 15/11/23.
 */
'use strict';
var debug = require('debug')('user authorize');

// 用于判断是否登陆了,若未登陆则返回登陆页面
module.exports.needLogin = function(req, res, next){
  let session = req.session || {};

  // 判断是否用户是否已经存在session中
  if(!session.user){
    debug(req.originalUrl, "未登陆不能进入app");
    res.redirect("/login");
  }else{
    next();
  }
};

// 如果已经登陆,则不能再次登陆
module.exports.needLogout = function(req, res, next){
  let session = req.session;

  // 判断是否用户是否已经存在session中
  if(session.user){
    res.redirect("/");
  }else{
    next();
  }
};
