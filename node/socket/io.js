/**
 * Created by YikaJ on 15/11/30.
 * 将设备服务器的数据处理后,通过 websocket(socket.io) 传输到客户端
 */
'use strict';
let io = require('socket.io')();
let deviceEvent = require('./deviceEvent');
const UserModel = require('../models/UserModel');
const DeviceModel = require('../models/DeviceModel');
const bindDevice = require('./bindDevice');
const chartData = require('./chartData');
const { BIND_DEVICE, CHART_DATA } = deviceEvent.eventName

require('./deviceServer')();

io.on("connection",(socket)=>{
  const {sessionStore, sessionID, session} = socket.request

  function eventSwitch(jsonData) {
    switch(jsonData.type) {
      case BIND_DEVICE:
        return bindDevice(jsonData, {sessionStore, sessionID}, socket)
      case CHART_DATA:
        return chartData(jsonData, {sessionStore, sessionID}, socket)
    }
  }

  // 如果没有
  if(!session.user){
    socket.emit("err", "no user login");
  }else{
    console.log('New websocket client connected!');

    deviceEvent.listenEvent(eventSwitch);
  }

  // 当取消连接后,解除ioEvent的监听
  socket.on("disconnect", ()=>{
    console.log("client disconnect");
    deviceEvent.clean(eventSwitch)
  });
});

module.exports = io;