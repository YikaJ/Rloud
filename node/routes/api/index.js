/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';

const express = require('express');
const router = express.Router();
const filter = require('../../filter');

const User = require('./user');
const Device = require('./device');

router.all('/*', User, Device)

module.exports = router;