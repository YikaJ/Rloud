/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';

const express = require('express');
const router = express.Router();
const filter = require('../../filter');

const User = require('./user');
const Device = require('./device');


router.get("/getUser", filter.authorize.needLogin, User.getUser);


router.get("/bindDevice", filter.authorize.needLogin, Device.bindDevice);
router.get("/createDevice", filter.authorize.needLogin, Device.createDevice);

module.exports = router;