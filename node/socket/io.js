/**
 * Created by YikaJ on 15/11/30.
 * 将设备服务器的数据处理后,通过 websocket(socket.io) 传输到客户端
 */
'use strict';
let io = require('socket.io')();
let deviceEvent = require('./deviceEvent');
const { BIND_DEVICE, CHART_DATA, SEND_TO_DEVICE } = deviceEvent.eventName

require('./deviceServer')();

io.on("connection", (socket)=>{
  let { session } = socket.request;
  let sessionUser = session.user
  let sessionDevice = session.bindDevice

  // 如果没有
  if(!sessionUser){
    socket.emit("err", "no user login");
  }else{
    console.log('New websocket client connected!');

    deviceEvent.listenEvent((jsonData) => {

      switch(jsonData.type) {
        case BIND_DEVICE:
          return bindDeviceCallback()
        case CHART_DATA:
          return chartDataCallback()
      }

    });
  }

  async function bindDeviceCallback(jsonData){
    const {user, device: {deviceId, bindCode}} = jsonData

    const userId = await UserModel.findOne(user)._id

    // 用户鉴权和绑定码对应成功后,需要同时向两端发送 response 告诉已经成功
    if(userId === sessionUser._id && sessionDevice.bindCode === bindCode) {
      // response device
      deviceEvent.emit(SEND_TO_DEVICE, {
        ret: 0,
        data: {userId, deviceId}
      })

      //response client
      socket.emit(BIND_DEVICE, {
        ret: 0,
        data: {deviceId}
      })
    }
  }

  function chartDataCallback(jsonData) {
    const { userId, data } = jsonData

    if(userId === sessionUser._id) {
      socket.emit(CHART_DATA, {ret: 0, data})
    }
  }

  // 当取消连接后,解除ioEvent的监听
  socket.on("disconnect", ()=>{
    console.log("client disconnect");
    ioEvent.clean();
  });
});



function chartDataCallback() {}

module.exports = io;