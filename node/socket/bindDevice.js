/**
 * Created by YikaJ on 16/5/31.
 */
var reloadSession = require('../myUtil/reloadSession');
var UserModel = require('../models/UserModel');
var DeviceModel = require('../models/DeviceModel');
const _ = require('lodash');
const { BIND_DEVICE, CHART_DATA } = require('./deviceEvent').eventName

module.exports = async function bindDeviceCallback(jsonData, sessionInfo, socket){
  const {user, device: { bindCode }} = jsonData
  const session = await reloadSession(sessionInfo)
  try {
    const dbUser = await UserModel.findOne(user)
    const userId = dbUser._id
    // 用户鉴权和绑定码对应成功后,需要同时向两端发送 response 告诉已经成功
    let sessionUser = session.user
    let sessionDevice = session.bindDevice
    if(userId == sessionUser._id && sessionDevice.bindCode == bindCode) {
      // 让设备设为已绑定状态
      try {
        await DeviceModel.findOneAndUpdate({_id: sessionDevice.deviceId}, {$set: {isBind: true}})
        //response client
        socket.emit(BIND_DEVICE, {
          ret: 0,
          data: {deviceId: sessionDevice.deviceId}
        })
      } catch (err) {
        console.error('io.js Error:', err)
        return socket.emit(BIND_DEVICE, {
          ret: 2,
          msg: '绑定失败,请重试...' + err
        })
      }

    } else {
      let msg = sessionDevice.bindCode == bindCode ?
        '账号或密码不正确' : '绑定码不正确,请检查后重试'
      socket.emit(BIND_DEVICE, {
        ret: 1,
        type: BIND_DEVICE,
        msg
      })
    }
  } catch(err) {
    return console.error("io.js Error:", err)
  }
}