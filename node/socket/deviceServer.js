/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';
let net = require('net');
let ioEvent = require('./IOEvent');

let server = net.createServer((socket)=>{
  socket.on('data', (res)=>{
    ioEvent.write(res);
  });
});

module.exports = function(){
  server.listen(3334, ()=>{
    console.log("设备数据监听TCP服务器已经启动, 端口为3334");
  });
};