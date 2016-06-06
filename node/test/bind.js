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
  "userId": "575152cfc6ee8cea69a7fad0",
  "bindCode": "ip1x8hr2",
  "deviceId": "575382ef7b0d421d90353db1"
}

const client = net.connect({port: 3334}, ()=>{
  console.log("客户端: TCP 连接成功");
  client.write(JSON.stringify(bindDevice));
  client.end();
});

client.on('end', () => {
  console.log('TCP 停止连接')
})
