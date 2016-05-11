/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';
let net = require('net');

const bindDevice = {
  secret: 'Rloud d-server',
  type: 'bden',
  user: {
    email: 'jimklose@icloud.com',
    password: '5710569'
  },
  device: {
    bindCode: 'io2rvz5a'
  }
}

const chartData = {
  secret: 'RRloud d-serverloud',
  type: 'cden',
  userId: '.',
  data: {
    deviceId: ''
  }
}

const client = net.connect({port: 3334}, ()=>{
  console.log("客户端: TCP连接成功");
  client.write(JSON.stringify(bindDevice));
});

client.on('data', data => {
  console.log(data.toString())
  client.end()
})

client.on('end', () => {
  console.log('')
})

