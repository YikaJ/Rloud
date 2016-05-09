/**
 * Created by YikaJ on 15/12/7.
 */
'use strict';
const express = require('express');
const router = express.Router();

router.get("/getUser", function(req, res, next){
  const user = Object.assign({}, req.session.user)

  delete user.password
  delete user.__v
  delete user.devices

  res.json({ret: 0, data: {user}})
});

module.exports = router

