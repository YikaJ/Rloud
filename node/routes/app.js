/**
 * Created by YikaJ on 15/11/22.
 */
'use strict';

let express = require('express');
let router = express.Router();
let filter = require('../filter');

router.get("/", (req, res, next)=>{
  res.render("app/app");
});

router.get("/*", (req, res, next)=>{
  res.render("app/app");
});

module.exports = router;