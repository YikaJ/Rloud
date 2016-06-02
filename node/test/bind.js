/**
 * Created by YikaJ on 16/5/14.
 */
const net = require('net');
const secret = 'Rloud d-server'
const token = Date.now().toString(35)
const bindDeviceType = 'bden'

const bindDevice = {
  secret,
  type: bindDeviceType,
  userId: "5730c3cfb5625b08701c6b76",
  "bindCode": "ioyhaky0",
  "deviceId": "57504fdad946000b62881325"
}

const client = net.connect({port: 3334}, ()=>{
  console.log("客户端: TCP 连接成功");
  client.write(JSON.stringify(bindDevice));
  client.end();
});

client.on('end', () => {
  console.log('TCP 停止连接')
})