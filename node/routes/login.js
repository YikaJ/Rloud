/**
 * Created by YikaJ on 15/11/23.
 */
'use strict';
let UserModel = require('../models/UserModel');

module.exports.get = get;
module.exports.post = post;
module.exports.logout = logout;

/**
 * 获取登陆页面
 * @param req
 * @param res
 * @param next
 */
function get(req, res, next){
  let session = req.session;
  res.render('login', {user: session.user});
}

/**
 * 上传数据登陆用户
 * @param req
 * @param res
 * @param next
 */
async function post(req, res, next){
    let data = req.body;
    let user = req.session.user;
    // 如果session不存在user,则重新从数据库获取
    if(!user){
      try{
        user = await UserModel.findOne(data);
      }catch(err){
        console.error(err.message);
        next(err);
      }
    }

    // 若数据库中无此user数据,则证明账号密码错误
    if(!user){
      res.json({ret: 2, msg: "账号或密码错误!"});
    }else{
      delete user.password;
      req.session.user = user;
      if(req.session.user){
        res.json({ret: 0, data: {returnUrl: "/app/device"}});
      }else{
        res.json({ret: 3, msg: config.error[3]})
      }
    }
}

/**
 * 注销登陆
 * @param req
 * @param res
 * @param next
 */
function logout(req, res, next){
  let session = req.session;

  // 清除session
  session.destroy();

  res.redirect("/");
}