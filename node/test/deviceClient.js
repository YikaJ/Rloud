/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';
let net = require('net');

const bindDevice = {
  secret: 'Rloud d-server',
  type: 'bindDevice',
  user: {
    email: 'jimklose@icloud.com',
    passwrod: '5710569'
  },
  device: {
    bindCode: ''
  }
}

const chartData = {
  secret: 'RRloud d-serverloud',
  type: 'chartData',
  userId: '',
  data: {
    deviceId: ''
  }
}

let client = net.connect({port: 3334}, ()=>{
  console.log("client connected");
  client.write(JSON.stringify(bindDevice));
});

client.on('data', data => {
  console.log(data.toString())
  client.end()
})

client.on('end', () => {
  console.log('client disconnected')
})
