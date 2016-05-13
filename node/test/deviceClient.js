/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';
let net = require('net');

function getTime() {
  const date = new Date()

  return {
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  }
}

const bindDevice = {
  secret: 'Rloud d-server',
  type: 'bden',
  user: {
    email: 'jimklose@icloud.com',
    password: '5710569'
  },
  device: {
    bindCode: 'io5pd3kr'
  }
}


function getChartData() {
  const date = getTime()

  return {
    secret: 'Rloud d-server',
    type: 'cden',
    userId: "5730c3cfb5625b08701c6b76",
    deviceId: '57344a7c11d806e6833019bd',
    data: [
      {
        xAxisName: `${date.h}:${date.m}:${date.s}`,
        "室内": parseInt(15 + 30 * Math.random()),
        "室外": parseInt(15 + 30 * Math.random()),
        "A实验室": parseInt(15 + 30 * Math.random())
      }
    ]
  }
}

const client = net.connect({port: 3334}, ()=>{
  console.log("客户端: TCP连接成功");
  // client.write(JSON.stringify(bindDevice));
  
  setInterval(() => {
    client.write(JSON.stringify(getChartData()));
  }, 1000)
});

client.on('data', data => {
  console.log(data.toString())
  client.end()
})

client.on('end', () => {
  console.log('')
})

