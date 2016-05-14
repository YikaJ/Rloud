/**
 * Created by YikaJ on 16/5/7.
 */
const express = require('express');
const router = express.Router();
const DeviceModel = require('../../models/DeviceModel');
const UserModel = require('../../models/UserModel');

router.get('/getDevice', async function(req, res, next) {
  const userId = req.session.user._id
  const deviceQuery = await DeviceModel.find({userId})
  const device = deviceQuery.reduce((obj, item)=>Object.assign({}, obj, {[item._id]: item}), {})
  res.json({
    ret: 0,
    data: {device}
  })
})

router.post("/createDevice", async function(req, res, next) {
  const userId = req.session.user._id
  const deviceData = req.body
  deviceData.userId = userId
  deviceData.data = []

  // new Device
  const deviceEntity = new DeviceModel(deviceData)
  let device

  try {
    device = await deviceEntity.save()
  } catch (err) {
    console.error('错误,无法生成设备数据:', err.message)
    res.json({
      ret: 2,
      msg: err.message
    })
  }

  console.log("设备注册成功,等待绑定")

  res.json({
    ret: 0,
    data: {
      deviceId: device._id
    }
  })

});

router.post("/getBindCode", function(req, res, next) {
  const bindCode = (Date.now() + parseInt(1000 * Math.random())).toString(36)
  const deviceId = req.body['deviceId']

  // 将 bindCode 存储到 session 内,等待激活
  req.session.bindDevice = { bindCode, deviceId }

  res.json({
    ret: 0,
    data: {
      bindCode, deviceId
    }
  })
});

module.exports = router