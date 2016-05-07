/**
 * Created by YikaJ on 15/12/2.
 */
'use strict';
let events = require('events');
let ev = new events.EventEmitter();

/**
 * 设备数据来源模型
 * @api
 * read userId, callback
 * 读取到数据后处理
 *
 * write data
 * 将设备的数据写入模型
 *
 * clean
 * 清空监听器,手动处理GC
 */
class IOEvent{
  constructor() {
    this.eventName = 'iodata';
  }

  read(userId, callback) {
    ev.on(this.eventName, (res)=> {
      let json = JSON.parse(res.toString());
      if (author(json) && userId == json.userId) {
        callback(json);
      }
    });
  }

  write(res) {
    ev.emit(this.eventName, res);
  }

  clean(){
    ev.removeAllListeners(this.eventName);
  }
}
module.exports = new IOEvent();

//TODO 这里要自定义一个数据鉴权,只有符合规定的JSON数据,才可以从设备数据监听口转发到应用服务器上
function author(json){
  if('userId' in json){
    return true;
  }
}
