/**
 * Created by YikaJ on 15/11/30.
 * 将设备服务器的数据处理后,通过 websocket(socket.io) 传输到客户端
 */
'use strict';
let io = require('socket.io')();
let deviceEvent = require('./deviceEvent');

require('./deviceServer')();

io.on("connection", (socket)=>{
  let req = socket.request;
  let user = req.session.user;

  // 如果没有
  if(!user){
    socket.emit("err", "no user login");
  }else{
    console.log('New websocket client connected!');

    deviceEvent.listenEvent((jsonData) => {
      let { type, userId, data } = jsonData
      const { bindDeviceEventName } = deviceEvent.eventName

      data = Object.assign({}, {ret: 0, data})

      // 绑定设备需要登陆账号获取 userId
      if( type === bindDeviceEventName ) {
        try {
          userId = getUser(jsonData.user)._id
        } catch (err) {
          type = 'error'
          data = {
            ret: 1,
            msg: '账号或密码错误'
          }
        }
      }

      (userId === user._id) && socket.emit(type, data)
    });
  }

  // 当取消连接后,解除ioEvent的监听
  socket.on("disconnect", ()=>{
    console.log("client disconnect");
    ioEvent.clean();
  });
});

async function getUser(data) {
  try {
    return await UserModel.findOne(data)
  } catch (err) {
    return err.message
  }
}

module.exports = io;