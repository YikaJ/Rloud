/**
 * Created by YikaJ on 16/5/11.
 */

var net = require('net');

var server = net.createServer((socket) => {

  socket.on('data', (data)=>{
    console.log(JSON.parse(data.toString()))
    socket.write('I got data: ' + data.toString())
  })

  socket.on('end', () => {
    console.log('socket end')
  })

  socket.write('first server => client')
})

server.listen(9999, () => console.log('server running at: 9999'))