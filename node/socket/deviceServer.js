/**
 * Created by YikaJ on 15/12/2.
 * 这里是用于监听设备的TCP服务器
 * 这里仅仅是获取数据并做初步筛选
 */
'use strict';
let net = require('net');
let ioEvent = require('./IOEvent');
let filter = require('../filter/deviceData');

let server = net.createServer((socket)=>{
  socket.on('data', (res)=>{
    const jsonData = filter(JSON.parse(res.toString()))
    jsonData && ioEvent.write(jsonData);
  });
});

module.exports = function(){
  server.listen(3334, ()=>{
    console.log("设备数据监听TCP服务器已经启动, 端口为3334");
  });
};