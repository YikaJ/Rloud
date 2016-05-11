/**
 * Created by YikaJ on 15/12/2.
 * 这里是用于监听设备的TCP服务器
 * 这里仅仅是获取数据并做初步筛选
 */
'use strict';
let net = require('net');
let deviceEvent = require('./deviceEvent');
let filter = require('../filter/deviceData');
const {SEND_TO_DEVICE} = deviceEvent.eventName

let server = net.createServer((socket)=>{

  console.log('TCP已连接')
  // 事件: 发送数据给 Device
  deviceEvent.event.once(SEND_TO_DEVICE, (jsonData) => {
    socket.write(JSON.stringify(jsonData))
  })

  // 从 Device 处接收到数据
  socket.on('data', (res)=>{
    const jsonData = filter(JSON.parse(res.toString()))
    // 只有第一级符合规范的才可以被转发到事件系统中
    jsonData && deviceEvent.emitEvent(jsonData)
  });

  socket.on('end', () => console.log('TCP 连接已断开'))

  socket.on('error', (err) => console.error(err))
});

module.exports = function(){
  server.listen(3334, ()=>{
    console.log("设备数据监听TCP服务器已经启动, 端口为3334");
  });
};