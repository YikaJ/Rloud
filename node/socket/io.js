/**
 * Created by YikaJ on 15/11/30.
 * 只用来传输设备数据
 */
'use strict';
let io = require('socket.io')();
let ioEvent = require('./IOEvent');

require('./deviceServer')();

io.on("connection", (socket)=>{
  let req = socket.request;
  let user = req.session.user;

  // 如果没有
  if(!user){
    socket.emit("err", "no user login");
  }else{
    console.log('New websocket client connected!');
    ioEvent.read(user._id, (jsonData)=>{
      socket.emit("data", jsonData.data)
    });
  }

  // 当取消连接后,解除ioEvent的监听
  socket.on("disconnect", ()=>{
    console.log("client disconnect");
    ioEvent.clean();
  });
});

module.exports = io;