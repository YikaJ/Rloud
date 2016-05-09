/**
 * Created by YikaJ on 15/11/23.
 */
'use strict';

let UserModel = require('../models/UserModel');

module.exports.get = get;
module.exports.post = post;

function get(req, res, next){
  let data = {user: req.session.user};
  res.render('register', data);
}

async function post(req, res, next){
  let userData = req.body;
  userData.tel = +userData.tel || null;

  // new user
  let userEntity = new UserModel(userData);

  try{
    await userEntity.save();
    console.log(userData.username, "新建用户成功!");
    let data = {user: req.session.user};
    res.render("login", data);
  }catch(err){
    console.error(err.message);
    res.json({
      ret: err.code,
      msg: err.message
    })
  }
}