/**
 * Created by YikaJ on 15/11/30.
 * 将设备服务器的数据处理后,通过 websocket(socket.io) 传输到客户端
 */
'use strict';
let io = require('socket.io')();
let deviceEvent = require('./deviceEvent');
const UserModel = require('../models/UserModel');
const DeviceModel = require('../models/DeviceModel');
const { BIND_DEVICE, CHART_DATA, SEND_TO_DEVICE } = deviceEvent.eventName

require('./deviceServer')();

io.on("connection", (socket)=>{
  let { session } = socket.request;
  let sessionUser = session.user

  // 如果没有
  if(!sessionUser){
    socket.emit("err", "no user login");
  }else{
    console.log('New websocket client connected!');

    deviceEvent.listenEvent((jsonData) => {
      switch(jsonData.type) {
        case BIND_DEVICE:
          return bindDeviceCallback(jsonData)
        case CHART_DATA:
          return chartDataCallback(jsonData)
      }
    });
  }

  async function bindDeviceCallback(jsonData){
    const {user, device: { bindCode }} = jsonData
    let userId
    try {
      const dbUser = await UserModel.findOne(user)
      userId = dbUser._id
    } catch(err) {
      console.error(err)
    }


    // 用户鉴权和绑定码对应成功后,需要同时向两端发送 response 告诉已经成功
    session = await reloadSession()
    let sessionDevice = session.bindDevice
    const deviceId = sessionDevice.deviceId
    if(userId == sessionUser._id && sessionDevice.bindCode == bindCode) {
      // 让设备设为已绑定状态
      await DeviceModel.findOneAndUpdate({userId, _id: deviceId}, {$set: {isBind: true}})

      // response device
      deviceEvent.event.emit(SEND_TO_DEVICE, {
        ret: 0,
        data: {userId, deviceId}
      })

      //response client
      socket.emit(BIND_DEVICE, {
        ret: 0,
        data: {deviceId}
      })

    } else {
      deviceEvent.event.emit(SEND_TO_DEVICE, {
        ret: 1,
        msg: 'error: 账号或者密码错误'
      })
    }

  }

  function chartDataCallback(jsonData) {
    const { userId, data } = jsonData

    if(userId === sessionUser._id) {
      socket.emit(CHART_DATA, {ret: 0, data})
    }
  }

  // 根据 sessionId 更新 session
  function reloadSession() {
    const {sessionStore, sessionID} = socket.request

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
  });
});



function chartDataCallback() {}

module.exports = io;