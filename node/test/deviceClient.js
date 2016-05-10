/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';

let net = require('net');
let client = net.connect({port: 3334}, ()=>{
  console.log("client connected");
  setInterval(()=>{
    const data = {
      token: "xsahudhsaudhwquq",
      userId: "565e45129c5c5e4303e409a6",
      type: 'iodata',
      data: [
        {
          deviceId: '1',
          value: 15 * Math.random().toFixed(2)
        }
      ]
    };
    client.write(JSON.stringify(data));
  }, 3000 * Math.random());
});

const bindDevice = {
  secret: 'Rloud',
  type: 'bindDevice',
  bindCode: '',
  deviceId: '',
  email: '',
  password: ''
}

const chartData = {
  secret: 'Rloud',
  type: 'chartData',
  userId: '',
  deviceId: '',
  data: {}
}
