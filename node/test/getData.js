/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';
const net = require('net');
const secret = 'Rloud d-server'
const token = Date.now().toString(35)
const chartDataType = 'cden'

function getTime() {
  const date = new Date()

  return {
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  }
}

function getChartData() {
  const date = getTime()

  return {
    secret, token,
    type: chartDataType,
    userId: "5730c3cfb5625b08701c6b76",
    deviceId: '574334c72274a69b1a4f75a9',
    data: {
      _time: Date.now(),
      xAxisName: `${date.h}:${date.m}:${date.s}`,
      "室内": parseInt(40 + 20 * Math.random()),
      "室外": parseInt(40 + 20 * Math.random()),
      "A实验室": parseInt(40 + 20 * Math.random())
    }
  }
}


const client = net.connect({port: 3334}, ()=>{
  console.log("客户端: TCP 连接成功");
  setInterval(() => {
    client.write(JSON.stringify(getChartData()));
  }, 2000)
});

client.on('data', json => {
  const data = JSON.parse(json)
  if(data.token === token && data.type === bindDeviceType) {
    const result = data.ret ? data.msg : '成功'
    console.log('绑定流程结束: ' + result)
    socket.end()
  }
})

client.on('end', () => {
  console.log('TCP 停止连接')
})




