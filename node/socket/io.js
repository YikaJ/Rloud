/**
 * Created by YikaJ on 15/11/30.
 * 将设备服务器的数据处理后,通过 websocket(socket.io) 传输到客户端
 */
'use strict';
const _ = require('lodash');
let io = require('socket.io')();
let deviceEvent = require('./deviceEvent');
const UserModel = require('../models/UserModel');
const DeviceModel = require('../models/DeviceModel');
const { BIND_DEVICE, CHART_DATA } = deviceEvent.eventName

require('./deviceServer')();

io.on("connection", async (socket)=>{
  const {sessionStore, sessionID} = socket.request
  let session = await reloadSession({sessionID, sessionStore})

  function eventSwitch(jsonData) {
    switch(jsonData.type) {
      case BIND_DEVICE:
        return bindDeviceCallback(jsonData)
      case CHART_DATA:
        return chartDataCallback(jsonData)
    }
  }

  // 如果没有
  if(!session.user){
    socket.emit("err", "no user login");
  }else{
    console.log('New websocket client connected!');

    deviceEvent.listenEvent(eventSwitch);
  }

  async function bindDeviceCallback(jsonData){
    const {user, device: { bindCode }} = jsonData
    let userId
    try {
      const dbUser = await UserModel.findOne(user)
      userId = dbUser._id
    } catch(err) {
      return console.error("io.js Error:", err)
    }


    // 用户鉴权和绑定码对应成功后,需要同时向两端发送 response 告诉已经成功
    session = await reloadSession({sessionID, sessionStore})
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

  }

  async function chartDataCallback(jsonData) {
    const { userId, data, deviceId, type } = jsonData
    if(userId === socket.request.session.user._id) {
      try {
        const device = await DeviceModel.findOne({_id: deviceId})
        const deviceData = device.data
          // 一分钟才记录一个数据
        if(deviceData.length === 0 || data._time - (_.last(deviceData)._time) > (1000 * 60)) {
          await DeviceModel.findOneAndUpdate({_id: deviceId}, {$push: {data}})
        }
        socket.emit(CHART_DATA, {ret: 0, data:{data, deviceId} })
      } catch (err) {
        return console.error('io.js Error: ', err)
      }
    }
  }

  // 根据 sessionId 更新 session
  function reloadSession({sessionStore, sessionID}) {
    return new Promise((resolve, reject)=>{
      sessionStore.get(sessionID, (err, session) => {
        if(err) {
          return reject(err)
        }

        resolve(session)
      })
    })
  }

  // 当取消连接后,解除ioEvent的监听
  socket.on("disconnect", ()=>{
    console.log("client disconnect");
    deviceEvent.clean(eventSwitch)
  });
});

module.exports = io;